const Joi = require('@hapi/joi');
const { mongoIdPattern, createError } = require('../../../utils/constant');

const createBlogschema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest('عنوان دسته بندی صحیح نمیباشد')),
    text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    short_text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/).error(createError.BadRequest('عکس صحیح نمیباشد')),
    fileuploadpath: Joi.allow(),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest('برچسب ها نمیتوانند بیشتر از 20 ایتم باشند')),
    category: Joi.string().pattern(mongoIdPattern).error(createError.BadRequest('دسته بندی مورد نظر یافت نشد')),
})

module.exports={
    createBlogschema
}