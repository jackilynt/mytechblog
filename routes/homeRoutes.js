
const router = require('express').Router();
const { Recipe, User } = require('../models');
// Import the custom middleware
//const withAuth = require('../utils/auth');

// GET all recipes for homepage
router.get('/', async (req, res) => {
  try {
    // const dbRecipeData = await Recipe.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['username', 'email', 'id'],
    //     },
    //   ],
    // });

    // const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
    res.render('home', { });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Recipe
// Use the custom middleware before allowing the user to access the Recipe
router.get('/recipe/:id', async (req, res) => {
  try {
    const dbRecipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: Recipe,
          attributes: [
            'id',
            'title',
            'ingredients',
            'instructions',
            'user_id',
          ],
        },
      ],
    });

    const recipe = dbRecipeData.get({ plain: true });
    res.render('recipe', { recipe, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {

  res.render('signup');
});

// GET About Us page
router.get('/about', (req, res) => {
  res.render('about');
});

// GET Contact Us page
router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;
