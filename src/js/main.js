"use strict";

// DOM elements
const mainContainer = document.getElementById("mainContainer");
const postModal = document.getElementById("postModal");

const fetchPosts = fetch("http://localhost:3000/posts");
fetchPosts
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    data.map((post) => {
      const title = post.title;
      const body = post.body;
      const postUserId = post.userId; // Id of the user

      const postNumId = post.id; // Id of the post

      const articlePost = document.createElement("article");
      +articlePost.classList.add("postBox");
      const postTitle = document.createElement("h2");
      const postBody = document.createElement("p");

      articlePost.setAttribute("id", `${postUserId}`);
      articlePost.setAttribute("data-post", `${postNumId}`);
      postTitle.setAttribute("id", `${postUserId}`);
      postTitle.setAttribute("data-post", `${postNumId}`);
      postBody.setAttribute("id", `${postUserId}`);
      postBody.setAttribute("data-post", `${postNumId}`);

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
        modalPosts.show();
        mainContainer.style.display = "none";
        updateModal();
        fetchUsers(e.target.id, e.target.dataset.post);
      });
    });
  });

// Close modal post

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", function () {
  const commentsContainer = document.getElementById(`commentsContainer`);
  const commentsBtn = document.getElementById("commentsBtn");

  commentsContainer.textContent = "";
  commentsBtn.style.display = "block";
  modalPosts.close();
  mainContainer.style.display = "block";
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
      createPost(data, postId);
    });
}

// ----------------

const userModal = document.getElementById("userModal");

function createPost(obj, postId) {
  console.log(obj);
  const postTitle = document.createElement("h4");
  postTitle.style.fontWeight = "bold";
  const postBody = document.createElement("p");

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
  const userName = document.createElement("h4");
  const userEmail = document.createElement("p");
  userName.textContent = obj.username;
  userEmail.textContent = obj.email;
  userModal.append(userName);
  userModal.append(userEmail);

  const userId = obj.id;

  // * MODAL POSTS WITH COMMENTS
  const commentsBtn = document.getElementById("commentsBtn");
  const commentsContainer = document.getElementById("commentsContainer");

  commentsBtn.addEventListener("click", function () {
    createComments(userId);
  });
}

function createComments(userId) {
  const fetchComments = fetch(
    `http://localhost:3000/comments/?postId=${userId}`
  );
  fetchComments
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const commentsTitle = document.getElementById("commentsTitle");
      const showComments = document.getElementById("showComments");
      console.log(commentsTitle);
      console.log(showComments);

      data.map((comment) => {
        const commentName = document.createElement("h3");
        const commentBody = document.createElement("p");
        const userEmail = document.createElement("p");
        commentName.style.fontSize = "2rem";
        commentBody.style.fontSize = "1rem";
        userEmail.style.fontSize = "1rem";

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

function updateModal() {
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.lastChild);
  }
  while (userModal.firstChild) {
    userModal.removeChild(userModal.lastChild);
  }
  while (postModal.firstChild) {
    postModal.removeChild(postModal.lastChild);
  }
}
