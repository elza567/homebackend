const User = require('../models/User');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = userController;