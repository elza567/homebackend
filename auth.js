const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validator = require('../middleware/validator');

router.post('/register', validator.validateUser, authController.register);
router.post('/login', authController.login);

module.exports = router;