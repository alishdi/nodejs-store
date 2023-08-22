const {Router}=require('express');
const { UserController } = require('../../../http/controllers/admin/user.controller');
const userRouter=Router()

/**
 * @swagger
 *  /admin/get-all-user:
 *      get:
 *          tags: [User(AdminPanel)]    
 *          summary: get all of users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in users
 *          responses:
 *              200:
 *                  description: success
 * 
 */

userRouter.get('/get-all-user',UserController.getAllUsers)

module.exports={

    userRouter
}