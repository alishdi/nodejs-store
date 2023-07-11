const { Router } = require('express');
const { HomeController } = require('../../http/controllers/api/home.controller');

const router = Router()

router.post('/', HomeController.indexpage)


module.exports = {
    HomeRoutes: router
}