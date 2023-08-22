const { UserModel } = require("../../../../model/users");
const { numberRandomGenerate, signAccessToken, verifyRfreshToken, signRefreshToken } = require("../../../../utils/func");
const { authSchema, checkOtpSchema } = require("../../../validator/user/auth.schema")
const createError = require('http-errors');
const { Controller } = require("../../controller");


class UserAuthController extends Controller {
    async getOpt(req, res, next) {
        try {

            await authSchema.validateAsync(req.body)
            const { mobile } = req.body

            const code = numberRandomGenerate()
            const result = await this.saveUser(mobile, code)
            if (!result) return createError.BadRequest('ورود شما انجام نشد')

            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: 'کد اعتبار سنجی با موفقیت برای شما ارسال شد',
                    code,
                    mobile
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body)
            const { mobile, code } = req.body
            const user = await UserModel.findOne({ mobile })
            if (!user) throw createError.NotFound('شماره موباید یا کاربر یافت نشد')
            if (user.otp.code != code) throw createError.Unauthorized('کد ارسال شده صحیح نمیباشد')
            const now = Date.now()
            if (+user.otp.expireIn < now) throw createError.Unauthorized('کد شما منقضی شده است')
            const accesstoken = await signAccessToken(user._id)
            const refreshToken = await signRefreshToken(user._id)
            return res.json({
                data: {
                    accesstoken,
                    refreshToken
                }
            })



        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const mobile = await verifyRfreshToken(refreshToken);
            const user = await UserModel.findOne({ mobile })
            const accessToken = await signAccessToken(user._id)
            const newRefreshToken = await signRefreshToken(user._id)
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })

        } catch (error) {
            next(error)
        }

    }

    async saveUser(mobile, code) {
        let otp = {
            code,
            expireIn: new Date().getTime() + 120000

        }
        const result = await this.checkExistUser(mobile)
        const countOfRefisterUser = await UserModel.count()
        if (result) {

            return (await this.updateUser(mobile, { otp }))

        }
        return !!(await UserModel.create({
            mobile,
            otp,
            rolles: countOfRefisterUser > 2 ? "USER" : "ADMIN"
        }))
    }
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile })
        return !!user
    }
    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key]

        })
        const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
        return !!updateResult.modifiedCount
    }


}


module.exports = {
    UserAuthController: new UserAuthController()
}