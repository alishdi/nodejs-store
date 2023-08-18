const { Router } = require('express');
const { CourseController } = require('../../../http/controllers/admin/course.controller');
const { uploadFile } = require('../../../utils/multer');
const { string2arr } = require('../../../http/middleware/string2arr');
const coursesRouter = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          types:
 *                  type: string
 *                  enum:
 *                      -   free
 *                      -   cash
 *                      -   special                

 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          addChapter:
 *                  type: object
 *                  required:
 *                      -   id
 *                      -   title
 *                  properties:
 *                      id:
 *                          type: string
 *                          example: 64dc7dadfc16e867909b5db7
 *                      title:
 *                          type: string
 *                          example: chapter 1 zero-hero js
 *                      text: 
 *                          type: string
 *                          example: describ about this chapter
 *          course:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن بلند تستی
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  image:
 *                      type: string
 *                      format: binary
 *                  type:
 *                      $ref: '#/components/schemas/types'
 */



/**
 * @swagger
 *  /admin/add-course:
 *      post:
 *          tags: [course(Adminpanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/course'
 *          
 *          responses:
 *              201:
 *                  description: created new Product

 */
coursesRouter.post('/add-course', uploadFile.single('image'), string2arr('tags'), CourseController.addCourses)


/**
 * @swagger
 *  /admin/all-courses:
 *      get:
 *          tags: [course(Adminpanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: text
 *                  description: search in courses
 *          responses: 
 *              200:
 *                  description: success
 *              
 */

coursesRouter.get('/all-courses', CourseController.getAllCourses)
/**
 * @swagger
 *  /admin/get-course-by-id/{id}:
 *      get:
 *          tags: [course(Adminpanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: text
 *                  description: search in courses
 *          responses: 
 *              200:
 *                  description: success
 *              
 */

coursesRouter.get('/get-course-by-id/:id', CourseController.getCourseById)
/**
 * @swagger
 *  /admin/add-chapter:
 *      put:
 *          tags: [course(Adminpanel)]
 *          summary: add chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addChapter'
 *              
 *          responses: 
 *              200:
 *                  description: success
 *              
 */

coursesRouter.put('/add-chapter', CourseController.addChapter)
// coursesRoute.post()
// coursesRoute.delete()
// coursesRoute.patch()
// coursesRoute.get()


module.exports = {
    coursesRouter
}