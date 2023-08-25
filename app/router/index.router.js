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
const { premissionsRouter } = require('./premission');
const { roleRouter } = require('./role');
const { checkPermission } = require('../http/middleware/permission.guard');
const { PERMISSIONS } = require('../utils/constant');

const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter);
indexRouter.use('/', HomeRoutes);
indexRouter.use('/developer', devRouter);
indexRouter.use('/admin', verifyToken, userRouter);
indexRouter.use('/admin', verifyToken,checkPermission([PERMISSIONS.TEACHER]), coursesRouter);
indexRouter.use('/admin', verifyToken,checkPermission([PERMISSIONS.SUPPLIER]),productRouter);
indexRouter.use('/admin', verifyToken,checkPermission([PERMISSIONS.TEACHER]), blogRouter);
indexRouter.use('/admin', verifyToken,checkPermission([PERMISSIONS.CONTENT_MANAGER]), categoryRouter);
indexRouter.use('/admin', verifyToken,checkPermission([PERMISSIONS.ADMIN]), roleRouter);
indexRouter.use('/admin', verifyToken,checkPermission([PERMISSIONS.ADMIN]), premissionsRouter);

module.exports = {
    indexRouter
}