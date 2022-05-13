"use strict";

// DOM elements
const mainContainer = document.getElementById("mainContainer");
const postMain = document.getElementById("postMain");

const postModal = document.getElementById("postModal");

// console.log(postMain);

// -----------------
// Global Arrays from fecth
let postsArray = [];
let usersArray = [];

const fetchPosts = fetch("http://localhost:3000/posts");
fetchPosts
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    // console.log(data);
    data.map((post) => {
      //   console.log(post);
      postsArray.push(post);
      const title = post.title;
      const body = post.body;
      //   console.log(title);
      //   console.log(body);

      const postTitle = document.createElement("h2");
      postTitle.setAttribute("id", `${post.id}`);
      const postBody = document.createElement("p");

      postTitle.textContent = title;
      postBody.textContent = body;

      postMain.append(postTitle);
      postMain.append(postBody);
      mainContainer.append(postMain);
    });
  });

// ---------------------
// ---------------------
//   MODAL POSTS

const modalPosts = document.getElementById("modalPosts");

postMain.addEventListener("click", function (e) {
  console.log(e.target.id);
  modalPosts.show();
  //   if (e.target.id) {
  //     console.log(e.target.id, `${usersArray[e.target.id]}`);
  //   }

  //
});

console.log(postsArray);
console.log(usersArray);

// ------------------------------
// ------------------------------
// Functions

function fetchUsers() {
  const fetchUsers = fetch("http://localhost:3000/users");
  fetchUsers
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(data);
      data.map((user) => {
        usersArray.push(user);
      });
    });
}
fetchUsers();

function comparePostUser() {
  //
  postsArray.map((post) => {
    usersArray.map((user) => {
      if (post.id === user.id) {
        console.log("asasa");
      }
    });
  });
}
