const Joi = require('@hapi/joi');
const { mongoIdPattern } = require('../../utils/constant');



const addRBACSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('عنوان نقش صحیح نمیباشد')),
    premissions: Joi.array().items(Joi.string().pattern(mongoIdPattern)).error(new Error('سطوح دسترسی های ارسال شده صحیح نمیباشد'))
})
const addPremisionSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('اسم دسترسی صحیح نمیباشد')),
    description: Joi.string().min(0).max(100).error(new Error('توضیحات دسترسی صحیح نمیباشد')),
})


module.exports = {
    addRBACSchema,
    addPremisionSchema
}