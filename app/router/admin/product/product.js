const { Router } = require('express');
const productController = require('../../../http/controllers/admin/product.controller');
const { uploadFile } = require('../../../utils/multer');
const { string2arr } = require('../../../http/middleware/string2arr');

const productRouter = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان محصول
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  tags:
 *                      type: array
 *                      description: the title of product
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of product
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of product
 *                      example: 20
 *                  count:
 *                      type: string
 *                      description: the title of product
 *                      example: 100
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product packet
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product packet
 *                      example: 0
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                      example: 0
 *                      
 */

/**
 * @swagger
 *  /admin/add-product:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          
 *          responses:
 *              201:
 *                  description: created new Product

 */
productRouter.post('/add-product', uploadFile.array('images',10), string2arr('tags'), productController.addProduct)

/**
 * @swagger
 *  /admin/get-all-product:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          responses:
 *              201:
 *                  description: create new product

 */

productRouter.get('/get-all-product', productController.getAllProduct)


module.exports = {
    productRouter
}




// {
//     "data": {
//       "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTc0NjAyOSwiZXhwIjoxNjkxNzQ5NjI5fQ.Ju_qJ4C8wUUnr-T5tOeB_kVOOswwRiZvTq3X3dAAOcU",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTc0NjAyOSwiZXhwIjoxNzIzMzAzNjI5fQ.Q-uFBJ4HTqtPPxFP1zjDxZJlDtlarsdfeP2QJzrVHQk"
//     }
//   }