"use strict";

// DOM elements
const mainContainer = document.getElementById("mainContainer");
// const postMain = document.getElementById("postMain");

const postModal = document.getElementById("postModal");

// -----------------
// Global Arrays from fecth
// let usersArray = [];
// let usersArray = fetchUsers();

// fetchUsers();

// let postsArray = [];

// usersArray.forEach((user) => {
//   console.log(user);
// });

const fetchPosts = fetch("http://localhost:3000/posts");
fetchPosts
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    // console.log(data);
    data.map((post) => {
      //   console.log(post);
      // postsArray.push(post);
      const title = post.title;
      const body = post.body;
      const postUserId = post.userId; // Id of the user

      const postNumId = post.id; // Id of the post
      // console.log(postNumId);
      // console.log(postUserId);

      const articlePost = document.createElement("article");
      const postTitle = document.createElement("h2");
      const postBody = document.createElement("p");

      articlePost.setAttribute("id", `${postUserId}`);
      articlePost.setAttribute("data-post", `${postNumId}`);
      postTitle.setAttribute("id", `${postUserId}`);
      postTitle.setAttribute("data-post", `${postNumId}`);
      postBody.setAttribute("id", `${postUserId}`);
      postBody.setAttribute("data-post", `${postNumId}`);
      // console.log(postTitle);
      // console.log(articlePost);

      postTitle.textContent = title;
      postBody.textContent = body;

      articlePost.append(postTitle);
      articlePost.append(postBody);
      mainContainer.append(articlePost);

      // ---------------------
      // ---------------------
      //   * MODAL POSTS
      const modalPosts = document.getElementById("modalPosts");

      postTitle.addEventListener("click", function (e) {
        // console.log(e.target.data - post__user - id);
        // console.log(e);
        console.log(e.target.id);
        // console.log(e.target.data - post);
        // console.log(e.target.id, e.target.postNumId);
        // console.log(e.target.id, e.target.data - post);

        modalPosts.show();

        // let user = fetchUsers(e.target.id);
        fetchUsers(e.target.id);
        // console.log(user);
        // user.then((data) => console.log(data));

        //
      });
    });
  });

// ------------------------------
// ------------------------------
// Functions

async function fetchUsers(userId) {
  const userPromise = await fetch(`http://localhost:3000/users/${userId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // return data;
      createPost(data, userId);
    });
}

// ----------------

const userModal = document.getElementById("userModal");
function createPost(obj, userId) {
  // console.log(obj.email);
  // console.log(fetchPosts.then((data) => console.log(data)));
  // console.log(obj);
  // console.log(userId);

  const postBody = document.createElement("p");
  // postBody.textContent =
  // console.log(obj, userId);

  const userName = document.createElement("p");
  const userEmail = document.createElement("p");
  userName.textContent = obj.username;
  userEmail.textContent = obj.email;
  userModal.append(userName);
  userModal.append(userEmail);
}
