const { Router } = require('express');
const { RoomController } = require('../../http/controllers/support/room.controller');
const { uploadFile } = require('../../utils/multer');

const roomRouter = Router();

roomRouter.post('/add',uploadFile.single('image') ,RoomController.addRoom)
roomRouter.post('/get', RoomController.getListOfRooms)
// roomRouter.use('room',ro)

module.exports = {
    roomRouter
}