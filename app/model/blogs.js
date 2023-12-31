const { Schema, model, Types } = require('mongoose');
const { CommentsSchema } = require('./public.schema');




const BlogSchema = new Schema({
    author: { type: Types.ObjectId,ref:'user', required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    short_text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: 'category', required: true },
    comments: { type: [CommentsSchema], default: [] },
    like: { type: [Types.ObjectId], ref: 'user', default: [] },
    deslike: { type: [Types.ObjectId], ref: 'user', default: [] },
    bookmark: { type: [Types.ObjectId], ref: 'user', default: [] },
}, {
    timestamps: true, versionKey: false, toJSON: {
        virtuals: true
    }
})


BlogSchema.virtual('imageURL').get(function () {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
})



module.exports = {
    BlogModel: model('blog', BlogSchema)
}