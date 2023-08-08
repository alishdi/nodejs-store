const { Router } = require('express');
const { BlogController } = require('../../../http/controllers/admin/blog.controller');
const { uploadFile } = require('../../../utils/multer');
const { string2arr } = require('../../../http/middleware/string2arr');
const { verifyToken } = require('../../../http/middleware/verifyAccessToken');
const blogRouter = Router()

/**
 * @swagger
 *  /admin/get-list-blog:
 *      get:
 *          tags: [blog(adminPanle)]
 *          summary: get all blogs
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *          responses:
 *              200:
 *                 description: success
 */

blogRouter.get('/get-list-blog', BlogController.GetListOfBlog)
/**
 * @swagger
 *  /admin/create/blog:
 *      post:
 *          tags: [blog(adminPanle)]
 *          summary: get all blogs
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Beare Token
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required: true
 *                  type: file
 *          responses:
 *              202:
 *                 description: created
 */

blogRouter.post('/create/blog', uploadFile.single('image'), string2arr("tags"), BlogController.createBlog)
/**
 * @swagger
 *  /admin/update/blog/{id}:
 *      patch:
 *          tags: [blog(adminPanle)]
 *          summary: update blogs
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header  
 *                  name: accesstoken
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5MzI3MCwiZXhwIjoxNjkxMzk2ODcwfQ.sJ56gHpkLai2mG9Z9P1dV0diS9j7Gw0Ufm-k-a_UuZE
 *                  example: Beare Token
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: short_text
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || str || undefined
 *                  type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *          responses:
 *              202:
 *                 description: created
 */

blogRouter.patch('/update/blog/:id', uploadFile.single('image'), string2arr("tags"), BlogController.updateBlogById)

/**
 * @swagger
 *  /admin/get-blog/{id}:
 *      get:
 *          tags: [blog(adminPanle)]
 *          summary: get blog by id
 *          parameters:
 *              -   in: path  
 *                  name: id
 *                  type: string      
 *                  required: true  
 *              -   in: header
 *                  name: accesstoken
 *                  type: string
 *                  required: true
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5Mjc1MywiZXhwIjoxNjkxMzk2MzUzfQ.anvrjq-MUJ1JT1sgajwv_5yqxYir7FDYEE5SyqtaA4M
 *                  example: Bearer token
 *          responses:
 *              200:
 *                 description: success
 */

blogRouter.get('/get-blog/:id', BlogController.getOneBlogById)

/**
 * @swagger
 *  /admin/delete-blog/{id}:
 *      delete:
 *          tags: [blog(adminPanle)]
 *          summary: delete blog by id
 *          parameters:
 *              -   in: path  
 *                  name: id
 *                  type: string      
 *                  required: true  
 *              -   in: header
 *                  name: accesstoken
 *                  type: string
 *                  required: true
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTM5MzI3MCwiZXhwIjoxNjkxMzk2ODcwfQ.sJ56gHpkLai2mG9Z9P1dV0diS9j7Gw0Ufm-k-a_UuZE
 *                  example: Bearer token
 *          responses:
 *              200:
 *                 description: success
 */

blogRouter.delete('/delete-blog/:id', BlogController.deleteBlogById)
module.exports = {
    blogRouter
}