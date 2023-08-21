const Joi = require('@hapi/joi');
const { mongoIdPattern, createError } = require('../../../utils/constant');

const createCourseschema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest('عنوان دسته بندی صحیح نمیباشد')),
    text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    short_text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/).error(createError.BadRequest('عکس صحیح نمیباشد')),
    fileuploadpath: Joi.allow(),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest('برچسب ها نمیتوانند بیشتر از 20 ایتم باشند')),
    category: Joi.string().regex(mongoIdPattern).error(createError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price: Joi.number().error(createError.BadRequest('قیمت وترد شده صحیح نمیباشد')),
    type: Joi.string().regex(/(free|cash|special)/i),
    discount: Joi.number().error(createError.BadRequest('تخفیف باید عدد باشد')),

})
const createEpisodeschema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest('عنوان دسته بندی صحیح نمیباشد')),
    text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    type: Joi.string().regex(/(lock|unlock)/i),
    chapterID: Joi.string().regex(mongoIdPattern).error(createError.BadRequest('شناسه فصل صحیح نمیباشد')),
    courseID: Joi.string().regex(mongoIdPattern).error(createError.BadRequest('شناسه دوره صحیح نمیباشد')),
    filename: Joi.string().pattern(/(\.mp4|\.mov|\.mkv|\.mpg|\.avi)$/).error(createError.BadRequest('فیلم صحیح نمیباشد')),
    fileuploadpath: Joi.allow(),
    

})

module.exports = {
    createCourseschema,
    createEpisodeschema
}



