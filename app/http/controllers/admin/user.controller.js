const { date } = require("joi");
const { UserModel } = require("../../../model/users");
const { createError } = require("../../../utils/constant");

class UserController {
    async getAllUsers(req, res, next) {
        try {
            let { search } = req.query;

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
            const userID = req.user._id;
            const data = req.body
            let nullishData = ["", " ", "0", null, undefined]
            let blackListFields = ['courses', 'mobile', 'otp', 'bills', '_id', 'rolles', 'discount']
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if (nullishData.includes(data[key])) delete data[key]

            })
            const profileUpdateResult = await UserModel.updateOne({ _id: userID }, {
                $set: data
            })
            if (!profileUpdateResult.modifiedCount) throw createError.InternalServerError('به روزرسانی انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'به روزرسانی با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async userProfile(req, res, next) {
        try {
            const user = req.user;

            return res.status(200).json({
                status: 200,
                data: {
                    user
                }
            })

        } catch (error) {
            next(error)
        }
    }

}


module.exports = {
    UserController: new UserController()
}