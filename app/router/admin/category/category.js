const { Router } = require('express');
const { CategoryController } = require('../../../http/controllers/admin/category.controller');
/**
 * @swagger
 *  /admin/add-category:
 *      post:
 *          tags: [admin-Panel]
 *          summary: create new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: sring
 *                  name: parent
 *                  
 *         
 *          responses:
 *              201:
 *                  description: success
 *  
*/

const categoryRouter = Router()
categoryRouter.post('/add-category', CategoryController.addCategory)

/**
 * @swagger
 *  /admin/parents-category:
 *      get:
 *          tags: [admin-Panel]
 *          summary: get all parents of category
 *          responses:
 *              201:
 *                  description: success
 * 
 *                     
 * 
 * 
 */

categoryRouter.get('/parents-category', CategoryController.getAllParents)


/**
 * @swagger
 *  /admin/children/{parent}:
 *      get:
 *          tags: [admin-Panel]
 *          summary: get all child of category
 *          parameters: 
 *              -   in: path
 *                  name: parent
 *                  required: true
 *                  type: string
 *          responses:
 *              201:
 *                  description: success
 * 
 *                     
 * 
 * 
 */
categoryRouter.get('/children/:parent',CategoryController.getChildOfParent)



/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [admin-Panel]
 *          summary: get all  of category
 *          responses:
 *              20:
 *                  description: success
 * 
 *                     
 * 
 * 
 */
categoryRouter.get('/category/all',CategoryController.getAllCategory)
/**
 * @swagger
 *  /admin/delete-category/{id}:
 *      delete:
 *          tags: [admin-Panel]
 *          summary: removeCategory
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              20:
 *                  description: success
 * 
 *                     
 * 
 * 
 */
categoryRouter.delete('/delete-category/:id',CategoryController.removeCategory)

module.exports = {
    categoryRouter
}