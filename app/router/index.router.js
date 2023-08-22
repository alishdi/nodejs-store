const { Router } = require('express');
const { HomeRoutes } = require('./api');
const { UserAuthRouter } = require('./user/auth');
const { devRouter } = require('./developer.router');
const { categoryRouter } = require('./admin/category/category');
const { blogRouter } = require('./admin/blog/blog');
const { verifyToken, checkRolle } = require('../http/middleware/verifyAccessToken');
const { productRouter } = require('./admin/product/product');
const { coursesRouter } = require('./admin/courses/course');
const { userRouter } = require('./admin/user/user');

const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter)
indexRouter.use('/', HomeRoutes)
indexRouter.use('/developer', devRouter)
indexRouter.use('/admin', verifyToken, checkRolle('ADMIN'), categoryRouter)
indexRouter.use('/admin', verifyToken, checkRolle("ADMIN"), blogRouter)
indexRouter.use('/admin', verifyToken, checkRolle("ADMIN"), productRouter)
indexRouter.use('/admin', verifyToken, checkRolle("ADMIN"), coursesRouter)
indexRouter.use('/admin', verifyToken, checkRolle("ADMIN"), userRouter)

module.exports = {
    indexRouter
}