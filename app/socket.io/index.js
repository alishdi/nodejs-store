const { NameSpaceSocketHandler, namesapceSocketHandler, createNameSpacesConnection } = require("./namespace.socket")


module.exports = {
    socketHandler: (io) => {
        namesapceSocketHandler(io)
        createNameSpacesConnection(io)
    }
}