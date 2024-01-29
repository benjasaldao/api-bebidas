const { Schema } = require('mongoose');
const itemSchema = require("./item.schema");

const saleSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    items: [itemSchema],
});



module.exports = saleSchema;