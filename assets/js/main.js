/* -------------------------------------------------------------------------- */
/*                                   TESTING                                  */
/* -------------------------------------------------------------------------- */
console.log("Loaded javaScript file");

/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */
// Responese
let post;
let postUserName;
let allPosts;
let shownPosts = 20;
let postsContainer = $(".posts-container");

// Post
let rawTitle;
let rawUser;
let rawBody;

// Modal
let modalTitle = $(".modal-title");
let modalUser = $("#userName");
let modalMail = $("#userMail");
let modalBody = $(".modal-body");
let modalText = $(".modal-text");
let commentsBtn = $(".btn-dark");
let saveBtn = $(".btn-primary");
let closeBtn = $(".btn-secondary");

commentsBtn.on("click", () => console.log("Loaded comments"));
saveBtn.on("click", () => console.log("Saved"));
closeBtn.on("click", () => console.log("Closed"));

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */
// Getting all posts
var settings = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  timeout: 0,
  headers: {},
};
$.ajax(settings).done(function (response) {
  for (let el = 1; el <= shownPosts; el++) {
    postBox(response[el], el);
  }

  // Making all posts clickables
  $(".custom-post").each(function () {
    currPost = $(this);
    currPost.attr("data-target", "#exampleModal");
    currPost.attr("data-toggle", "modal");
  });
});

// Create the box container
function postBox(post, postId) {
  rawTitle = post.title;
  rawUser = post.userId;

  let postWrapper = $("<div>");
  postWrapper.addClass("col col-sm-6 col-lg-3 p-2");
  let postInside = $("<div>");
  postInside.addClass("custom-post p-4 d-flex flex-column");
  postInside.attr("data-postId", postId);

  // Assigning title
  let postTitle = $("<div>");
  postTitle.addClass("card-title flex-grow-1");
  postTitle.text(rawTitle);
  // Assigning user
  let postUser = $("<div>");
  postUser.addClass("card-text postUser");
  setPostUser(rawUser, postUser);

  // Appending divs
  postInside.append(postTitle);
  postInside.append(postUser);
  postWrapper.append(postInside);
  postsContainer.append(postWrapper);

  postInside.on("click", function () {
    id = $(this).data("postid");
    modalContent(id);
  });
}

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
// Getting all users
function allUsers(userId, userDiv) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    timeout: 0,
    headers: {},
  };
  $.ajax(settings).done(function (users) {
    console.log(users);
  });
}

// Post user
function setPostUser(userId, userDiv) {
  var settings = {
    url: `https://jsonplaceholder.typicode.com/users?id=${userId}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };
  $.ajax(settings).done(function (user) {
    postUserName = user[0].username;
    renderPostUser(postUserName, userDiv);
  });
}

function renderPostUser(postUserName, postUserDiv) {
  postUserDiv.text(postUserName);
}

// Modal user
function setModalUser(userId, nameDiv, mailDiv) {
  var settings = {
    url: `https://jsonplaceholder.typicode.com/users?id=${userId}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };
  $.ajax(settings).done(function (user) {
    postUserName = user[0].username;
    renderModalUser(user[0], nameDiv, mailDiv);
  });
}

function renderModalUser(user, nameDiv, mailDiv) {
  nameDiv.text(user.username);
  mailDiv.text(user.email);
}

/* -------------------------------------------------------------------------- */
/*                                  COMMENTS                                  */
/* -------------------------------------------------------------------------- */
var settings = {
  url: "https://jsonplaceholder.typicode.com/comments?postId=2",
  method: "GET",
  timeout: 0,
  headers: {},
};

$.ajax(settings).done(function (comments) {
  console.log("Tests", comments);
});

/* -------------------------------------------------------------------------- */
/*                                MODAL CONTENT                               */
/* -------------------------------------------------------------------------- */
function modalContent(postId) {
  var settings = {
    url: `https://jsonplaceholder.typicode.com/posts?id=${postId + 1}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    // Title
    modalTitle.text(response[0].title);
    // Body
    modalText.text(response[0].body);
    // User
    setModalUser(response[0].userId, modalUser, modalMail);
    // Comments
  });
}

/* -------------------------------------------------------------------------- */
/*                              CALLING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
// allUsers();
