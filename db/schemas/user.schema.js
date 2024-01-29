const { Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    recoveryToken: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = userSchema;