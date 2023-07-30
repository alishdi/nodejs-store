const { Router } = require('express');
const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const UserAuthRouter = Router()

/**
 * @swagger
 * /user/get-otp:
 *      post:
 *          summary: login user in userpanel with phon number
 *          description: one time paswword(otp) login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *  
 *          responses: 
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500: 
 *                  description: Intenal server err 
 */
UserAuthRouter.post('/get-otp', UserAuthController.getOpt)

/**
 * @swagger
 * /user/chek-otp:
 *      post:
 *          tags: [user-Authentication]
 *          summary: check-otp value in user controller
 *          description: chek otp with code - mobile and expire dates
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code recived
 *              in: formData
 *              required: true
 *              type: string
 *          responses: 
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500: 
 *                  description: Intenal server err 
 *              
 *              
 *  
 *  
 */
UserAuthRouter.post('/chek-otp', UserAuthController.checkOtp)
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: send refresh token for get new refresh token
 *          description: refresh token
 *          parameters: 
 *              -   in: body
 *                  required: true
 *                  type: string
 *                  name: refreshToken
 *          responses:
 *              200:
 *                  description: success1`
 *      
 *          
 */
UserAuthRouter.post('/refresh-token',UserAuthController.refreshToken)

module.exports = {
    UserAuthRouter
}