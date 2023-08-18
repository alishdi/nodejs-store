const { Courses } = require("../../../model/courses")
const path = require('path');
const { createCourseschema } = require("../../validator/course/course.shchema");
const { createError } = require("../../../utils/constant");
const { default: mongoose } = require("mongoose");
class CourseController {
    constructor() {
        this.addChapter = this.addChapter.bind(this)
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
            if (search) courses = await Courses.find({ $text: { $search: search } }).sort({ _id: -1 })
            else courses = await Courses.aggregate([

                {
                    $match: {}
                },



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
                status:201,
                data:{
                    message:'فصل با موفقیت افزوده شد'
                }
            })


        } catch (error) {
            next(error)
        }
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
//       "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjM0NjcyNCwiZXhwIjoxNjkyMzUwMzI0fQ.xA_n1_IlKQBWf1WmL1J-NlihaPdHVDy9HNESVO_QJAI",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjM0NjcyNCwiZXhwIjoxNzIzOTA0MzI0fQ.4Mgu4tX6bHZUeYCwka1Jyor-BuD-LnpzrvYVnT6knjA"
//     }
//   }
