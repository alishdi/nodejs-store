const { ProductsModel } = require("../../../model/products");
const { deleteFieldInPublic, listOfImageFromRequest } = require("../../../utils/func");
const { createProductsschema } = require("../../validator/product/product.shchema");
const path = require('path');

class ProductController {
    async addProduct(req, res, next) {
        try {
            
            const images = listOfImageFromRequest(req?.files || [], req.body.fileuploadpath)

            const data = req.body;
            const productBody = await createProductsschema.validateAsync(data)
 
      

            const { title, text, short_text, category, tags, count, price, discount, width, height, weight, length } = productBody

            const supplier = req.user._id
            let feature = {}, type = 'physical'
            if (width || height || weight || length) {
                if (!width) feature.width = 0
                else feature.width = width
                if (!height) feature.height = 0
                else feature.height = height
                if (!length) feature.length = 0
                else feature.length = length
                if (!weight) feature.weight = 0
                else feature.weight = weight

            } else {
                type = 'virtual'
            }
            const product = await ProductsModel.create({ title, text, short_text, category, tags, count, price, discount, images, feature, supplier, type })



            return res.json({
                data: {
                    status: 201,
                    message: 'افزودن محصول با موفقیت انجام شد'
                }
            })

        } catch (error) {
            console.log(error);
            deleteFieldInPublic(req.body.image)
            next(error)
        }

    }
    async editProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    async removeProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    async getAllProduct(req, res, next) {
        try {
            const product = await ProductsModel.find({})
            return res.status(200).json({
                data: {
                    status: 200,
                    product
                }

            })

        } catch (error) {
            next(error)
        }

    }
    async getoneProduct(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
}

module.exports = new ProductController()