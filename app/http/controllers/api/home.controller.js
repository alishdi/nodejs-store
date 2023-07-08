const { Controller, Controlled } = require("../controller")


class HomeController extends Controller {
    indexpage(req, res, next) {

        return res.status(200).send('index page store ' + Controlled.testMethod())
    }
}


module.exports = {
    HomeController: new HomeController()
}