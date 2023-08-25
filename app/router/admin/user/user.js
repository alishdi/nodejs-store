const { Router } = require('express');
const { UserController } = require('../../../http/controllers/admin/user.controller');
const { checkPermission } = require('../../../http/middleware/permission.guard');
const { PERMISSIONS } = require('../../../utils/constant');

const userRouter = Router()
/**
 * @swagger
 *  components:
 *      schemas:
 *          update-profile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first name of user
 *                      example: ali
 *                  last_name:
 *                      type: string
 *                      description: the first name of user
 *                      example: shahidi
 *                  email:
 *                      type: string
 *                      description: the first name of user
 *                      example: alishahidi267@gmail.com
 *                  username:
 *                      type: string
 *                      description: the first name of user
 *                      example: alishdi
       
 */

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

userRouter.get('/get-all-user',checkPermission([PERMISSIONS.ADMIN]), UserController.getAllUsers)
/**
 * @swagger
 *  /admin/edit-user:
 *      patch:
 *          tags: [User(AdminPanel)]
 *          summary: update user datial and profile
 *          requestBody: 
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/update-profile'
 *          responses:
 *              200:
 *                  description: success
 * 
 */



userRouter.patch('/edit-user', UserController.updateUserProfile)


/**
 * @swagger
 *  /admin/profile-user:
 *      get:
 *          tags: [User(AdminPanel)]    
 *          summary: get uuser profile
 *          responses:
 *              200:
 *                  description: success
 * 
 */

userRouter.get('/profile-user',checkPermission([]), UserController.userProfile)

module.exports = {

    userRouter
}