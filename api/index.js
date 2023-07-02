// api/index.js

const express = require('express');
const router = express.Router();

const usersRoutes = require('./usersRoutes');
const blogPostsRoutes = require('./blogPostsRoutes');
const commentsRoutes = require('./commentsRoutes');

// Mount the routes
router.use('/users', usersRoutes);
router.use('/blogposts', blogPostsRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;
