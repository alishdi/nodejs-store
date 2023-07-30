const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../model/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN } = require('./constant');
const redisClient = require('./init_redis');
function numberRandomGenerate() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,

        };

        const option = {
            expiresIn: '1h'
        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, option, (err, token) => {
            if (err) createError.InternalServerError('sever err')
            resolve(token)
        })
    })
}
function signRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,

        };

        const option = {
            expiresIn: '1y'
        };
        JWT.sign(payload, REFRESH_TOKEN, option, async (err, token) => {
            if (err) reject(createError.InternalServerError('sever err'))
            await redisClient.SETEX(String(userId),(365*24*60*60),token)
            console.log(String(userId),userId);
            resolve(token)
        })
    })

}
function verifyRfreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN, async (err, decoded) => {

            if (err) reject(createError.Unauthorized('وارد حساب کاربری خود شوید'))
            const { mobile } = decoded || {}
            const user = await UserModel.findOne({ mobile }, { password: 0 }, { token: 0 }, { otp: 0 })
            if (!user) reject(createError.Unauthorized('حساب کاربری یافت نشد'))
            const userID=String(user._id)
            const refreshToken = await redisClient.get(userID)
           
            if (token == refreshToken) resolve(mobile)
            reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'))

        })
    })


}


module.exports = {
    numberRandomGenerate,
    signAccessToken,
    signRefreshToken,
    verifyRfreshToken
}