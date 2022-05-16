"use strict";

// DOM elements
const mainContainer = document.getElementById("mainContainer");
// const postMain = document.getElementById("postMain");

const postModal = document.getElementById("postModal");

const fetchPosts = fetch("http://localhost:3000/posts");
fetchPosts
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    // console.log(data);
    data.map((post) => {
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
        console.log(e.target.dataset.post);
        // console.log(e.target.id, e.target.postNumId);
        // console.log(e.target.id, e.target.data - post);

        modalPosts.show();

        fetchUsers(e.target.id, e.target.dataset.post);
      });
    });
  });

// ------------------------------
// ------------------------------
// * FUNCTIONS

async function fetchUsers(userId, postId) {
  const userPromise = await fetch(`http://localhost:3000/users/${userId}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      createPost(data, postId);
    });
}

// ----------------

const userModal = document.getElementById("userModal");

function createPost(obj, postId) {
  console.log(obj);
  // console.log(userId);

  const postTitle = document.createElement("p");
  postTitle.style.fontWeight = "bold";
  const postBody = document.createElement("p");
  // console.log(postId);
  // console.log(obj, userId);

  const fetchPosts = fetch(`http://localhost:3000/posts/${postId}`);
  fetchPosts
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
      postTitle.textContent = data.title;
      postBody.textContent = data.body;
      postModal.append(postTitle);
      postModal.append(postBody);
    });

  //
  //
  const userName = document.createElement("p");
  const userEmail = document.createElement("p");
  userName.textContent = obj.username;
  userEmail.textContent = obj.email;
  userModal.append(userName);
  userModal.append(userEmail);

  const userId = obj.id;
  // console.log(userId);

  // * MODAL POSTS WITH COMMENTS
  const commentsBtn = document.getElementById("commentsBtn");
  const commentsContainer = document.getElementById("commentsContainer");

  commentsBtn.addEventListener("click", function () {
    createComments(userId);
  });
}

function createComments(userId) {
  // console.log("Working");
  const fetchComments = fetch(
    `http://localhost:3000/comments/?postId=${userId}`
  );
  fetchComments
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);

      const commentsTitle = document.getElementById("commentsTitle");
      const showComments = document.getElementById("showComments");
      console.log(commentsTitle);
      console.log(showComments);

      data.map((comment) => {
        // console.log(comment);

        const commentName = document.createElement("p");
        const commentBody = document.createElement("p");
        const userEmail = document.createElement("p");
        commentName.style.fontSize = "1rem";
        commentBody.style.fontSize = "1rem";
        userEmail.style.fontSize = "1rem";

        // console.log(comment.name);
        commentName.textContent = comment.name;
        commentBody.textContent = comment.body;
        userEmail.textContent = comment.email;

        commentsContainer.append(commentName);
        commentsContainer.append(commentBody);
        commentsContainer.append(userEmail);

        commentsBtn.style.display = "none";
      });
    });
}
