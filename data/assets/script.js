const post_url = "https://jsonplaceholder.typicode.com/posts";
const users_url = "https://jsonplaceholder.typicode.com/users";
const comments_url = "https://jsonplaceholder.typicode.com/comments/";

fetch(post_url)
  .then((res) => res.json())
  .then((data) => console.log(data));

fetch(users_url)
  .then((res) => res.json())
  .then((data) => console.log(data));

fetch(comments_url)
  .then((res) => res.json())
  .then((data) => console.log(data));
