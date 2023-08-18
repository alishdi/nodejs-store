const Joi = require('@hapi/joi');
const { mongoIdPattern, createError } = require('../../utils/constant');


const objectIDValidator = Joi.object({
    id: Joi.string().pattern(mongoIdPattern).error(new Error(createError.BadRequest('شناسه وارد شده صحیح نمیباشد')))
})

module.exports={
    objectIDValidator
}