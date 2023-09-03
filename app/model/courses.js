const { Schema, model, Types } = require('mongoose');
const { CommentsSchema } = require('./public.schema');
const { getCourseTime } = require('../utils/func');
const Episodes = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: 'unlock' },
    time: { type: String, required: true },
    videoAddress: { type: String, required: true },

}, { toJSON: { virtuals: true } })


Episodes.virtual('videoURL').get(function () {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.videoAddress}`
})


const ChapterSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, default: '' },
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
    like: { type: [Types.ObjectId],ref:"user", default: [] },
    deslike: { type: [Types.ObjectId],ref:"user", default: [] },
    bookmark: { type: [Types.ObjectId],ref:"user", default: [] },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    count: { type: Number, },
    type: { type: String, default: "free", required: true },
    status: { type: String, default: "notstarted" },
    teacher: { type: Types.ObjectId, ref: 'user', required: true },
    chapters: { type: [ChapterSchema], default: [] },
    students: { type: [Types.ObjectId], default: [], ref: 'user' }


}, {
    toJSON: {
        virtuals: true
    }
})
CourseSchema.index({ title: 'text', short_text: 'text', text: 'text' })
CourseSchema.virtual('imageURL').get(function () {
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
})
CourseSchema.virtual('totlaTime').get(function () {
    return getCourseTime(this.chapters || [])
})



module.exports = {
    Courses: model('course', CourseSchema)
}