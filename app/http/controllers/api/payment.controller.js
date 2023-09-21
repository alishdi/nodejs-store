const { default: axios } = require("axios");
const { createError } = require("../../../utils/constant");
const { UserBasket, invoiceNumberGenerator } = require("../../../utils/func");
const { Controller } = require("../controller");
const { PaymentModel } = require("../../../model/payments");
const { UserModel } = require("../../../model/users");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class PaymentController extends Controller {
    async paymentGateway(req, res, next) {
        try {
            const user = req.user;
            if (user.basket.courses.length == 0 && user.basket.products.length == 0) throw createError.BadRequest('سبد خرید شما خالی است');
            const basket = (await UserBasket(user._id))?.[0]
            if (!basket?.payDetail?.payAmount) throw createError.BadRequest('مشخصات پرداخت یافت نشد')
            const zarinPal_request_url = 'https://api.zarinpal.com/pg/v4/payment/request.json';
            const gatWayURL = 'https://www.zarinpal.com/pg/StartPay';
            const amount = basket?.payDetail?.payAmount;
            const description = 'بابت خرید دوره یا محصولات';
            const zarinPal_options = {
                merchant_id: 'exapmple',
                amount,
                description,
                callback_url: 'http://localhost:5000/payment/verify',
                metadata: {
                    email: user.email || 'example@gmail.com',
                    mobile: user.mobile
                },

            }
            const rquestResult = await axios.post(zarinPal_request_url, zarinPal_options).then(result => result.data);
            const { authority, code } = rquestResult.data;
            await PaymentModel.create({
                invoiceNumber: invoiceNumberGenerator(),
                amount,
                description,
                user: user._id,
                authority,
                verify: false,
                basket
            })
            if (code == 100 && authority) {
                return res.status(200).json({
                    code,
                    gatWayURL: `${gatWayURL}/${authority}`
                })

            }
            throw createError.BadRequest('پارامترهای ارسال شده صحیح نمیباشد کد ها صحیح است ولی merthcandID صحیح نیست')

        } catch (error) {
            next(error)
        }
    }

    async verifyPayment(req, res, next) {
        try {
            const { Authority: authority } = req.query;
            const verifyURL = 'https://api.zarinpal.com/pg/v4/payment/verify.json';
            const payment = await PaymentModel.findOne({ authority })
            if (payment?.verify) throw createError.BadRequest('تراکنش قبلا انجام شده است')
            if (!payment) createError.NotFound('تراکنش در انتظار پرداخت یافت نشد')
            const verifyBody = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: ''


            })
            const verifyResult = await fetch(verifyURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'

                },
                body: verifyBody
            }).then(result => result.json())
            if (verifyResult.data.code == 100) {
                await PaymentModel.updateOne({ authority }, {
                    $set: {
                        refID: verifyResult.data.ref_id,
                        cardHash: verifyResult.data.card_hash,
                        verify: true
                    }
                })
                const user = await UserModel.findById(payment.user)
                await UserModel.updateOne({ _id: payment.user }, {
                    $set: {
                        courses: [...payment?.basket?.payDetail?.courseId || [], ...user.courses],
                        products: [payment?.basket?.payDetail?.productId || [], ...user.products],
                        basket: {
                            courses: [],
                            products: []
                        }
                    },

                })
                return res.status(200).json({
                    statusCode: 200,
                    data: {
                        message: 'پرداخت شما با موفقیت انجام شد'
                    }
                })
            }
            throw createError.BadRequest('پرداخت انجام نشد در صورت کسر وجه طی 72 ساعت به حساب شما بازمیگردد')
        } catch (error) {
            next(error)
        }
    }

}


module.exports = {
    PaymentController: new PaymentController()
}