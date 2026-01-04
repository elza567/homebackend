const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============= MONGODB CONNECTION =============
console.log('🔗 Connecting to MongoDB...');

// FIXED: No options needed for Mongoose 7
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library_db')
.then(() => {
    console.log('✅ MongoDB connected successfully!');
})
.catch(err => {
    console.log('❌ MongoDB connection failed:', err.message);
    console.log('💡 Running in memory mode for now');
});

// ============= IMPORT ROUTES =============
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const rentalRoutes = require('./routes/rentals');
const adminRoutes = require('./routes/admin');

// ============= USE ROUTES =============
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/admin', adminRoutes);

// ============= BASIC ROUTES =============
app.get('/', (req, res) => {
    res.json({
        message: 'Library Management System API',
        status: 'running',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        server: 'running',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// ============= START SERVER =============
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});