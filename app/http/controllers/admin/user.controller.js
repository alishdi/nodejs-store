const { UserModel } = require("../../../model/users")

class UserController {
    async getAllUsers(req, res, next) {
        try {
            let { search } = req.query;
            console.log(typeof search);
            let users;
            if (search) {
                users = await UserModel.find({ $text: { $search: search } })

            } else {
                users = await UserModel.find({})
            }
            return res.status(200).json({
                status: 200,
                data: {
                    users
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}


module.exports = {
    UserController: new UserController()
}