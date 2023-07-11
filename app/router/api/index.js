const { Router } = require('express');
const { HomeController } = require('../../http/controllers/api/home.controller');

const router = Router()

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [indexpage]
 *      description : get all need data for index page
 *      responses:
 *          200:
 *              description: success
 *          404:
 *               description: notfound
 */             
router.get('/', HomeController.indexpage)


module.exports = {
    HomeRoutes: router
}