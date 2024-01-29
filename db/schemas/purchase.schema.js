const { Schema } = require('mongoose');
const itemSchema = require("./item.schema");

const purchaseSchema = new Schema({
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
    items: [itemSchema],
});



module.exports = purchaseSchema;