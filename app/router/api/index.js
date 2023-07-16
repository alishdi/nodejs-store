const { Router } = require('express');
const { HomeController } = require('../../http/controllers/api/home.controller');
const { verifyToken } = require('../../http/middleware/verifyAccessToken');

const router = Router()

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [indexpage]
 *      description : get all need data for index page
 *      parameters: 
 *          -   in: header
 *              name: accesstoken
 *              example: Bearer YourToken
 *      responses:
 *          200:
 *              description: success
 *          404:
 *               description: notfound
 */             
router.get('/',verifyToken, HomeController.indexpage)


module.exports = {
    HomeRoutes: router
}