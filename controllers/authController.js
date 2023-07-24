// // controllers/authController.js

// const { User } = require('../models');

// const authController = {
//   signup: async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await User.create({ username, password });
//       req.session.save(() => {
//         req.session.user_id = user.id;
//         req.session.username = user.username;
//         req.session.loggedIn = true;
//         res.status(200).json(user);
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   login: async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const user = await User.findOne({ where: { username } });

//       if (!user) {
//         res.status(400).json({ message: 'Incorrect username or password!' });
//         return;
//       }

//       const validPassword = user.checkPassword(password);

//       if (!validPassword) {
//         res.status(400).json({ message: 'Incorrect username or password!' });
//         return;
//       }

//       req.session.save(() => {
//         req.session.user_id = user.id;
//         req.session.username = user.username;
//         req.session.loggedIn = true;
//         res.status(200).json({ user, message: 'You are now logged in!' });
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   logout: (req, res) => {
//     if (req.session.loggedIn) {
//       req.session.destroy(() => {
//         res.status(204).end();
//       });
//     } else {
//       res.status(404).end();
//     }
//   }
// };

// module.exports = authController;



// controller/authController.js

const { User } = require('../models');

const authController = {
  signup: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.logged_in = true;
        res.status(200).json(newUser);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    // try {
      const user = await User.findOne({ where: { username: req.body.username } });
      console.log("***** REACHED login ****")
      console.log({user})

      if (!user) {
        res.status(400).json({ message: 'Incorrect username or password, please try again' });
        return;
      }

      // const validPassword = user.checkPassword(req.body.password);

      // if (!validPassword) {
      //   res.status(400).json({ message: 'Incorrect username or password, please try again' });
      //   return;
      // }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.logged_in = true;
        res.status(200).json({ user, message: 'You are now logged in!' });
      });
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  },

  logout: (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  }
};

module.exports = authController;
