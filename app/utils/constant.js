const createError=require('http-errors');
module.exports = {
    ACCESS_TOKEN_SECRET_KEY: '38F3636F64F08BBC819585658A4E5D6C5D0458804DB452908E37DE3B2E913FB8',
    REFRESH_TOKEN: '10DB7CA5D1C9E378935FADFBC02E8DE8374E5B07E298173CD00FD6684C17DE7C',
    createError,
    mongoIdPattern: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

}