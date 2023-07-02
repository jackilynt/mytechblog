const User = require('./User');
const BlogPost = require('./BlogPost');

// Recipe.hasMany(User, {
//   foreignKey: 'recipe_id',
// });

// User.belongsTo(Recipe, {
//   foreignKey: 'recipe_id',
// });

module.exports = { User, BlogPost };
