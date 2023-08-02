const createErr = require('http-errors');
const { UserModel } = require('../../model/users');
const JWT = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constant');
function verifyToken(req, res, next) {
    const headers = req.headers;

    const [bearer, token] = headers?.accesstoken?.split(' ') || []

    if (token && ['Bearer', 'bearer'].includes(bearer)) {
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, decoded) => {
         
            if (err) return next(createErr.Unauthorized('وارد حساب کاربری خود شوید'))
            const { mobile } = decoded || {}
            const user = await UserModel.findOne({ mobile }, { password: 0 }, { token: 0 }, { otp: 0 })
            
            if (!user) return next(createErr.Unauthorized('حساب کاربری یافت نشد'))
            req.user = user
            return next()
        })

    }
   else return next(createErr.Unauthorized('مجددا وارد حساب خود شوید'))
}

module.exports = {
    verifyToken
}