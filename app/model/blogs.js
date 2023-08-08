const { Schema, model, Types } = require('mongoose');


const CommentsSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users', required: true },
    comments: { type: String, required: true },
    createAt: { type: Date, default: new Date().getTime() },
    parent: { type: Types.ObjectId }
})

const BlogSchema = new Schema({
    author: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId,ref:'category', required: true },
    comments: { type: [CommentsSchema], default: [] },
    like: { type: [Types.ObjectId], ref: 'users', default: [] },
    deslike: { type: [Types.ObjectId], ref: 'users', default: [] },
    bookmark: { type: [Types.ObjectId], ref: 'users', default: [] },
}, { timestamps: true, versionKey: false })


module.exports = {
    BlogModel: model('blog', BlogSchema)
}