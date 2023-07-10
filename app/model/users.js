const { Schema, model } = require('mongoose');

const Schema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, lowercase: true, unique: true },
    phone: { type: String },
    email: { type: String ,lowercase: true },
    password: { type: String },
    otp: {
        type: Object, default: {
            code: '',
            expires: new Date().getDate() + 120
        }
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    rolles: { type: [String], default: ['USER'] }
})


module.exports = {
    UserModel: model('user', Schema)
}