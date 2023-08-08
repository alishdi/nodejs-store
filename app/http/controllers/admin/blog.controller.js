const path = require('path');
const { createBlogschema } = require("../../validator/blog/blog.schema");
const { BlogModel } = require('../../../model/blogs');
const { deleteFieldInPublic } = require('../../../utils/func');
const { createError } = require('../../../utils/constant');
const { Types, default: mongoose } = require('mongoose');

class BlogController {
    async createBlog(req, res, next) {
        try {


            const blogDataBody = await createBlogschema.validateAsync(req.body)

            req.body.image = path.join(blogDataBody.fileuploadpath, blogDataBody.filename).replace(/\\/g, '/')
            const { title, text, short_text, category, tags } = blogDataBody;
            const image = req.body.image
            console.log(image);
            const author = req.user._id

            const blog = await BlogModel.create({ title, text, short_text, category, tags, image, author })
            return res.status(201).json({
                data: {
                    status: 201,
                    message: 'ایجاد بلاگ با موفقیت ایجاد شد',

                }
            })

        } catch (error) {
            deleteFieldInPublic(req.body.image)
            next(error)
        }

    }
    async getOneBlogById(req, res, next) {
        try {
            const { id } = req.params;
            console.log(id);
            const blog = await BlogModel.findOne({ _id: id })
            if (!blog) throw createError.BadRequest('بلاگی با این مشخصه یافت نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    blog
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async GetListOfBlog(req, res, next) {
        const blogs = await BlogModel.aggregate([
            { $match: {} },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'author',
                    as: 'author'
                },
                $lookup: {
                    from: 'categories',
                    foreignField: '_id',
                    localField: 'category',
                    as: 'category'
                },
            }, {
                $unwind: "$author"
            },
            {
                $unwind: "$category"
            },
            {
                $project: {
                    'author.rolles': 0,
                    'author.bills': 0,
                    'author.otp': 0,
                    'author.__v': 0,
                    'author.discount': 0,
                    'category.__v': 0
                }
            }
        ])
        try {
            return res.status(200).json({
                satatusCode: 200,
                data: {
                    blogs: blogs
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async getCommentsOfBlog(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    async deleteBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await BlogModel.findByIdAndDelete({ _id: id })
            if (!blog) throw createError.InternalServerError('یافت نشد خطا رخ داد')
            return res.status(200).json({
                status: 200,
                data: {
                    msg: 'با موفقیت حذف شد'
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async updateBlogById(req, res, next) {
        try {
            const { id } = req.params
           
            const allow = await BlogModel.findById(id)
            if (!allow) throw createError.BadRequest('بلاگ یافت نشد')


            if (req?.body?.fileuploadpath && req?.body?.filename) {
                req.body.image = path.join(req.body.fileuploadpath, req.body.filename)
                req.body.image = req.body.image.replace(/\\/g, '/')
                
            }
            
            const data = req.body
            let nullishData = ["", " ", "0", null, undefined]
            let blackListFields = ['bookmark', 'deslike', 'like', 'comments', 'author']
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && Array.length > 0) data[key] = data[key].map(item => item.trim())
                if (nullishData.includes(data[key])) delete data[key]

            })

            const blog = await BlogModel.updateOne({ _id: id }, { $set: data })
            if (blog.modifiedCount == 0) throw createError.InternalServerError('خطای سرور')

            return res.status(200).json({
                data: {
                    status: 200,
                    message: 'با موفقیت انجام شد',

                }
            })

        } catch (error) {
            console.log(error);
            deleteFieldInPublic(req?.body?.image)
            next(error)
        }

    }
}
module.exports = {
    BlogController: new BlogController()
}


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTQwMTM1NCwiZXhwIjoxNjkxNDA0OTU0fQ.oK-FmNQ0CR3cwyBxBOFwtN7YSsCqipweWSUbDq3Duq8