// controller/commentController.js

const { Comment, User } = require('../models');

const commentController = {
  createComment: async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        blogpost_id: req.params.blogpost_id,
      });

      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      const deletedComment = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!deletedComment) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }

      res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = commentController;
