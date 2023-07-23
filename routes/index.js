const router = require('express').Router();

const userRoutes = require('./usersRoutes');
const commentRoutes = require('./commentsRoutes');
const blogRoutes = require('./blogsRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/blogs', blogRoutes);
router.use('/', homeRoutes);

module.exports = router;