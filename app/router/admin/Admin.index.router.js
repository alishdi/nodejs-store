const { Router } = require('express');
const { productRouter } = require('./product/product');
const { blogRouter } = require('./blog/blog');
const { categoryRouter } = require('./category/category');
const { userRouter } = require('./user/user');
const { coursesRouter } = require('./courses/course');
const { roleRouter } = require('../role');
const { premissionsRouter } = require('../premission');
const { verifyToken } = require('../../http/middleware/verifyAccessToken');
const { checkPermission } = require('../../http/middleware/permission.guard');
const { PERMISSIONS } = require('../../utils/constant');

const AdminApiRouter = Router()

AdminApiRouter.use('/product', verifyToken,checkPermission([PERMISSIONS.SUPPLIER]),productRouter);
AdminApiRouter.use('/blog', verifyToken,checkPermission([PERMISSIONS.TEACHER]), blogRouter);
AdminApiRouter.use('/category', verifyToken,checkPermission([PERMISSIONS.CONTENT_MANAGER]), categoryRouter);
AdminApiRouter.use('/user', verifyToken, userRouter);
AdminApiRouter.use('/course', verifyToken,checkPermission([PERMISSIONS.TEACHER]), coursesRouter);
AdminApiRouter.use('/role', verifyToken,checkPermission([PERMISSIONS.ADMIN]), roleRouter);
AdminApiRouter.use('/permission', verifyToken,checkPermission([PERMISSIONS.ADMIN]), premissionsRouter);


module.exports={
    AdminApiRouter
}