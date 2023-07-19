const { Router } = require('express');
const { HomeRoutes } = require('./api');
const { UserAuthRouter } = require('./auth');
const redisClient = require('../utils/init_redis');
(async () => {
    await redisClient.set('key', 'value')
    const value =await redisClient.get('key')
    console.log(value);

})()
const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter)
indexRouter.use('/', HomeRoutes)

module.exports = {
    indexRouter
}