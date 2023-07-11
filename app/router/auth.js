const { Router } = require('express');
const { UserAuthController } = require('../http/controllers/user/auth/auth.controller');

const UserAuthRouter = Router()
UserAuthRouter.post('/login',UserAuthController.login)

module.exports = {
    UserAuthRouter
}