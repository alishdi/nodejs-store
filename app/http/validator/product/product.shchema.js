const Joi = require('@hapi/joi');
const { mongoIdPattern, createError } = require('../../../utils/constant');

const createProductsschema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest('عنوان دسته بندی صحیح نمیباشد')),
    text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    short_text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/).error(createError.BadRequest('عکس صحیح نمیباشد')),
    fileuploadpath: Joi.allow(),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest('برچسب ها نمیتوانند بیشتر از 20 ایتم باشند')),
    category: Joi.string().regex(mongoIdPattern).error(createError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price: Joi.number().error(createError.BadRequest('قیمت وترد شده صحیح نمیباشد')),
    type: Joi.string().regex(/(virtual|physical)/i),
    colors: Joi.array().min(0).max(20).error(createError.BadRequest("رنگ های انتخابی  نمیتواند بیشتر از 20 ایتم باشد")),
    count: Joi.number().error(createError.BadRequest('تعداد باید عدد باشد')),
    discount: Joi.number().error(createError.BadRequest('تخفیف باید عدد باشد')),
    weight: Joi.number().allow(null, 0, '0').error(createError.BadRequest('وزن عدد باشد')),
    length: Joi.number().allow(null, 0, '0').error(createError.BadRequest('تعداد عدد باشد')),
    height: Joi.number().allow(null, 0, '0').error(createError.BadRequest('ارتفاع عدد باشد')),
    width: Joi.number().allow(null, 0, '0').error(createError.BadRequest('اندازه عدد باشد')),
})

module.exports = {
    createProductsschema
}

