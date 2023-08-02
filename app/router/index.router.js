const { Router } = require('express');
const { HomeRoutes } = require('./api');
const { UserAuthRouter } = require('./user/auth');
const redisClient = require('../utils/init_redis');
const { devRouter } = require('./developer.router');
const { categoryRouter } = require('./admin/category/category');

const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter)
indexRouter.use('/', HomeRoutes)
indexRouter.use('/developer', devRouter)
indexRouter.use('/admin', categoryRouter)

module.exports = {
    indexRouter
}