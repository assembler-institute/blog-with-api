import { updatePosts } from "./main.js";

const fetchPosts = async () => {
  return await fetch("http://localhost:3000/posts?limit=10")
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => console.error(e));
};

const fetchUser = async (userId) => {
  return await fetch(`http://localhost:3000/users?id=${userId}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => console.error(e));
};

const fetchComments = async (postId) => {
  return await fetch(`http://localhost:3000/comments?postId=${postId}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((e) => console.error(e));
};
const modifyPost = async (postId, postTitle, postBody) => {
  return await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: postTitle, body: postBody }),
  })
    .then((response) =>
      response.json().then((data) => {
        updatePosts();
      })
    )
    .catch((e) => console.error(e));
};

const deletePost = async (postId) => {
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) =>
      response.json().then((data) => {
        updatePosts();
      })
    )
    .catch((e) => console.error(e));
};

export { fetchPosts, fetchUser, fetchComments, modifyPost, deletePost };
