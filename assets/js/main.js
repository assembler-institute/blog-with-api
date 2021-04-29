/* -------------------------------------------------------------------------- */
/*                                   TESTING                                  */
/* -------------------------------------------------------------------------- */
console.log("Loaded javaScript file");

/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */
// Local URL
let localUrl = "http://localhost:3000";

// Responese
let post;
let postUserName;
let allPosts;
let shownPosts = 12;
let postsContainer = $(".posts-container");

// Post
let rawTitle;
let rawUser;
let rawBody;
let bodyPost = $("#bodyPost");

// Comments
let commentsDiv = $("#commentsBlock");

// Modal
let modalTitle = $(".modal-title");
let modalUser = $("#userName");
let modalMail = $("#userMail");
let modalBody = $(".modal-body");
let modalText = $(".modal-text");

// Others
let breakLine = $("<hr/>");

/* -------------------------------------------------------------------------- */
/*                               CLOSING BUTTONS                              */
/* -------------------------------------------------------------------------- */
$(".personal-close").on("click", function () {
  $(".collapse").each(function () {
    if ($(this).hasClass("show")) {
      $(this).toggleClass("show");
    }
  });
});

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */
// Getting all posts
var settings = {
  url: localUrl + "/posts",
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
  postWrapper.addClass("container-fluid col-sm col-md-6 col-lg-3 p-2");

  let postInside = $("<div>");
  postInside.attr("data-postId", postId);
  postInside.addClass("container-fluid custom-post p-4");

  //Post (left & right)
  let postRow = $("<div>");
  postRow.addClass("row h-100 px-4");
  let postLeft = $("<div>");
  postLeft.addClass("col-11 d-flex flex-column post-left p-0");
  let postRight = $("<div>");
  postRight.addClass("col-1 d-flex flex-column post-left p-0");

  deleteIcon(postRight);
  patchIcon(postRight);

  // Assigning title
  let postTitle = $("<div>");
  postTitle.addClass("card-title flex-grow-1");
  postTitle.text(rawTitle);
  // Assigning user
  let postUser = $("<div>");
  postUser.addClass("card-text postUser");
  setPostUser(rawUser, postUser);

  // Appending divs
  postLeft.append(postTitle);
  postLeft.append(postUser);
  postRow.append(postLeft);
  postRow.append(postRight);

  postInside.append(postRow);
  postWrapper.append(postInside);
  postsContainer.append(postWrapper);

  postInside.on("click", function () {
    id = $(this).data("postid");
    modalContent(id);
  });
}

function deleteIcon(parentDiv) {
  // DELETE
  let deletePost = $("<i>");
  deletePost.addClass("post-icon uil-times-circle");
  deletePost.attr("id", "deleteIcon");

  parentDiv.append(deletePost);
}

function patchIcon(parentDiv) {
  // PATCH
  let editPost = $("<i>");
  editPost.addClass("post-icon uil-edit");
  editPost.attr("id", "editIcon");

  parentDiv.append(editPost);
}

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
// Getting all users
function allUsers(userId, userDiv) {
  var settings = {
    url: localUrl + "/users",
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
    url: localUrl + `/users?id=${userId}`,
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
    url: localUrl + `/users?id=${userId}`,
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
  url: localUrl + "/comments",
  method: "GET",
  timeout: 0,
  headers: {},
};

$.ajax(settings).done(function (comments) {
  console.log("Comments loaded");
});

function setComments(postId) {
  var settings = {
    url: localUrl + `/post/${postId}/comments`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (comments) {
    getPostComments(comments);
    console.log(comments);
  });
}

function getPostComments(comments) {
  commentsDiv.empty();
  $(comments).each(function (index, element) {
    // Comment wrapper
    let commentWrapper = $("<div>");
    commentWrapper.addClass("pb-4");
    // Comment title element
    let commentTitle = $("<h6>");
    commentTitle.addClass("comment-title");
    // Comment mail element
    let commentMail = $("<h6>");
    commentMail.addClass("comment-mail text-lowercase");
    // Comment body element
    let commentBody = $("<h6>");
    commentBody.addClass("comment-body");

    let textTitle = element.name;
    let textMail = element.email;
    let textBody = element.body;

    commentTitle.text(textTitle);
    commentMail.text(textMail);
    commentBody.text(textBody);

    commentWrapper.append(commentTitle);
    commentWrapper.append(commentMail);
    commentWrapper.append(commentBody);

    commentsDiv.append(commentWrapper);
  });
}

/* -------------------------------------------------------------------------- */
/*                                MODAL CONTENT                               */
/* -------------------------------------------------------------------------- */
function modalContent(postId) {
  var settings = {
    url: localUrl + `/posts?id=${postId + 1}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    // Title
    modalTitle.text(response[0].title);
    // Body
    bodyPost.text(response[0].body);
    // User
    setModalUser(response[0].userId, modalUser, modalMail);
    // Comments
    setComments(postId);
  });
}

/* -------------------------------------------------------------------------- */
/*                              CALLING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
// allUsers();
