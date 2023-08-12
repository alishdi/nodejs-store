const Joi = require('@hapi/joi');
const { mongoIdPattern, createError } = require('../../../utils/constant');

const createProductsschema = Joi.object({
    title: Joi.string().min(3).max(30).error(createError.BadRequest('عنوان دسته بندی صحیح نمیباشد')),
    text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    short_text: Joi.string().error(createError.BadRequest('متن ارسال شده صحیح نمیباشد')),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/).error(createError.BadRequest('عکس صحیح نمیباشد')),
    fileuploadpath: Joi.allow(),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest('برچسب ها نمیتوانند بیشتر از 20 ایتم باشند')),
    category: Joi.string().pattern(mongoIdPattern).error(createError.BadRequest('دسته بندی مورد نظر یافت نشد')),
    price: Joi.number().error(createError.BadRequest('قیمت وترد شده صحیح نمیباشد')),
    count: Joi.number().error(createError.BadRequest('تعداد باید عدد باشد')),
    discount: Joi.number().error(createError.BadRequest('تخفیف باید عدد باشد')),
    weight: Joi.number().allow(null,0,'0').error(createError.BadRequest('وزن عدد باشد')),
    length: Joi.number().allow(null,0,'0').error(createError.BadRequest('تعداد عدد باشد')),
    height: Joi.number().allow(null,0,'0').error(createError.BadRequest('ارتفاع عدد باشد')),
    width: Joi.number().allow(null,0,'0').error(createError.BadRequest('اندازه عدد باشد')),
})

module.exports = {
    createProductsschema
}



// "data": {
//     "accesstoken": " ",
//     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTczODMxNywiZXhwIjoxNzIzMjk1OTE3fQ.IEED3fLAgy_hBakE6FXWC9ncmeYA3OB9--Y3kYOOLBI"
//   }