const { Router } = require('express');
const { CategoryController } = require('../../../http/controllers/admin/category.controller');
const categoryRouter = Router()
/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of category
 *                  parent:
 *                      type: string
 *                      description: the title of category
 */



/**
 * @swagger
 *  /admin/category/add-category:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new category title
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: success
 */

categoryRouter.post('/add-category', CategoryController.addCategory)

/**
 * @swagger
 *  /admin/category/parents-category:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All parents of Category or Category Heads
 *          responses:
 *              200:
 *                  description: success
 */

categoryRouter.get('/parents-category', CategoryController.getAllParents)


/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All children of Parents Category 
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
categoryRouter.get('/children/:parent', CategoryController.getChildOfParent)



/**
 * @swagger
 *  /admin/category/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Categories 
 *          responses:
 *              200:
 *                  description: success
 */
categoryRouter.get('/category/all', CategoryController.getAllCategory)

/**
 * @swagger
 *  /admin/category/all-without-populate:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all categories without populate and nested structure
 *          responses:
 *              200:
 *                  description: success
 */
categoryRouter.get('/all-without-populate', CategoryController.getAllCategoryWihoutPopulate)



/**
 * @swagger
 *  /admin/category/delete-category/{id}:
 *      delete:
 *          tags: [Category(AdminPanel)]
 *          summary: remove category with object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */
categoryRouter.delete('/delete-category/:id', CategoryController.removeCategory)
/**
 * @swagger
 *  /admin/category/get-category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: find category by object-id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          responses:
 *              200:
 *                  description: success
 */

categoryRouter.get('/get-category/:id', CategoryController.getCategoryById)


/**
 * @swagger
 *  /admin/category/update-category/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: success
 *              500:    
 *                  description: internalServerErorr
 */
categoryRouter.patch('/update-category/:id', CategoryController.editCategory)



module.exports = {
    categoryRouter
}