// controller/blogController.js

const { BlogPost, User } = require('../models');

const blogController = {
  getAllBlogPosts: async (req, res) => {
    try {
      const blogPosts = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      res.status(200).json(blogPosts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getBlogPostById: async (req, res) => {
    try {
      const blogPost = await BlogPost.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });

      if (!blogPost) {
        res.status(404).json({ message: 'No blog post found with this id' });
        return;
      }

      res.status(200).json(blogPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createBlogPost: async (req, res) => {
    try {
      const newBlogPost = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });

      res.status(201).json(newBlogPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateBlogPost: async (req, res) => {
    try {
      const updatedBlogPost = await BlogPost.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        }
      );

      if (updatedBlogPost[0] === 0) {
        res.status(404).json({ message: 'No blog post found with this id' });
        return;
      }

      res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteBlogPost: async (req, res) => {
    try {
      const deletedBlogPost = await BlogPost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!deletedBlogPost) {
        res.status(404).json({ message: 'No blog post found with this id' });
        return;
      }

      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = blogController;
