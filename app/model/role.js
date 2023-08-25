const { Schema, Types, model } = require('mongoose');

const RoleSchema = new Schema({
    title: { type: String, unique: true },
    premissions: { type: [Types.ObjectId], ref: 'premissions', default: [] }
}, {
    toJSON: {
        virtuals: true
    }
})



module.exports = {
    RoleModel: model('role', RoleSchema)
}