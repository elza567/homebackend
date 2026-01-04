const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowedDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    returned: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Rental', rentalSchema);