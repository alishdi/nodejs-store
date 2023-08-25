const { Schema, Types, model } = require('mongoose');

const PremissionSchema = new Schema({
    title: { type: String, unique: true },
    description: { type: String, default: '' }
}, {
    toJSON: {
        virtuals: true
    }
})

const PremissionModel = model('premission', PremissionSchema)


module.exports = {
    PremissionModel
}