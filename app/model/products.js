const { Schema, model, Types } = require('mongoose');

const Schema = new Schema({
    title: { type: String, required: true },
    short_desk: { type: String, required: true },
    total_desk: { type: String, required: true },
    images: { type: [String], required: true },
    tags: { type: [String], default:[] },
    category: { type: [Types.ObjectId], required: true },
    comments: { type: String, default:[] },
    like: { type: [Types.ObjectId], default:[] },
    deslike: { type: [Types.ObjectId], default:[] },
    bookmark: { type: [Types.ObjectId], default:[] },
    price: { type: Number, default: 0 },
    descount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, required: true },
    time: { type: String, },
    format: { type: String, },
    teacher: { type: String, required: true },
    detail: {
        type: Object, default: {
            length: '',
            height: 'Number',
            width: '',
            weight: '',
            colors: [],
            model: [],
            madein: ''
        }
    },
})


module.exports = {
    ProductsModel: model('product', Schema)
}