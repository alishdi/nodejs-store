const { Router } = require('express');
const productController = require('../../../http/controllers/admin/product.controller');
const { uploadFile } = require('../../../utils/multer');
const { string2arr } = require('../../../http/middleware/string2arr');

const productRouter = Router();


/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items: 
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */ 

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
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 *                      
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          edit-Product:
 *              type: object
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
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
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
productRouter.post('/add-product', uploadFile.array('images', 10), string2arr('tags','colors') ,productController.addProduct)

/**
 * @swagger
 *  /admin/get-all-product:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save product
 *          parameters:
 *              -   in: query 
 *                  name: search
 *                  type: string
 *                  description: text for search in title text shorttext
 *          responses:
 *              201:
 *                  description: create new product

 */

productRouter.get('/get-all-product', productController.getAllProduct)



/**
 * @swagger
 *  /admin/get-product-by-id/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get one product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: object id product
 *          responses:
 *              200:
 *                  description: success
 */





productRouter.get('/get-product-by-id/:id', productController.getoneProduct)
/**
 * @swagger
 *  /admin/delete-product-by-id/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: delete one product by id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: delete id product
 *          responses:
 *              200:
 *                  description: success
 */





productRouter.delete('/delete-product-by-id/:id', productController.removeProduct)




/**
 * @swagger
 *  /admin/edit-product/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: edit and save product
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of update product
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/edit-Product'
 *          
 *          responses:
 *              200:
 *                  description: created new Product

 */
productRouter.patch('/edit-product/:id', uploadFile.array('images', 10), string2arr('tags','colors') ,productController.editProduct)

module.exports = {
    productRouter
}




// {
//     "data": {
//       "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTkxNDk2OCwiZXhwIjoxNjkxOTE4NTY4fQ.9Q_UN-X8OSczJ-sorfS1KmLOkQB-dAyWFuqFOb_PTAo",
//       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyOTQyMDIyMSIsImlhdCI6MTY5MTkxNDk2OCwiZXhwIjoxNzIzNDcyNTY4fQ.yU8tkfaHUG0U0BTsdVr-wgwUGxou__oS0vtpNImSrfE"
//     }