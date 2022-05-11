const comments = require("./comments.json");
const posts = require("./posts.json");
const users = require("./users.json");

module.exports = () => ({
  users: users,
  posts: posts,
  comments: comments,
});
