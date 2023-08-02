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

module.exports = {
    categoryRouter
}