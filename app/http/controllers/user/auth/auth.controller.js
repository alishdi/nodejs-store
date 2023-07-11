const { authSchema } = require("../../../validator/user/auth.schema")
const createError=require('http-errors');

class UserAuthController {
    async login(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).send('ورود شما با موفقیت ایجاد شد')
        } catch (error) {
            next(createError.BadRequest(error.message))
        }
    }

}


module.exports = {
    UserAuthController: new UserAuthController()
}