const { Schema, model, Types } = require('mongoose');

const Paymentschema = new Schema({
    invoiceNumber: { type: String },
    verify: { type: Boolean, default: false },
    authority: { type: String },
    amount: { type: Number },
    description: { type: String, default: 'بابت خرید دوره' },
    user: { type: Types.ObjectId, ref: 'user' },
    basket: { type: Object, default: {} },
    refID: { type: String, default: undefined },
    cardHash: { type: String, default: undefined }

},
    {
        timestamps: true
    }

)


module.exports = {
    PaymentModel: model('payment', Paymentschema)
}