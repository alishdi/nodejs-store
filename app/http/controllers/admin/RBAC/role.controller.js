const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../model/role");
const { Controller } = require("../../controller");
const { addRBACSchema } = require("../../../validator/RBAC.schema");
const { createError } = require("../../../../utils/constant");
const { default: mongoose } = require("mongoose");
const { copyObjet } = require("../../../../utils/func");

class Rolecontroller extends Controller {
    async getAllRole(req, res, next) {

        try {
            const roles = await RoleModel.find({})
            return res.status(200).json({
                status: 200,
                data: {
                    roles
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async createNewRole(req, res, next) {
        try {
            const { title, premissions } = await addRBACSchema.validateAsync(req.body)
            console.log(title, premissions);
            await this.findRoleByName(title)
            const role = await RoleModel.create({ title, premissions })
            if (!role) throw createError.InternalServerError('نقش ایجاد نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'نقش با موفقیت ایجاد شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async removeRole(req, res, next) {
        try {
            const { field } = req.params;
            const role = await this.findRoleByIDOrTitle(field)
            const removeRoleResult = await RoleModel.deleteOne({ _id: role._id })
            if (!removeRoleResult.deletedCount) throw createError.InternalServerError('حذف نقش انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'حذف نقش با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateRoleByID(req, res, next) {
        try {
            const { id } = req.params;
            const role = await this.findRoleByIDOrTitle(id)
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
            
            const updateRoleResult = await RoleModel.updateOne({ _id: role._id }, {
                $set: data
            })
            if (!updateRoleResult.modifiedCount) throw createError.InternalServerError('آپدیت نقش انجام نشد')
            return res.status(200).json({
                status: 200,
                data: {
                    message: 'آپدیت نقش با موفقیت انجام شد'
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async findRoleByIDOrTitle(field) {
        let findQuery;
        if (mongoose.isValidObjectId(field)) {
            findQuery = { _id: field }
        } else {
            findQuery = { title: field }
        }
        if (!findQuery) throw createError.BadRequest('پارامتر ارسال نشد')
        const role = await RoleModel.findOne(findQuery)
        if (!role) throw createError.NotFound('نقش مورد نظر یافت نشد')
        return role


    }
    async findRoleByName(title) {
        const role = await RoleModel.findOne({ title })
        if (role) throw createHttpError.BadRequest('این نقش قبلا ثبت شده است')
    }

}

module.exports = {
    Rolecontroller: new Rolecontroller()
}