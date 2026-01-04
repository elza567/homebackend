const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user WITHOUT pre-save hook
        const user = new User({ 
            name, 
            email, 
            password, // Store plain password for now
            role: 'user' 
        });
        
        await user.save();

        // Create token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Register error details:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        });
    }
},

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: { id: user._id, name: user.name, email: user.email }
            });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

module.exports = authController;