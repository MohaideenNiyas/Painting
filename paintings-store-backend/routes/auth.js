const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth, admin } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin routes
router.get('/count', auth, admin, authController.getUsersCount);
router.get('/', auth, admin, authController.getAllUsers);

module.exports = router;
