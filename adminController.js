const User = require('../models/User');
const Book = require('../models/Book');
const Rental = require('../models/Rental');

const adminController = {
    getStats: async (req, res) => {
        try {
            const [users, books, rentals] = await Promise.all([
                User.countDocuments(),
                Book.countDocuments(),
                Rental.countDocuments()
            ]);
            
            res.json({ users, books, rentals });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = adminController;