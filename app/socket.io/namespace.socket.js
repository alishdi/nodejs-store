const { ConverSationModel } = require("../model/conversation");
const { invoiceNumberGenerator } = require("../utils/func");
const path = require('path');
const fs = require('fs');

function namesapceSocketHandler(io) {
    io.on('connection', async socket => {
        console.log(socket.rooms);
        const namespaces = await ConverSationModel.find({}, { title: 1, endpoint: 1 }).sort({ _id: -1 })
        socket.emit('namespacesList', namespaces)
    })
}
async function createNameSpacesConnection(io) {
    const namespaces = await ConverSationModel.find({}, { title: 1, endpoint: 1, rooms: 1 }).sort({ _id: -1 })

    for (const namespace of namespaces) {
        io.of(`/${namespace.endpoint}`).on('connection', socket => {

            socket.emit('roomlist', namespace.rooms)
            socket.on('joinRoom', async roomName => {
                const lastRoom = Array.from(socket.rooms)[1]
                if (lastRoom) {
                    socket.leave(lastRoom)
                    await getCountOfOnline(io, namespace.endpoint, roomName)
                }
                socket.join(roomName);
                await getCountOfOnline(io, namespace.endpoint, roomName)
                const roomInfo = namespace.rooms.find(item => item.name == roomName);
                socket.emit('roomInfo', roomInfo)
                getNewMessage(socket, io)
                getNewLocation(socket, io)
                uploadFiles(socket)
                socket.on('disconnect', async () => {
                    await getCountOfOnline(io, namespace.endpoint, roomName)
                })

            })

        })
    }
}
async function getCountOfOnline(io, endpoint, roomName) {
    const onlineUser = await io.of(`/${endpoint}`).in(roomName).allSockets();
    io.of(`/${endpoint}`).in(roomName).emit('CountOfOnlineUsers', Array.from(onlineUser).length)

}
function getNewMessage(socket, io) {
    socket.on('newMessage', async data => {

        const { message, roomName, endpoint, sender } = data;


        await ConverSationModel.updateOne({ endpoint, "rooms.name": roomName }, {
            $push: {
                "rooms.$.messages": {
                    sender,
                    message,
                    dateTime: invoiceNumberGenerator()
                }
            }
        })
        io.of(`/${endpoint}`).in(roomName).emit('confirmMessage', data)

    })
}
function getNewLocation(socket, io) {
    socket.on('newLocation', async data => {

        const { location, roomName, endpoint, sender } = data;


        await ConverSationModel.updateOne({ endpoint, "rooms.name": roomName }, {
            $push: {
                "rooms.$.locations": {
                    sender,
                    location,
                    dateTime: invoiceNumberGenerator()
                }
            }
        })
        io.of(`/${endpoint}`).in(roomName).emit('confirmLocation', data)

    })
}
function uploadFiles(socket) {
    const path = require('path');
    const fs = require('fs');

    socket.on("upload", ({ file, filename }, callback) => {
        const ext = path.extname(filename)  
        fs.writeFile("public/uploads/sockets/" + String(Date.now() + ext), file, (err) => {
            console.log(err);
            callback({ message: err ? "failure" : "success" });
        });
    });
}
module.exports = {
    namesapceSocketHandler,
    createNameSpacesConnection
}