const { Schema, model, Types } = require('mongoose');

const Schema = new Schema({
    author: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, required: true },
    comments: { type: [], default: [] },
    like: { type: [Types.ObjectId], default: [] },
    deslike: { type: [Types.ObjectId], default: [] },
    bookmark: { type: [Types.ObjectId], default: [] },
})


module.exports = {
    BlogModel: model('blog', Schema)
}