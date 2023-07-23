// api/routes/commentsRoutes.js

const express = require('express');
const router = express.Router();
const { createComment, deleteComment } = require('../controllers/commentController');

// Create a new comment for a specific blog post
router.post('/blogposts/:postId/comments', createComment);

// // Update a comment
// router.put('/comments/:id', updateComment);

// Delete a comment
router.delete('/comments/:id', deleteComment);

module.exports = router;
