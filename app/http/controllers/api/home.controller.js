const { authSchema } = require("../../validator/user/auth.schema")
const { Controller } = require("../controller")
const createError = require('http-errors');

class HomeController extends Controller {
    async indexpage(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).json({
                result
            })
        } catch (error) {
            next(createError.BadRequest(error.message))
        }

    }
}


module.exports = {
    HomeController: new HomeController()
}