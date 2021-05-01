// Variables

let from = 0;
let limit = 20;
let mainUrl = "http://localhost:3000/"; //https://jsonplaceholder.typicode.com/
let section;
let id;
let userId;
let postId;
let title;
let body;

// Event listeners

loadPosts();
// Load the body, the user info and the comments for every post you open

$("#modal-for-posts").on("show.bs.modal", function (event) {
  userId = $(event.relatedTarget).attr("user-id");
  postId = $(event.relatedTarget).attr("post-id");
  $("#modal-for-posts").attr("post-id", postId);
  $("#modal-for-posts").attr("user-id", userId);
  loadBodyOfPost(postId);
  loadUserAndEmail(userId);
});

$("#modal-for-posts").on("hide.bs.modal", function () {
  if ($("#modal-for-comments").hasClass("show")) {
    toggleCollapseComments();
  }
  $("#comments-btn").text("Open comments");
});

$("#comments-btn").on("click", function () {
  postId = $("#post-title").attr("post-id");
  loadCommentsOfPost(postId);
});

// get the info of id, title and body's post when you click on edit
$("#edit-btn").on("click", function () {
  $("#btp-edit").attr("user-id", $("#modal-for-posts").attr("user-id"));
  $("#btp-edit").attr("post-id", $("#modal-for-posts").attr("post-id"));
  userId = $("#btp-edit").attr("user-id");
  postId = $("#btp-edit").attr("post-id");
  $("#input-for-title").val($("#post-title").text());
  title = $("#input-for-title").val();
  $("#input-for-body").val($("#post-body").text());
  body = $("#input-for-body").val();
});

// get the info of user id and post id when you click on delete
$("#delete-btn").on("click", function () {
  $("#btp-delete").attr("user-id", $("#modal-for-posts").attr("user-id"));
  $("#btp-delete").attr("post-id", $("#modal-for-posts").attr("post-id"));
  userId = $("#btp-delete").attr("user-id");
  postId = $("#btp-delete").attr("post-id");
});

// Change the text on the "open comments" button
$("#comments-btn").text("Open comments");
$("#comments-btn").on("click", function () {
  if ($("#comments-btn").text() === "Open comments") {
    $("#comments-btn").text("Close comments");
  } else {
    $("#comments-btn").text("Open comments");
  }
});

// Get the id and delete the post with that id when you click on "confirm" button. Then load the posts for the main page
//!(it doesn't show it properly). It should close the modals, clean the main page and load it with the right posts.
// $("#confirm-delete-btn").on("click", function () {
//   id = $("#post-title").attr("post-id");
//   deletePost(id);
//   loadPosts();
// });

// Functions

// Load the posts
function loadPosts() {
  section = "posts/";
  var allPosts = {
    url: `${mainUrl}${section}/?_start=${from}&_limit=${limit}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(allPosts).done(function (response) {
    $(response).each(function (i, e) {
      createPostWithTitle(e.title, e.id, e.userId);
    });
  });
}

// Create the DOM elements for the posts
function createPostWithTitle(element, id, user) {
  $("#main-container-posts").append(
    $("<div>")
      .addClass("col")
      .append(
        $("<div>")
          .addClass(
            "card p-3 border border-primary rounded-3 bg-white border-2 mb-3"
          )
          .append(
            $("<div>")
              .addClass("card-body")
              .append(
                $("<h5>")
                  .attr("data-bs-toggle", "modal")
                  .attr("data-bs-target", "#modal-for-posts")
                  .attr("post-id", id)
                  .attr("role", "button")
                  .attr("user-id", user)
                  .addClass("post")
                  .text(element)
              )
          )
      )
  );
}

function loadBodyOfPost(postId) {
  section = "posts/";
  var bodyOfPost = {
    url: `${mainUrl}${section}${postId}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(bodyOfPost).done(function (response) {
    $("#post-title").text(response.title).attr("post-id", postId);
    $("#post-body").html(response.body);
  });
}

function loadUserAndEmail(userId) {
  section = "users/";
  var users = {
    url: `${mainUrl}${section}${userId}`,
    method: "GET",
    timeout: 0,
  };
  $.ajax(users).done(function (response) {
    $("#user-name").html(response.username);
    $("#email-user").html(response.email);
  });
}

function loadCommentsOfPost(postId) {
  section = "posts/";
  var commentsOfPost = {
    url: `${mainUrl}${section}${postId}/comments`,
    method: "GET",
    timeout: 0,
  };
  $.ajax(commentsOfPost).done(function (response) {
    $("#modal-for-comments").empty();
    $(response).each(function (i, e) {
      createComments(e.email, e.name, e.body);
    });
  });
}

function toggleCollapseComments() {
  var collapseElementList = [].slice.call(
    document.querySelectorAll("#modal-for-comments")
  );
  var collapseList = collapseElementList.map(function (collapseEl) {
    return new bootstrap.Collapse(collapseEl);
  });
}

function createComments(commentEmail, commentTitle, commentBody) {
  $("#modal-for-comments")
    .append(
      $("<div>")
        .addClass("fst-italic ms-3 me-3 mb-2 mt-2 text-end")
        .text(commentEmail)
    )
    .append(
      $("<div>")
        .addClass("m-3 mb-0 mt-0 fw-bold")
        .attr("id", "comment-title")
        .text(commentTitle)
    )
    .append(
      $("<div>")
        .addClass("modal-body p-0 pb-2 ms-3 me-3 border-primary border-bottom")
        .attr("id", "comment-body")
        .text(commentBody)
    );
}

$("#edit-form").on("submit", function (e) {
  e.preventDefault();
  id = $("#modal-for-posts").attr("post-id");
  title = $("#input-for-title").val();
  body = $("#input-for-body").val();
  editPost(id, title, body);
});

// var postToEdit = {
//   url: "http://localhost:3000/posts/2/",
//   method: "PATCH",
//   timeout: 0,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   data: JSON.stringify({
//     title: "titletest",
//     body: "bodytest",
//   }),
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

function editPost(id, title, body) {
  section = "posts/";
  var postToEdit = {
    url: `https://${mainUrl}${section}${id}/`,
    method: "PATCH",
    timeout: 0,
    data: {
      title: title,
      body: body,
    },
  };

  $.ajax(postToEdit).done(function (response) {
    console.log(response);
    // console.log(
    //   `Post with id: ${id}, edited succesfully with title: ${title} and body: ${body}`
    // );
  });
}

// function deletePost(id) {
//   section = "posts/";
//   var postToDelete = {
//     url: `${mainUrl}${section}${id}`,
//     method: "DELETE",
//     timeout: 0,
//   };

//   $(".modal").hide();
//   $(".modal-backdrop").hide();
//   console.log(id);

//   // $.ajax(postToDelete).done(function (response) {
//   //   console.log(`post ${id} deleted. Remember to load it again on db.json`);
//   // });
// }
