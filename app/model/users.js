const { Schema, model } = require('mongoose');

const schema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String},
    mobile: {
        type: String, required: true, unique: true
       
    },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
        type: Object, default: {
            code: 0,
            expireIn: 0
        }
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    rolles: { type: [String], default: ['USER'] }
})


module.exports = {
    UserModel: model('user', schema)
}