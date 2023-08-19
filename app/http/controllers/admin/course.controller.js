const { Courses } = require("../../../model/courses")
const path = require('path');
const { createCourseschema } = require("../../validator/course/course.shchema");
const { createError } = require("../../../utils/constant");
const { default: mongoose } = require("mongoose");
class CourseController {
    constructor() {
        this.addChapter = this.addChapter.bind(this)
        this.listOfChapters = this.listOfChapters.bind(this)
        this.removeChapterById = this.removeChapterById.bind(this)
        this.updateChapterById = this.updateChapterById.bind(this)
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
    async getAllCourses(req, res, next) {
        try {
            const { search } = req.query
            let courses;
            if (search) courses = await Courses.find({ $text: { $search: search } }).populate([
                { path: 'category', select: { children: 0, parent: 0 } },
                { path: 'teacher', select: { first_name: 1, last_name: 1, mobile: 1, email: 1 } }
            ]).sort({ _id: -1 })
            else courses = await Courses.find({}).populate([
                { path: 'category', select: { title:1 } },
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
//       "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjQzNTExNiwiZXhwIjoxNjkyNDM4NzE2fQ.VkcHdRhBqP1sT-K4m1NoiKHs2Xu5YcTgKIYtoC6k5qo",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjQzNTExNiwiZXhwIjoxNzIzOTkyNzE2fQ.RiiQHsw5T3Hb1RCilevdBXzSuLdY4Wvd53-2KUPyYx0"
//     }
//   }