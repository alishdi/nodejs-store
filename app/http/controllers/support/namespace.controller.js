const { ConverSationModel } = require("../../../model/conversation");
const { createError } = require("../../../utils/constant");
const { Controller } = require("../controller");

class NamespaceController extends Controller {
    async addNamespace(req, res, next) {
        try {
            const { title, endpoint } = req.body;
            await this.findNameSpacewithEndPoint(endpoint)
            const conversation = await ConverSationModel.create({ title, endpoint })
            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'فضای مکالم با موفقیت ایجاد شد'
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfNamespaces(req, res, next) {
        try {

            const nmespaces = await ConverSationModel.find({}, { rooms: 0 })
            return res.status(200).json({
                statusCode: 200,
                data: {
                    nmespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findNameSpacewithEndPoint(endpoint) {
        const conversation = await ConverSationModel.findOne({ endpoint });
        if (conversation) throw createError.BadRequest('این اسم قبلا انتخاب شده است')

    }

}

module.exports = {
    NamespaceController: new NamespaceController()
}