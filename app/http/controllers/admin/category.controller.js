const { CategoryModel } = require("../../../model/categories");
const { createError } = require("../../../utils/constant");
const { addCategorySchema } = require("../../validator/category/category.schema");



class CategoryController {
    constructor() {
        this.removeCategory = this.removeCategory.bind(this)
    }


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
    async removeCategory(req, res, next) {
        try {
            const { id } = req.params
            const category = await this.checkExistCategory(id)
            const delteResult = await CategoryModel.deleteOne({ _id: category._id })
            if (delteResult.deletedCount == 0) createError.InternalServerError('حذف دسته بندی انجام نشد')
            return res.status(202).json({
                data: {
                    message: 'حذف دسته بندی با موفقیت انجام شد',
                    status: 200
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id)
        if (!category) throw createError.NotFound('دسته بندی یافت نشد')
        return category
    }
    async getAllCategory(req, res, next) {
        try {
            const category = await CategoryModel.aggregate([
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: 'parent',
                        as: 'children'
                    }
                }, {
                    $project: {
                        __v: 0,
                        "children.__v": 0,
                        "children.parent": 0
                    }
                },
                {
                    $match: {
                        parent: undefined
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    category
                }
            })

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
    async getChildOfParent(req, res, next) {
        try {
            const { parent } = req.params;
            console.log(parent);
            const child = await CategoryModel.find({ parent })
            console.log(child);
            if (!child) throw createError.NotFound('پیدا نشد')
            return res.status(200).json({
                data: {
                    status: 200,
                    success: true,
                    child
                }
            })

        } catch (error) {
            next(error)
        }

    }

}

module.exports = {
    CategoryController: new CategoryController()
}