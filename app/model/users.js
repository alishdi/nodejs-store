const { Schema, model } = require('mongoose');
const { Types } = require('mongoose');

const userschema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    mobile: { type: String, required: true, unique: true },
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
    rolles: { type: [String], default: ['USER'] },
    courses: { type: [Types.ObjectId], ref: 'course', default: [] }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)



userschema.index({ mobile: "text" })

module.exports = {
    UserModel: model('user', userschema)
}