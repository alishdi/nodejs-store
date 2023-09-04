const { Router } = require('express');
const { PaymentController } = require('../../http/controllers/api/payment.controller');
const { verifyToken } = require('../../http/middleware/verifyAccessToken');

const paymetRouter = Router()

/**
 * @swagger
 *  tags:
 *      -   name: basket
 */

/**
 * @swagger
 * /payment:
 *     post:
 *          tags: [basket]
 *          summary: payment gatway for course and products
 *          responses:
 *               200:
 *                  description: success
 */
paymetRouter.post('/', verifyToken, PaymentController.paymentGateway)
/**
 * @swagger
 * /payment/verify:
 *     get:
 *          tags: [basket]
 *          summary: payment gatway for course and products
 *          responses:
 *               200:
 *                  description: success
 */
paymetRouter.get('/verify',PaymentController.verifyPayment)



module.exports = {
    paymetRouter
}