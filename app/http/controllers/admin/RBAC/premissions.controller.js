const createHttpError = require("http-errors");
const { PremissionModel } = require("../../../../model/premission");
const { addPremisionSchema } = require("../../../validator/RBAC.schema");
const { Controller } = require("../../controller");
const { default: mongoose } = require("mongoose");
const { copyObjet } = require("../../../../utils/func");

class Premissionscontroller extends Controller {
    async getAllPermissions(req, res, next) {

        try {
            const permissions = await PremissionModel.find({})
            return res.status(200).json({
                status: 200,
                data: {
                    permissions
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async createNewPermissions(req, res, next) {
        try {
            const { title, description } = await addPremisionSchema.validateAsync(req.body)
            console.log(title, description);
            await this.findPremissionByName(title)
            const permission = await PremissionModel.create({ title, description })
            if (!permission) throw createError.InternalServerError('سطح ایجاد نشد')
            return res.status(201).json({
                status: 201,
                data: {
                    message: 'سطح با موفقیت ایجاد شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }

    async removePremission(req, res, next) {
        try {
            const { field } = req.params;
            const premission = await this.findPremissionByIDOrTitle(field)
            const removePremissionResult = await PremissionModel.deleteOne({ _id: premission._id })
            if (!removePremissionResult.deletedCount) throw createError.InternalServerError('حذف سطح انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'حذف سطح با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updatePremissionByID(req, res, next) {
        try {
            const { id } = req.params;
            const premission = await this.findPremissionByIDOrTitle(id)
            const data = copyObjet(req.body)
            let nullishData = ["", " ", "0", null, undefined]
            let blackListFields = []
            Object.keys(data).forEach(key => {
                if (blackListFields.includes(key)) delete data[key]
                if (typeof data[key] == 'string') data[key] = data[key].trim();
                if (Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if (Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if (nullishData.includes(data[key])) delete data[key]

            })
            
            const updatePremissionResult = await PremissionModel.updateOne({ _id: premission._id }, {
                $set: data
            })
            if (!updatePremissionResult.modifiedCount) throw createError.InternalServerError('آپدیت سطح انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'آپدیت سطح با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async findPremissionByIDOrTitle(field) {
        let findQuery;
        if (mongoose.isValidObjectId(field)) {
            findQuery = { _id: field }
        } else {
            findQuery = { title: field }
        }
        if (!findQuery) throw createError.BadRequest('پارامتر ارسال نشد')
        const premission = await PremissionModel.findOne(findQuery)
        if (!premission) throw createError.NotFound('سطح مورد نظر یافت نشد')
        return premission


    }

    async findPremissionByName(title) {
        const permission = await PremissionModel.findOne({ title })
        if (permission) throw createHttpError.BadRequest('سطح قبلا ثبت شده است')
    }
}

module.exports = {
    Premissionscontroller: new Premissionscontroller()
}