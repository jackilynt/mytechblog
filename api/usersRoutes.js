// api/routes/usersRoutes.js

const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser } = require('../controllers/authController');

// User signup route
router.post('/signup', createUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.get('/logout', logoutUser);

module.exports = router;
