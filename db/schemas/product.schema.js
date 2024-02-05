const { Schema } = require('mongoose');

const productSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    imageId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = productSchema;