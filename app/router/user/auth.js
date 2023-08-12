const { Router } = require('express');
const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const UserAuthRouter = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          getOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile phon FA-Ir
 *          checkOPT:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: mobile phone FA-Ir
 *                  code:
 *                      type: integer
 *                      description: otp code
 *          refreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: mobile phone FA-Ir

 */

/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [authorization]
 *          summary: sen your phone number
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/getOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getOTP'
 *          responses:
 *              200:
 *                  description: success
 *          
 */
UserAuthRouter.post('/get-otp', UserAuthController.getOpt)

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [authorization]
 *          summary: sent your phone number & otp code
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOPT'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOPT'
 *          responses:
 *              200:
 *                  description: success
 *          
 */

UserAuthRouter.post('/check-otp', UserAuthController.checkOtp)

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [authorization]
 *          summary: send your refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *          responses:
 *              200:
 *                  description: success       
 */
UserAuthRouter.post('/refresh-token', UserAuthController.refreshToken)

module.exports = {
    UserAuthRouter
}