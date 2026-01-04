// models/User.js - SIMPLE VERSION (NO PRE-SAVE HOOK)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
}, { timestamps: true });

// NO pre-save hook at all
// NO bcrypt hashing for now

// Simple password comparison
userSchema.methods.comparePassword = async function(password) {
    return password === this.password; // Direct comparison
};

module.exports = mongoose.model('User', userSchema);