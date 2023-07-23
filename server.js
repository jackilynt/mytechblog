// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const {User, BlogPost, Comment} = require("./models")

// // TODO UNCOMMENT // const routes = require('./controllers');
// const sequelize = require('./config/connection');
// //const helpers = require('./utils/helpers');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// const hbs = exphbs.create({});

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // TODO UNCOMMENT // app.use(routes);
// app.get("/test/seeds", async (req,res)=>{
//     const usersData = await User.findAll({
//         raw: true,
//         nest: true
//     });
//     //const usersPlain = usersData.get({plain:true})
//     console.log({users:usersData})

// /*
//     Reference:
//     SELECT * from blogpost
//     INNER JOIN user
//     ON user.id = blogpost.user_id
//     INNER join comment
//     ON user.id = blogpost.user_id and blogpost.id = comment.blog_id; */

//     // TODO Add to home blogs route getting all a specific user's blogs
//     // Skip the "where" so you dont limit what posts show up. Showing all posts
//     // const postsData = await BlogPost.findAll({
//     //    include: [


//     // TODO Add to dashboard (personal blogs) route getting all a specific user's blogs
//     const postsData = await BlogPost.findAll({
//         where: {
//             user_id: 1
//         },
//         include: [
//             {
//                 model: User
//             },
//             {
//                 model: Comment
//             }
//         ],
//         raw: true,
//         nest: true
//     })

//     console.log(postsData)

//     res.render("test-seeds", { users:usersData, joinedPosts:postsData})
// })

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });




const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User, BlogPost, Comment } = require("./models");

const routes = require('./routes'); // UNCOMMENTED
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); // UNCOMMENTED

app.get("/test/seeds", async (req,res)=>{
    const usersData = await User.findAll({
        raw: true,
        nest: true
    });

    console.log({users:usersData})

    const postsData = await BlogPost.findAll({
        include: [
            {
                model: User
            },
            {
                model: Comment,
                include: User  // to get the user related to the comment
            }
        ],
        raw: true,
        nest: true
    })

    console.log(postsData)

    res.render("test-seeds", { users:usersData, joinedPosts:postsData })
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
