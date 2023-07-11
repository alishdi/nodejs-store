const { Router } = require('express');
const { HomeRoutes } = require('./api');
const { UserAuthRouter } = require('./auth');

const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter)
indexRouter.use('/', HomeRoutes)

module.exports = {
    indexRouter
}