const { authSchema } = require("../../validator/user/auth.schema")
const { Controller } = require("../controller")
const createError = require('http-errors');

class HomeController extends Controller {
    async indexpage(req, res, next) {
        try {
            console.log(req.headers);
            await authSchema.validateAsync(req.body)
            return res.send({msg:'index page'})
        } catch (error) {
            next(createError.BadRequest(error.message))
        }

    }
}


module.exports = {
    HomeController: new HomeController()
}