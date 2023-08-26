const { Router } = require('express');
const { CourseController } = require('../../../http/controllers/admin/course.controller');
const { uploadFile, uploadvideo } = require('../../../utils/multer');
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
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title       
 *                  -   text       
 *                  -   type       
 *                  -   video       
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 64dc7dadfc16e867909b5db7
 *                  chapterID: 
 *                      type: string
 *                      example: 64e082e14b47630a20f4db06
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  text: 
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      description: the file of video 
 *                      format: binary
 *          editEpisode:
 *              type: object     
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of episode
 *                      example: ویدیو شماره یک - متغیر ها
 *                  text: 
 *                      type: string
 *                      description: the describe about this episode
 *                      example: توی این قسمت بطور کامل دررابطه با .... گفته شده
 *                  type: 
 *                      type: string
 *                      description: the episode type (unlock or lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video: 
 *                      type: string
 *                      description: the file of video 
 *                      format: binary

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
 *          editChapter:
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
 *          edit-course:
 *              type: object
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
 *  /admin/course/add-course:
 *      post:
 *          tags: [course(Adminpanel)]
 *          summary: edit and save course
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
 *  /admin/course/edit-course/{id}:
 *      patch:
 *          tags: [course(Adminpanel)]
 *          summary: create and save course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/edit-course'
 *          
 *          responses:
 *              201:
 *                  description: created new Product

 */
coursesRouter.patch('/edit-course/:id', uploadFile.single('image'), string2arr('tags'), CourseController.editCourseByID)


/**
 * @swagger
 *  /admin/course/all-courses:
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
 *  /admin/course/get-course-by-id/{id}:
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
 *  /admin/course/add-chapter:
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



//  chapter part

coursesRouter.put('/add-chapter', CourseController.addChapter)
/**
 * @swagger
 *  /admin/course/get-list-chapter/{id}:
 *      get:
 *          tags: [course(Adminpanel)]
 *          summary: get list of chapter
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: text
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 *              
 */

coursesRouter.get('/get-list-chapter/:id', CourseController.listOfChapters)
/**
 * @swagger
 *  /admin/course/remove-chapter/{id}:
 *      patch:
 *          tags: [course(Adminpanel)]
 *          summary: remove chapter by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: text
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success
 *              
 */

coursesRouter.patch('/remove-chapter/:id', CourseController.removeChapterById)
/**
 * @swagger
 *  /admin/course/update-chapter/{id}:
 *      patch:
 *          tags: [course(Adminpanel)]
 *          summary: update chapter
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editChapter'
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/editChapter'
 *              
 *          responses: 
 *              200:
 *                  description: success
 *              
 */


coursesRouter.patch('/update-chapter/:id', CourseController.updateChapterById)

/**
 * @swagger
 *  /admin/course/add-episode:
 *      post:
 *          tags: [course(Adminpanel)]
 *          summary: create new Chapter for courses
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                           $ref: '#/components/schemas/AddEpisode'
 *          responses: 
 *              200:
 *                  description: success
 *              
 */
coursesRouter.post('/add-episode', uploadvideo.single('video'), CourseController.addNewEpisode)
/**
 * @swagger
 *  /admin/course/delete-episode/{id}:
 *      delete:
 *          tags: [course(Adminpanel)]
 *          summary: delete Chapter for courses
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id              
 *          responses: 
 *              200:
 *                  description: success
 *              
 */
coursesRouter.delete('/delete-episode/:id', CourseController.removeEpisodeByID)







/**
 * @swagger
 *  /admin/edit-episode/{id}:
 *      patch:
 *          tags: [course(Adminpanel)]
 *          summary: create new Chapter for courses
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  required: true
 *                  name: id       
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data: 
 *                      schema:
 *                           $ref: '#/components/schemas/editEpisode'
 *          responses: 
 *              200:
 *                  description: success
 *              
 */
coursesRouter.patch('/edit-episode/:id', uploadvideo.single('video'), CourseController.editEpsodById)


module.exports = {
    coursesRouter
}
// {
//     "data": {
//       "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjYwMjA1NywiZXhwIjoxNjkyNjA1NjU3fQ.z4KUs73GCHtU72V4IYYtr50lIGllhsE1gBD5VzEo-5M",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MjYwMjA1NywiZXhwIjoxNzI0MTU5NjU3fQ.qSTWHcrpObwFosxc0lMp5l0JdpwPbFcbmwOiH2x6rBY"
//     }
//   }