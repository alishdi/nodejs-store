const { PremissionModel } = require("../../model/premission")
const { RoleModel } = require("../../model/role");
const { createError, PERMISSIONS } = require("../../utils/constant");

function checkPermission(requiredPermissions = []) {
    return async function (req, res, next) {
        try {
            const allPermissions = requiredPermissions.flat(2)
            const user = req.user;
           
            const role = await RoleModel.findOne({title: user.role})
            const permissions = await PremissionModel.find({_id: {$in : role.premissions}})
            const userPermissions = permissions.map(item => item.title)
            
            const hasPermission = allPermissions.every(permission => {
                
                return userPermissions.includes(permission)
            })
            
            
            if(userPermissions.includes(PERMISSIONS.ALL)) return next()
            if (allPermissions.length == 0 || hasPermission) return next();
            throw createError.Forbidden("شما به این قسمت دسترسی ندارید");
          } catch (error) {
            next(error);
          }
        };
    }




module.exports = {
    checkPermission
}