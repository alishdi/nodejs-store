const { Router } = require('express');
const { SupportController } = require('../../http/controllers/support/support.controller');
const { namespaceRouter } = require('./namespace.router');
const { roomRouter } = require('./room.router');
const { checkLogin, checkAccessLogin } = require('../../http/middleware/auth');
const SupprtSectionRouter = Router()
SupprtSectionRouter.use('/namespace',namespaceRouter)
SupprtSectionRouter.use('/room',roomRouter)
SupprtSectionRouter.get('/login',checkAccessLogin,SupportController.loginForm)
SupprtSectionRouter.post('/login',checkAccessLogin,SupportController.login)
SupprtSectionRouter.get('/',checkLogin,SupportController.renderChatRoom)


module.exports = {
    SupprtSectionRouter
}