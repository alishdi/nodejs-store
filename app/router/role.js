const { Router } = require('express');
const { Rolecontroller } = require('../http/controllers/admin/RBAC/role.controller');
const { string2arr } = require('../http/middleware/string2arr');

const roleRouter = Router()




/**
 * @swagger
 *  components:
 *      schemas:
 *          role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  premissions:
 *                      type: array
 *                      description: the perimissions id for role
 *          edit-role:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  premissions:
 *                      type: array
 *                      description: the perimissions id for role
 *                     
 */





/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(Adminpanel)]
 *          summary: create new role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/role'
 *          
 *          responses:
 *              201:
 *                  description: created new Product
 */

roleRouter.post('/add',string2arr('premissions'), Rolecontroller.createNewRole)






/**
 * @swagger
 *  /admin/role/edit/{id}:
 *      patch:
 *          tags: [RBAC(Adminpanel)]
 *          summary: edit role
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
 *                          $ref: '#/components/schemas/edit-role'
 *          
 *          responses:
 *              200:
 *                  description: edit role

 */

roleRouter.patch('/edit/:id',string2arr('premissions'),Rolecontroller.updateRoleByID)
/**
 * @swagger
 *  /admin/role/remove/{field}:
 *     delete:
 *          tags: [RBAC(Adminpanel)]
 *          summary: remove role
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: field
 *                  required: true
 *          responses:
 *              200:
 *                  description: edit role
 */
roleRouter.delete('/remove/:field',Rolecontroller.removeRole)




/**
 * @swagger
 *  /admin/role/all:
 *      get:
 *          tags: [RBAC(Adminpanel)]
 *          summary: all role
 *          responses:
 *              200:
 *                  description: edit role
 */

roleRouter.get('/all', Rolecontroller.getAllRole)

module.exports = {
    roleRouter
}