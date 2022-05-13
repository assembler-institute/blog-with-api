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
const modifyPost = (postId, postTitle, postBody) => {
  fetch(`http://localhost:3000/posts/${postId}`, {
  
  method: "PATCH",
  
  headers: {
  
  "Content-Type": "application/json",
  
  },
  
  body: JSON.stringify({title:postTitle, body:postBody}),
  
  }).then((response) =>
  response.json().then((data) => {
  console.log(data);
  })
  );};
export { fetchPosts, fetchUser, fetchComments, modifyPost};
