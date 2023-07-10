const { Schema, model } = require('mongoose');

const Schema = new Schema({
    title: { type: String },
    text: { type: String },
    image: { type: String, required: true },
    type: { type: String, default: 'base' },

})


module.exports = {
    SliderModel: model('slider', Schema)
}