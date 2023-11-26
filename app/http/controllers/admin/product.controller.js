const { ProductsModel } = require("../../../model/products");
const { deleteFieldInPublic, listOfImageFromRequest, copyObjet, setFeature } = require("../../../utils/func");
const { createProductsschema } = require("../../validator/product/product.shchema");
const path = require('path');
const { objectIDValidator } = require("../../validator/public.validator");
const { createError } = require("../../../utils/constant");

class ProductController {
    constructor() {
        this.getoneProduct = this.getoneProduct.bind(this)
        this.removeProduct = this.removeProduct.bind(this)
        this.editProduct = this.editProduct.bind(this)
    }
    async addProduct(req, res, next) {
        try {

            const images = listOfImageFromRequest(req?.files || [], req.body.fileuploadpath)



            const data = req.body;

            const productBody = await createProductsschema.validateAsync(data)
            const { title, text, short_text, category, tags, count, price, discount } = productBody;
            const supplier = req.user._id
            let feature = setFeature(req.body)
            let type;
            if (feature.height || feature.length || feature.weight || feature.width) {
                type = 'physical'

            } else {
                type = 'virtual'
            }
            const product = await ProductsModel.create({ title, text, short_text, category, tags, count, price, discount, images, feature, supplier, type })



            return res.json({
                status: 201,
                data: {
                    message: 'افزودن محصول با موفقیت انجام شد'
                }
            })

        } catch (error) {
            
            deleteFieldInPublic(req.body.image)
            next(error)
        }

    }
    async editProduct(req, res, next) {
        try {
            const { id } = req.params
            const product = await this.getProductById(id)
            const data = copyObjet(req.body)
            console.log(data);
            data.images = listOfImageFromRequest(req.files || [], req.body.fileuploadpath)
            let feature = setFeature(req.body)
            data.feature = feature

            if (feature.height || feature.length || feature.weight || feature.width) {
                data.type = 'physical'

            } else {
                data.type = 'virtual'
            }



            let nullishData = ["", " ", "0", null, undefined]
            let blackListFields = ['bookmark', 'deslike', 'like', 'comments', 'supplier', 'width', 'length', 'height', 'weight', 'colors']
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if (nullishData.includes(data[key])) delete data[key]

            })
            const updateResult = await ProductsModel.updateOne({ _id: product.id }, { $set: data })
            if (updateResult.modifiedCount == 0) throw { status: createError.InternalServerError('server err') }

            return res.status(200).json({
                status: 200,
                data: {
                    message: 'با موفقیت به روز رسانی شد',

                }
            })


        } catch (error) {
            next(error)
        }

    }
    async removeProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.getProductById(id);
            const removeProductResult = await ProductsModel.deleteOne({ _id: product._id })
            if (removeProductResult.deletedCount == 0) throw createError.InternalServerError('خطای سروری')


            return res.status(200).json({
                status: 200,
                data: {
                    message: 'با موفقیت حذف شد'
                }
            })


        } catch (error) {
            next(error)
        }

    }
    async getAllProduct(req, res, next) {
        try {
            const search = req?.query?.search || '';

            let product;
            if (search) {
                product = await ProductsModel.find({
                    $text: {
                        $search: new RegExp(search)
                    }
                })

            } else {
                product = await ProductsModel.find({})
            }
            return res.status(200).json({
                status: 200,
                data: {
                    product
                }

            })

        } catch (error) {
            next(error)
        }

    }
    async getoneProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = await this.getProductById(id);
            return res.status(200).json({
                status: 200,
                data: {
                    product
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async getProductById(productID) {
        const { id } = await objectIDValidator.validateAsync({ id: productID })
        const product = await ProductsModel.findById(id)
        if (!product) throw createError.NotFound('محصول یافت نشد')
        return product
    }


}

module.exports = new ProductController()