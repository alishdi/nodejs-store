const Joi = require('@hapi/joi');
const { mongoIdPattern } = require('../../../utils/constant');


const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error('عنوان دسته بندی صحیح نمیباشد')),
    parent: Joi.string().allow('').pattern(mongoIdPattern).error(new Error('شناسه وارد شده صحیح نمیباشد'))

})
module.exports = {
    addCategorySchema
}