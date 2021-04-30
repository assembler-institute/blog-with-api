/* -------------------------------------------------------------------------- */
/*                                   TESTING                                  */
/* -------------------------------------------------------------------------- */
// console.log("Loaded javaScript file");

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

let editModalTitle = $("#editTitle");
let editModalBody = $("#editBody");
let deleteButton = $("#deleteBtn");
let saveButton = $("#saveBtn");

let editJSON = { title: new String(), body: new String() };

/* -------------------------------------------------------------------------- */
/*                               CLOSING BUTTONS                              */
/* -------------------------------------------------------------------------- */
// $(".personal-close").on("click", function () {
//   $(".collapse").each(function () {
//     if ($(this).hasClass("show")) {
//       $(this).toggleClass("show");
//     }
//   });
// });

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */
// Getting all posts
function loadPosts(postPage, postLimit) {
  var settings = {
    url: localUrl + `/posts?_page=${postPage}&_limit=${postLimit}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };
  $.ajax(settings).done(function (response) {
    // console.log(response);
    $(response).each(function (index, element) {
      postBox(response[index], response[index].id);
      // console.log("Loaded post!", response[index].id);
    });

    // Making all posts clickables
    $(".custom-post").each(function () {
      currPost = $(this);
      currPost.attr("data-target", "#exampleModal");
      currPost.attr("data-toggle", "modal");
    });
  });
}

// Create the box container
function postBox(post, postId) {
  rawTitle = post.title;
  rawUser = post.userId;

  let postWrapper = $("<div>");
  postWrapper.addClass("container-fluid col-md-6 col-lg-3 p-2");

  let postInside = $("<div>");
  postInside.attr("data-postId", postId);
  postInside.addClass("container-fluid custom-post p-4");

  //Post (left & right)
  let postRow = $("<div>");
  postRow.addClass("row h-100 px-4 d-flex justify-content-between");
  let postLeft = $("<div>");
  postLeft.addClass(
    "col-10 d-flex flex-column justify-content-between post-left p-0 mh-100"
  );
  let postRight = $("<div>");
  postRight.addClass("col-1 flex-column justify-content-start post-right p-0");

  // DELETE or PATCH
  editModal(postRight, post, postId);

  // Assigning title
  let postTitle = $("<div>");
  postTitle.addClass(
    "card-title capitalized-text overflow-hidden d-inline-block"
  );

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

  // Show/hide delete and patch icons when mouse over/out post
  postInside.on("mouseover", function () {
    $(postRow.children()[1]).toggleClass("d-flex");
  });
  postInside.on("mouseout", function () {
    $(postRow.children()[1]).toggleClass("d-flex");
  });

  // Open the modal when clicking the post
  postInside.on("click", function () {
    id = $(this).data("postid");
    modalContent(id);
  });
}

// Delete request based on post Id
function deletePost(postId) {
  var settings = {
    url: localUrl + `/posts/${postId}`,
    method: "DELETE",
    timeout: 0,
    headers: {},
  };
  $.ajax(settings).done(function () {
    console.log("Deleted post with id:", postId);
  });
}

// Edit post
function editPost(postId, newTitle, newBody) {
  var settings = {
    url: localUrl + `/posts/${postId}`,
    method: "PATCH",
    timeout: 0,
    data: {
      title: newTitle,
      body: newBody,
    },
  };

  $.ajax(settings).done(function () {
    console.log("Edited post widh id:", postId);
  });
}

// DELETE or PATCH
function editModal(parentDiv, post, postId) {
  let editIcon = $("<i>");
  editIcon.addClass("post-icon uil-edit text-right");
  editIcon.attr("id", "editIcon");

  parentDiv.append(editIcon);

  editIcon.on("click", function (event) {
    event.stopImmediatePropagation();
    $("#editModal").modal("show");
    editModalTitle.val(post.title);
    editModalBody.text(post.body);

    console.log(postId);

    //Delete post
    deleteButton.on("click", function () {
      deletePost(postId);
    });

    // Save post
    saveButton.on("click", function () {
      editPost(postId, editModalTitle.val(), editModalBody.val());
    });
  });
}

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
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
// Getting all comments
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
    commentTitle.addClass("comment-title capitalized-text");
    // Comment mail element
    let commentMail = $("<h6>");
    commentMail.addClass("comment-mail text-lowercase");
    // Comment body element
    let commentBody = $("<h6>");
    commentBody.addClass("comment-body capitalized-text");

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
    url: localUrl + `/posts/${postId}`,
    method: "GET",
    timeout: 0,
    headers: {},
  };

  $.ajax(settings).done(function (response) {
    // Title
    modalTitle.text(response.title);
    // Body
    bodyPost.text(response.body);
    // User
    setModalUser(response.userId, modalUser, modalMail);
    // Comments
    setComments(postId);
  });
}

/* -------------------------------------------------------------------------- */
/*                              CALLING FUNCTIONS                             */
/* -------------------------------------------------------------------------- */
// Page & Limit
loadPosts(1, 12);
