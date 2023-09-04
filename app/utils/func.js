const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../model/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN } = require('./constant');
const redisClient = require('./init_redis');
const fs = require('fs');
const path = require('path');

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
            await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token)

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
            const userID = String(user?._id || "key_default")

            const refreshToken = await redisClient.get(userID)
            if (!refreshToken) reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'))


            if (token == refreshToken) resolve(mobile)
            reject(createError.Unauthorized('ورود مجدد به حساب کاربری انجام نشد'))

        })
    })


}

function deleteFieldInPublic(fileAddres) {
    if (fileAddres) {
        const pathfile = path.join(__dirname, "..", "..", "public", fileAddres)
        if (fs.existsSync(pathfile)) fs.unlinkSync(pathfile)

    }
}

function listOfImageFromRequest(files, fileuploadpath) {
    if (files?.length > 0) {
        return files.map(file => path.join((fileuploadpath.replace(/\\/g, '/')), file.filename))
    } else {
        return []
    }
}
function copyObjet(object) {
    return JSON.parse(JSON.stringify(object))
}

function setFeature(body) {
    const { colors, width, weight, height, length } = body
    let feature = {}
    feature.colors = colors
    if (!isNaN(width) || !isNaN(height) || !isNaN(weight) || !isNaN(length)) {
        if (!width) feature.width = 0
        else feature.width = width
        if (!height) feature.height = 0
        else feature.height = height
        if (!length) feature.length = 0
        else feature.length = length
        if (!weight) feature.weight = 0
        else feature.weight = weight

    }

    return feature
}

function getTime(time) {
    let total = Math.round(time) / 60;
    let [min, percentage] = String(total).split(".");
    if (percentage == undefined) percentage = "0"
    let sec = Math.round(((percentage.substring(0, 2)) * 60) / 100);
    let hour = 0;
    if (min > 59) {
        total = min / 60;
        [hour, percentage] = String(total).split(".")
        if (percentage == undefined) percentage = "0"
        min = Math.round(((percentage.substring(0, 2)) * 60) / 100);
    }
    if (hour < 10) hour = `0${hour}`;
    if (min < 10) min = `0${min}`
    if (sec < 10) sec = `0${sec}`
    return hour + ":" + min + ":" + sec;
}

function getCourseTime(chapters = []) {
    let time, hour, minute, second = 0;
    for (const chapter of chapters) {
        if (Array.isArray(chapter?.episode)) {
            for (const episod of chapter.episode) {
                if (episod?.time) time = episod.time.split(":") // [hour, min, second]
                else time = "00:00:00".split(":")
                if (time.length == 3) { //01:11:11
                    second += Number(time[0]) * 3600 // convert hour to second
                    second += Number(time[1]) * 60 // convert minute to second
                    second += Number(time[2]) //sum second with seond
                } else if (time.length == 2) { //05:23
                    second += Number(time[0]) * 60 // convert minute to second
                    second += Number(time[1]) //sum second with seond
                }
            }
        }
    }
    hour = Math.floor(second / 3600); //convert second to hour
    minute = Math.floor(second / 60) % 60; //convert second to mintutes
    second = Math.floor(second % 60); //convert seconds to second
    if (String(hour).length == 1) hour = `0${hour}`
    if (String(minute).length == 1) minute = `0${minute}`
    if (String(second).length == 1) second = `0${second}`
    return (hour + ":" + minute + ":" + second)
}


async function UserBasket(userID, discount = {}) {
    const userDetail = await UserModel.aggregate([
        {
            $match: {
                _id: userID
            }
        },
        {
            $project: {
                basket: 1
            }
        },
        {
            $lookup: {
                from: "products",
                localField: 'basket.products.productID',
                foreignField: '_id',
                as: 'productDetail'
            }
        },
        {
            $lookup: {
                from: "courses",
                localField: 'basket.courses.courseID',
                foreignField: '_id',
                as: 'courseDetail'
            }
        },

        {
            $addFields: {
                "productDetail": {
                    $function: {
                        body: function (productDetail, products) {
                            return productDetail.map(function (product) {
                                const count = products.find(item => item.productID.valueOf() === product.
                                    _id.valueOf()).count;
                                const totalPrice = count * product.price
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice,
                                    finalPrice: totalPrice - ((product.discount / 100) * totalPrice)
                                }
                            })
                        },
                        args: ['$productDetail', '$basket.products'],
                        lang: 'js'
                    }


                },
                "courseDetail": {
                    $function: {
                        body: function (courseDeatail) {
                            return courseDeatail.map(function (course) {
                                return {
                                    ...course,
                                    finalPrice: course.price - ((course.discount / 100) * course.price)
                                }
                            })
                        },
                        args: ['$courseDetail'],
                        lang: 'js'
                    }


                },
                "payDetail": {
                    $function: {
                        body: function (courseDeatail, productDetail, products) {
                            const courseAmount = courseDeatail.reduce(function (total, course) {
                                return total + (Number(course.price) - ((Number(course.discount) / 100) * course.price))


                            }, 0)
                            const productAmount = productDetail.reduce(function (total, product) {
                                const count = products.find(item => item.productID.valueOf() === product._id.valueOf()).count
                                const totalPrice = count * product.price
                                return total + (totalPrice - ((Number(product.discount) / 100) * totalPrice))


                            }, 0)
                            const courseId = courseDeatail.map(course => course._id.valueOf())
                            const productId = productDetail.map(product => product._id.valueOf())
                            return {
                                courseAmount,
                                productAmount,
                                payAmount: courseAmount + productAmount,
                                courseId,
                                productId
                            }
                        },
                        args: ['$courseDetail', "$productDetail", '$basket.products'],
                        lang: 'js'
                    }


                }
            }
        }, {
            $project: {
                basket: 0
            }
        }

    ]);
    return copyObjet(userDetail)
}
function invoiceNumberGenerator() {
    let d = new Date();
    let dayname = d.toLocaleString({ weekday: `long` }).split(",").join('')
    return dayname
}

module.exports = {
    numberRandomGenerate,
    signAccessToken,
    signRefreshToken,
    verifyRfreshToken,
    deleteFieldInPublic,
    listOfImageFromRequest,
    copyObjet,
    setFeature,
    getTime,
    getCourseTime,
    UserBasket,
    invoiceNumberGenerator
}