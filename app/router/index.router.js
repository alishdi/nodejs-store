const { Router } = require('express');
const { HomeRoutes } = require('./api');
const { UserAuthRouter } = require('./user/auth');
const redisClient = require('../utils/init_redis');
const { devRouter } = require('./developer.router');
(async () => {
    await redisClient.set('key', 'value')
    const value =await redisClient.get('key')
    console.log(value);

})()
const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter)
indexRouter.use('/', HomeRoutes)
indexRouter.use('/developer',devRouter)

module.exports = {
    indexRouter
}