const sequelizeConn = require('../config/connection');
const { BlogPost, User } = require("../models")
const userData = require("./userData.json");
const blogData = require("./blogData.json");

const seedAll = async () => {
  await sequelizeConn.sync({ force: true }); // reset tables
  console.log("Running seed")



  await User.bulkCreate(userData);

  await BlogPost.bulkCreate(blogData);


  // TODO: Will move into userData.js
//   const userData = [
//     {
//       username: "kj1",
//       email: "kj1@gmail.com",
//       password: "123",

//     }
//   ];
//   await User.bulkCreate(userData);


  process.exit(0);
};

seedAll();

