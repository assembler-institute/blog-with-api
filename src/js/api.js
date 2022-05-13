import { updatePosts } from "./main.js";

const fetchPosts = async () => {
  const response = await fetch("http://localhost:3000/posts?limit=10");
  const data = await response.json();
  return data;
};

const fetchUser = async (userId) => {
  return await fetch(`http://localhost:3000/users?id=${userId}`)
    .then((response) => response.json())
    .then((data) => data);
};

const fetchComments = async (postId) => {
  return await fetch(`http://localhost:3000/comments?postId=${postId}`)
    .then((response) => response.json())
    .then((data) => data);
};
const modifyPost = async (postId, postTitle, postBody) => {
  return await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: postTitle, body: postBody }),
  }).then((response) =>
    response.json().then((data) => {
      updatePosts();
    })
  );
};

const deletePost = async (postId) => {
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) =>
    response.json().then((data) => {
      updatePosts();
    })
  );
};

export { fetchPosts, fetchUser, fetchComments, modifyPost, deletePost };
