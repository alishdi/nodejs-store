const { Router } = require('express');
const { CategoryController } = require('../../../http/controllers/admin/category.controller');
/**
 * @swagger
 *  /admin/add-category:
 *      post:
 *          tags: [admin-Panel]
 *          summary: create new category title
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
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
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
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
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
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
categoryRouter.get('/children/:parent', CategoryController.getChildOfParent)



/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [admin-Panel]
 *          summary: get all  of category
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *          responses:
 *              20:
 *                  description: success
 * 
 *                     
 * 
 * 
 */
categoryRouter.get('/category/all', CategoryController.getAllCategory)

/**
 * @swagger
 *  /admin/category/all-without-populate:
 *      get:
 *          tags: [admin-Panel]
 *          summary: get all  of categories without populate
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *          responses:
 *              200:
 *                  description: success
 */
categoryRouter.get('/category/all-without-populate', CategoryController.getAllCategoryWihoutPopulate)



/**
 * @swagger
 *  /admin/delete-category/{id}:
 *      delete:
 *          tags: [admin-Panel]
 *          summary: removeCategory
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 * 
 *                     
 * 
 * 
 */
categoryRouter.delete('/delete-category/:id', CategoryController.removeCategory)
/**
 * @swagger
 *  /admin/get-category/{id}:
 *      get:
 *          tags: [admin-Panel]
 *          summary: get-category
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 * 
 *                     
 * 
 * 
 */

categoryRouter.get('/get-category/:id', CategoryController.getCategoryById)


/**
 * @swagger
 *  /admin/update-category/{id}:
 *      patch:
 *          tags: [admin-Panel]
 *          summary: create new category title
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id
 *              -   in: formData
 *                  type: sring
 *                  name: title
 *                  
 *                  
 *         
 *          responses:
 *              201:
 *                  description: success
 *  
*/
categoryRouter.patch('/update-category/:id', CategoryController.editCategory)



module.exports = {
    categoryRouter
}