const { Router } = require('express');
const { HomeRoutes } = require('./api');

const indexRouter = Router()
indexRouter.use(HomeRoutes)

module.exports={
    indexRouter
}