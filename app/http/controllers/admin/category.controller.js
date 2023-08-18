const { CategoryModel } = require("../../../model/categories");
const { createError } = require("../../../utils/constant");
const { addCategorySchema, updateCategorySchema } = require("../../validator/category/category.schema");
const mongoose = require('mongoose');



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
                status: 201,
                data: {
                    message: 'دسته بندی با موفقیت اضافه شد'
                }
            })

        } catch (error) {

            next(error)
        }

    }
    async editCategory(req, res, next) {
        try {
            console.log(req.body);
            const { id } = req.params;
           
            const { title } = req.body;
            await updateCategorySchema.validateAsync(req.body)

            const resultOfUpdate = await CategoryModel.findByIdAndUpdate({ _id: id }, { $set: { title } })
            console.log(resultOfUpdate);
            if (resultOfUpdate.mo) throw createError.InternalServerError('خطای سرورو')
            return res.status(200).json({
        status: 200,
                data: {
                    message: 'به روزرسانی با موفقیت انجام شد',
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async removeCategory(req, res, next) {
        try {
            const { id } = req.params
            const category = await this.checkExistCategory(id)
            const delteResult = await CategoryModel.deleteMany({
                $or: [
                    { _id: category._id },
                    { parent: category._id }
                ]
            })
            if (delteResult.deletedCount == 0) createError.InternalServerError('حذف دسته بندی انجام نشد')
            return res.status(202).json({
        status: 200,
                data: {
                    message: 'حذف دسته بندی با موفقیت انجام شد',
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

            // const categories = await CategoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: 'categories',
            //             startWith: '$_id',
            //             connectFromField: '_id',
            //             connectToField: 'parent',
            //             maxDepth: 5,
            //             depthField: 'depth',
            //             as: 'children'
            //         }
            //     }, {
            //         $project: {
            //             __v: 0,
            //             "children.__v": 0,

            //         }
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ])
            const categories = await CategoryModel.find({ parent: undefined }, { __v: 0 })

            return res.status(200).json({
                status:200,
                data: {
                    categories
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async getCategoryById(req, res, next) {
        try {
            const { id: _id } = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(_id) }

                },
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
                        "children.__v": 0
                    }
                }
            ])
            return res.status(200).json({
                status: 200,
                data: {
                    category
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({ parent: undefined })
            return res.json({
                status: 200,
                data: {
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

            const child = await CategoryModel.find({ parent })

            if (!child) throw createError.NotFound('پیدا نشد')
            return res.status(200).json({
        status: 200,
                data: {
                    success: true,
                    child
                }
            })

        } catch (error) {
            next(error)
        }

    }
    async getAllCategoryWihoutPopulate(req, res, next) {
        try {
            const categories = await CategoryModel.aggregate([
                { $match: {} }
            ])
            return res.status(200).json({
                status:200,
                data: {
                    categories
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