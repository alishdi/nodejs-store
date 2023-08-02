const { CategoryModel } = require("../../../model/categories");
const { createError } = require("../../../utils/constant");
const { addCategorySchema } = require("../../validator/category/category.schema");
const { Controller } = require("../controller");


class CategoryController extends Controller {

    async addCategory(req, res, next) {
        try {
            console.log(req.body);
            await addCategorySchema.validateAsync(req.body)
            const { title, parent } = req.body;
            const cattegory = await CategoryModel.create({ title, parent })
            if (!cattegory) throw createError.InternalServerError('خطای داخلی')
            return res.status(201).json({
                data: {
                    status: 201,
                    message: 'دسته بندی با موفقیت اضافه شد'
                }
            })

        } catch (error) {

            next(error)
        }

    }
    editCategory(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    removeCategory(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    getAllCategory(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    getCategoryById(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({ parent: undefined })
            return res.json({
                data: {
                    status: 200,
                    parents
                }
            })

        } catch (error) {
            next(error)
        }

    }
    getChildOfParent(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }

    }

}

module.exports = {
    CategoryController: new CategoryController()
}