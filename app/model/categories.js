const { Schema, model } = require('mongoose');

const Schema = new Schema({
    title: { type: String, required: true }

})


module.exports = {
    CategoryModel: model('category', Schema)
}