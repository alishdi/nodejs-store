const { Router } = require('express');
const { HomeRoutes } = require('./api');
const { UserAuthRouter } = require('./user/auth');
const { devRouter } = require('./developer.router');
const { verifyToken } = require('../http/middleware/verifyAccessToken');
const { AdminApiRouter } = require('./admin/Admin.index.router');
const { graphqlHTTP } = require('express-graphql');
const { grafqlConfig } = require('../utils/graphql.config');
const { paymetRouter } = require('./api/payment');
const { SupprtSectionRouter } = require('./support/support.router');
const indexRouter = Router()
indexRouter.use('/user', UserAuthRouter);
indexRouter.use('/', HomeRoutes);
indexRouter.use('/payment', paymetRouter);
indexRouter.use('/developer', devRouter);
indexRouter.use('/admin', verifyToken, AdminApiRouter)
indexRouter.use('/graphql', graphqlHTTP(grafqlConfig))
indexRouter.use('/support', SupprtSectionRouter)


module.exports = {
    indexRouter
}