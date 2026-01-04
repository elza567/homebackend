const Rental = require('../models/Rental');

const rentalController = {
    getAllRentals: async (req, res) => {
        try {
            const rentals = await Rental.find()
                .populate('book', 'title author')
                .populate('user', 'name email');
            res.json(rentals);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = rentalController;