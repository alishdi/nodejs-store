const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../model/users');
const { ACCESS_TOKEN_SECRET_KEY } = require('./constant');
function numberRandomGenerate() {
    return Math.floor((Math.random() * 90000) + 10000)
}
function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId)
        const payload = {
            mobile: user.mobile,
            
        };
        const secret = '7624d719b242bff33d89bbbf96ac845bcfe7e8622eee7d1aeda08ca7efbed7e4';
        const option = {
            expiresIn: '1h'
        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, option, (err, token) => {
            if (err) createError.InternalServerError('sever err')
            resolve(token)
        })
    })
}



module.exports = {
    numberRandomGenerate,
    signAccessToken
}