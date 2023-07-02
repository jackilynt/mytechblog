// api/routes/blogPostsRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');

// Get all blog posts
router.get('/blogposts', getAllBlogPosts);

// Get a specific blog post by ID
router.get('/blogposts/:id', getBlogPostById);

// Create a new blog post
router.post('/blogposts', createBlogPost);

// Update a blog post
router.put('/blogposts/:id', updateBlogPost);

// Delete a blog post
router.delete('/blogposts/:id', deleteBlogPost);

module.exports = router;
