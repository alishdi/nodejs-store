const { Schema, Types } = require('mongoose');

const CommentsSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'users', required: true },
    comments: { type: String, required: true },
    createAt: { type: Date, default: new Date().getTime() },
    parent: { type: Types.ObjectId, ref: 'comment' }
})



module.exports = {
    CommentsSchema
}