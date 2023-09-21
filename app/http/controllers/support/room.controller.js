const { ConverSationModel } = require("../../../model/conversation");
const { createError } = require("../../../utils/constant");
const { Controller } = require("../controller");
const path = require('path');

class RoomController extends Controller {
    async addRoom(req, res, next) {
        try {
            const { name, description, filename, fileuploadpath, namespace } = req.body;
            await this.findNameSpacewithEndPoint(namespace)
            await this.findRoomwithEndPoint(name)
            const image = path.join(fileuploadpath, filename).replace(/\\/g, '/')
            const room = { name, description, image }
            const conversation = await ConverSationModel.updateOne({ endpoint: namespace }, {
                $push: {
                    rooms: room
                }
            })
            return res.status(201).json({
                statusCode: 201,
                data: {
                    message: 'اتاق با موفقیت ایجاد شد'
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfRooms(req, res, next) {
        try {

            const conversation = await ConverSationModel.find({}, { rooms: 1 })
            return res.status(200).json({
                statusCode: 200,
                data: {
                    conversation: conversation.rooms
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findRoomwithEndPoint(name) {
        const conversation = await ConverSationModel.findOne({ 'rooms.name': name });
        if (conversation) throw createError.BadRequest('این اسم قبلا انتخاب شده است')

    }
    async findNameSpacewithEndPoint(endpoint) {
        const conversation = await ConverSationModel.findOne({ endpoint });
        if (!conversation) throw createError.NotFound('فضای مکالمه ای یافت نشد')
        return conversation
    }

}

module.exports = {
    RoomController: new RoomController()
}