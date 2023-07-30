const { Router } = require('express');
const bcrypt = require('bcrypt');
const { numberRandomGenerate } = require('../utils/func');
const devRouter = Router()

/**
 * @swagger
 *  tags:
 *      name: developer-routes
 *      description: developer utils
 *       
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags: [developer-routes]
 *          summary: hash password with bcrpt
 *          parameters:
 *              -   in: path
 *                  type: string 
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *  
 */

devRouter.get('/password-hash/:password', (req, res, next) => {
    const { password } = req.params
    const salt = bcrypt.genSaltSync(10)
    return res.send(bcrypt.hashSync(password, salt))
})
/**
 * @swagger
 *  /developer/number-random:
 *      get:
 *          tags: [developer-routes]
 *          summary: get andom number
 *          responses:
 *              200:
 *                  description: success
 *  
 */

devRouter.get('/number-random', (req, res, next) => {
    return res.send(numberRandomGenerate().toString())
})

module.exports = {
    devRouter
}