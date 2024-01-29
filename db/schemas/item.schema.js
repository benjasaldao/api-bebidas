const { Schema } = require("mongoose");

const itemSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = itemSchema;