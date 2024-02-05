const { Schema } = require("mongoose");
const productSchema = require("./product.schema");

const itemSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    product: productSchema,
    createAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = itemSchema;