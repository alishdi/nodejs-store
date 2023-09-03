const { Schema, model } = require('mongoose');
const { Types } = require('mongoose');
const ProductSchema = new Schema({
    productID: { type: Types.ObjectId, ref: 'product' },
    count: { type: Number, default: 1 }

})
const CourseSchema = new Schema({
    courseID: { type: Types.ObjectId, ref: 'course' },
    count: { type: Number, default: 1 }
})
const basketSchema = new Schema({
    courses: { type: [CourseSchema], default: [] },
    products: { type: [ProductSchema], default: [] },
})

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
    role: { type: String, default: 'USER' },
    courses: { type: [Types.ObjectId], ref: 'course', default: [] },
    products: { type: [Types.ObjectId], ref: 'product', default: [] },
    basket: { type: basketSchema}
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
)



userschema.index({ mobile: "text", username: "text", last_name: "text", first_name: 'text' })

module.exports = {
    UserModel: model('user', userschema)
}