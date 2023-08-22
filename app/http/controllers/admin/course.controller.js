const { Courses } = require("../../../model/courses")
const path = require('path');
const { createCourseschema, createEpisodeschema } = require("../../validator/course/course.shchema");
const { createError } = require("../../../utils/constant");
const { default: mongoose } = require("mongoose");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime, copyObjet, deleteFieldInPublic, getCourseTime } = require("../../../utils/func");
const { objectIDValidator } = require("../../validator/public.validator");
class CourseController {
    constructor() {
        this.addChapter = this.addChapter.bind(this)
        this.listOfChapters = this.listOfChapters.bind(this)
        this.removeChapterById = this.removeChapterById.bind(this)
        this.updateChapterById = this.updateChapterById.bind(this)
        this.editEpsodById = this.editEpsodById.bind(this)
        this.editCourseByID = this.editCourseByID.bind(this)
    }
    async addCourses(req, res, next) {
        try {
            await createCourseschema.validateAsync(req.body)
            const { fileuploadpath, filename } = req.body
            const image = path.join(fileuploadpath, filename).replace(/\\/g, '/')
            const { title, text, short_text, tags, category, price, discount, type } = req.body
            const teacher = req.user._id
            if (Number(price) > 0 && type === 'free') throw createError.BadRequest('دوره رایگان نمیتوان قیمت درج کرد')

            const course = await Courses.create({
                title, text, short_text, tags, category, price, discount, image, teacher, type
            })
            if (!course._id) throw createError.InternalServerError('دوره ثبت نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'دوره با موفقیت اضافه شد',
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editCourseByID(req, res, next) {
        try {
            const { id } = req.params;
            const course = await this.finidCourseById(id)
            const data = copyObjet(req.body)
            const { filename, fileuploadpath } = req.body
            let nullishData = ["", " ", "0", null, undefined]
            let blackListFields = ['time', 'chapters', 'episode', 'students', 'bookmark', 'like', 'deslike', 'comments', 'fileuploadpath', 'filename']
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if (nullishData.includes(data[key])) delete data[key]

            })
            if (req.file) {
                data.image = path.join(fileuploadpath, filename)
                deleteFieldInPublic(course.image)
            }
            const updateCourseResult = await Courses.updateOne({ _id: id }, {
                $set: data
            })
            if (!updateCourseResult.modifiedCount) throw createError.InternalServerError('به روزرسانی دوره انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'به روز رسانی با موفقیت انجام شد'
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllCourses(req, res, next) {
        try {
            const { search } = req.query
            let courses;
            if (search) courses = await Courses.find({ $text: { $search: search } }).populate([
                { path: 'category', select: { children: 0, parent: 0 } },
                { path: 'teacher', select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
            ]).sort({ _id: -1 })
            else courses = await Courses.find({}).populate([
                { path: 'category', select: { title: 1 } },
                { path: 'teacher', select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
            ]).sort({ _id: -1 })

            return res.status(200).json({
                status: 200,
                data: {
                    courses
                }
            })
        } catch (error) {
            next(error)
        }

    }
    async getCourseById(req, res, next) {
        try {
            const { id } = req.params;
            const course = await Courses.findOne({ _id: id })
        
            if (!course) throw createError.NotFound('دوره ای یافت نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    course
                }
            })
        } catch (error) {
            next(error)
        }
    }

    // Add Chapter//
    async addChapter(req, res, next) {
        try {
            const { id, title, text } = req.body;
            await this.finidCourseById(id)
            const saveChapterResult = await Courses.updateOne({ _id: id }, {
                $push: {
                    chapters: { title, text, episodes: [] }
                }
            })
            if (saveChapterResult.modifiedCount == 0) throw createError.InternalServerError('فصل افزوده نشد')
            return res.status(201).json({
                status: 201,
                data: {
                    message: 'فصل با موفقیت افزوده شد'
                }
            })


        } catch (error) {
            next(error)
        }
    }
    async listOfChapters(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);
            const chapters = await this.getChaptersOfCourse(id)

            return res.status(200).json({
                status: 200,
                data: {
                    chapters
                }
            })


        } catch (error) {
            next(error)
        }
    }
    async removeChapterById(req, res, next) {
        try {
            const { id } = req.params;
            const chapter = await this.getOneChapter(id);
            console.log(chapter);
            const removeChapterResult = await Courses.updateOne({ "chapters._id": id }, {
                $pull: {
                    chapters: {
                        _id: id
                    }
                }
            })
            if (removeChapterResult.modifiedCount == 0) throw createError.InternalServerError('حذف درس انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'حذف درس موفقیت امیز بود'
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async updateChapterById(req, res, next) {
        try {
            const { id } = req.params;
            await this.getOneChapter(id)
            const data = req.body;
            let nullishData = ["", " ", "0", null, undefined]
            let blackListFields = ['_id']
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if (nullishData.includes(data[key])) delete data[key]

            })
            const updateChapterResult = await Courses.updateOne({ 'chapters._id': id }, { $set: { 'chapters.$': data } })
            if (updateChapterResult.modifiedCount == 0) throw createError.InternalServerError('تغییرات انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'به روز رسانی با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async addNewEpisode(req, res, next) {
        try {
            const { title, type, text, chapterID, courseID, filename, fileuploadpath } = await createEpisodeschema.validateAsync(req.body)
            const videoAddress = path.join(fileuploadpath, filename).replace(/\\/g, '/')
            const videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoURL)
            const time = getTime(seconds)

            const createEpisodResult = await Courses.updateOne({ _id: courseID, 'chapters._id': chapterID }, {
                $push: {
                    'chapters.$.episode': { title, type, text, videoAddress, time }
                }
            })

            if (createEpisodResult.modifiedCount == 0) throw createError.InternalServerError('افزودن ویدیو موفقیت امیز نبود')
            return res.status(201).json({
                status: 200,
                data: {
                    message: 'افزودن فیلم با موفقیت انجام شد'
                }
            })


        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async removeEpisodeByID(req, res, next) {
        try {

            const { id } = await objectIDValidator.validateAsync({ id: req.params.id });


            const removeEpisodResult = await Courses.updateOne({
                'chapters.episode._id': id
            },
                {
                    $pull: {
                        'chapters.$.episode': {
                            _id: id
                        }
                    }
                }

            )

            if (removeEpisodResult.modifiedCount == 0) throw createError.InternalServerError('حذف ویدیو موفقیت امیز نبود')
            return res.status(201).json({
                status: 200,
                data: {
                    message: 'حذف فیلم با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async editEpsodById(req, res, next) {
        try {
            const { id } = await objectIDValidator.validateAsync({ id: req.params.id });
            const episode = await this.getOneEpisode(id)
            const { filename, fileuploadpath } = req.body
            let blackListFields = ['_id']

            if (filename, fileuploadpath) {
                const videoAddress = path.join(fileuploadpath, filename).replace(/\\/g, '/')
                req.body.videoAddress = path.join(fileuploadpath, filename).replace(/\\/g, '/')
                const videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`
                req.body.videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${videoAddress}`
                const seconds = await getVideoDurationInSeconds(videoURL)
                req.body.time = getTime(seconds)
                blackListFields.push('filename')
                blackListFields.push('fileuploadpath')

            } else {
                blackListFields.push('time')
                blackListFields.push('videoAddress')
            }
            const data = req.body;
            let nullishData = ["", " ", "0", null, undefined]
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if (nullishData.includes(data[key])) delete data[key]

            })
            const newEpisode = {
                ...episode,
                ...data
            }
            const editEpisodResult = await Courses.updateOne({ 'chapters.episode._id': id }, {
                $set: {
                    'chapters.$.episode': newEpisode
                }
            })

            if (editEpisodResult.modifiedCount == 0) throw createError.InternalServerError('ویرایش اپیزود موفقیت امیز نبود')
            return res.status(201).json({
                status: 200,
                data: {
                    message: 'ویرایش اپیزود با موفقیت انجام شد'
                }
            })


        } catch (error) {
            console.log(error);
            next(error)
        }
    }





    async getOneEpisode(episodeID) {
        const course = await Courses.findOne({ "chapters.episode._id": episodeID }, {
            "chapters.episode": 1
        })
        if (!course) throw new createError.NotFound("اپیزودی یافت نشد")
        const episode = course?.chapters?.[0]?.episode?.[0]
        if (!episode) throw new createError.NotFound("اپیزودی یافت نشد")
        return copyObjet(episode)
    }
    //method for needs find chapters and courses
    async getChaptersOfCourse(id) {
        const chapters = await Courses.findOne({ _id: id }, { chapters: 1, title: 1 })
        if (!chapters) throw createError.NotFound('دوره ای با این شناسه یافت نشد')
        return chapters
    }
    async getOneChapter(id) {
        const chapter = await Courses.findOne({ 'chapters._id': id }, { "chapters.$": 1 })

        if (!chapter) throw createError.NotFound('درسی پیدا نشد')
        return chapter
    }
    async finidCourseById(id) {
        if (!mongoose.isValidObjectId(id)) throw createError.BadRequest('شناسه ارسال شده صحیح نمیباشد')
        const course = await Courses.findById(id)
        if (!course) throw createError.NotFound('دوره ای یافت نشد')
        return course
    }
}


module.exports = {
    CourseController: new CourseController()
}

// {
//     "data": {
//       "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjYwNTQyMCwiZXhwIjoxNjkyNjA5MDIwfQ.pDh30ynT9Ww2YcbKKxgLaW9NLqJ6FsQ8-chVNNzR0i0",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjYwNTQyMCwiZXhwIjoxNzI0MTYzMDIwfQ.Xr27eKCeDoO-ZuCPTP4zSfrNGL4dSUQBn4m1rQyMCjU"
//     }