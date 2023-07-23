// api/routes/usersRoutes.js

const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');

// User signup route
router.post('/signup', signup);

// User login route
router.post('/login', login);

// User logout route
router.get('/logout', logout);

module.exports = router;
