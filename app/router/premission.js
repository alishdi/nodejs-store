const { Router } = require('express');
const { Premissionscontroller } = require('../http/controllers/admin/RBAC/premissions.controller');

const premissionsRouter = Router()





/**
 * @swagger
 *  components:
 *      schemas:
 *          permission:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of role
 *                  description:
 *                      type: string
 *                      description: the describe of permission
 *                      
 *          edit-permisson:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  description:
 *                      type: string
 *                      description: description
 */





/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(Adminpanel)]
 *          summary: create new premission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/permission'
 *          
 *          responses:
 *              201:
 *                  description: created new premission
 */

premissionsRouter.post('/add', Premissionscontroller.createNewPermissions)






/**
 * @swagger
 *  /admin/permission/edit/{id}:
 *      patch:
 *          tags: [RBAC(Adminpanel)]
 *          summary: edit premission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: id
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/edit-permisson'
 *          
 *          responses:
 *              200:
 *                  description: edit permission

 */
premissionsRouter.patch('/edit/:id',Premissionscontroller.updatePremissionByID)
/**
 * @swagger
 *  /admin/permission/remove/{field}:
 *     delete:
 *          tags: [RBAC(Adminpanel)]
 *          summary: remove premission
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: field
 *                  required: true
 *          responses:
 *              200:
 *                  description: edit premission
 */
premissionsRouter.delete('/remove/:field',Premissionscontroller.removePremission)




/**
 * @swagger
 *  /admin/permission/all:
 *      get:
 *          tags: [RBAC(Adminpanel)]
 *          summary: all premission
 *          responses:
 *              200:
 *                  description: edit role
 */
premissionsRouter.get('/all', Premissionscontroller.getAllPermissions)


module.exports = {
    premissionsRouter
}