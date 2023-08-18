const { Schema, model, Types } = require('mongoose');
const { CommentsSchema } = require('./public.schema');
const Episodes = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true }

})
const ChapterSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, default: '' },
    type: { type: String, default: 'free' },
    time: { type: String, required: true },
    episode: { type: [Episodes], default: [] }

})

const CourseSchema = new Schema({
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: [Types.ObjectId], ref: "category", required: true },
    comments: { type: [CommentsSchema], default: [] },
    like: { type: [Types.ObjectId], default: [] },
    deslike: { type: [Types.ObjectId], default: [] },
    bookmark: { type: [Types.ObjectId], default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, default: "free", required: true },
    status: { type: String, default: "notstarted" },
    time: { type: String, default: "00:00:00" },
    teacher: { type: Types.ObjectId, ref: 'user', required: true },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [Types.ObjectId], default: [], ref: 'user' }


})
CourseSchema.index({ title: 'text', short_text: 'text', text: 'text' })


module.exports = {
    Courses: model('course', CourseSchema)
}