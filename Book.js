const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    quantity: { type: Number, default: 1 },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);