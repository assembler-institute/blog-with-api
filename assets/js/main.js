let from = 0;
let limit = 10;
let mainUrl = "http://localhost:3000/"; //https://jsonplaceholder.typicode.com/
let section;
let id;
let userId;
let postId;
let title;
let body;

$(function () {
  loadPosts();
});

$("#menu-btn").on("click", function () {
  $("#main-container-posts").empty();
  from = 0;
  limit = 10;
  loadPosts();
});

$("#load-more").on("click", function () {
  from = limit;
  limit += 10;
  loadPosts();
});

$("#modal-for-posts").on("hide.bs.modal", function () {
  $("#modal-for-comments").empty();
  if ($("#modal-for-comments").hasClass("show")) {
    toggleCollapseComments();
  }
  $("#comments-btn").text("Open comments");
});

$("#comments-btn").text("Open comments");
$("#comments-btn").on("click", function () {
  if ($("#comments-btn").text() === "Open comments") {
    $("#comments-btn").text("Close comments");
  } else {
    $("#comments-btn").text("Open comments");
  }
});

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

$("#delete-btn").on("click", function () {
  $("#btp-delete").attr("user-id", $("#modal-for-posts").attr("user-id"));
  $("#btp-delete").attr("post-id", $("#modal-for-posts").attr("post-id"));
  userId = $("#btp-delete").attr("user-id");
  postId = $("#btp-delete").attr("post-id");
});

$("#edit-form").on("submit", function (e) {
  e.preventDefault();
});

$("#submit-btn").on("click", function () {
  if ($("#input-for-body").val() && $("#input-for-title").val()) {
    id = $("#modal-for-posts").attr("post-id");
    title = $("#input-for-title").val();
    body = $("#input-for-body").val();
    editPost(id, title, body);
    $("#main-container-posts").empty();
    from = 0;
    limit = 10;
    loadPosts();
  }
  $("#modal-for-edit").modal("hide");
});

$("#confirm-delete-btn").on("click", function () {
  id = $("#post-title").attr("post-id");
  deletePost(id);
  $("#main-container-posts").empty();
  from = 0;
  limit = 10;
  loadPosts();
  $("#modal-confirm-delete").modal("hide");
});

$(document).ajaxStart(function () {
  $(".loading-el").addClass("loading");
  $("#load-more").text("Loading...");
});

$(document).ajaxStop(function () {
  $(".loading-el").removeClass("loading");
  if (limit === 100) {
    $("#load-more").attr("disabled", "disabled");
    $("#load-more").text("End of content");
    debugger;
  } else {
    $("#load-more").text("Load More");
  }
});

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
    $(".post").each(function (i, e) {
      $(this).on("click", function () {
        cleanPostBodyUserEmail();
        userId = $(this).attr("user-id");
        postId = $(this).attr("post-id");
        $("#modal-for-posts").attr("post-id", postId);
        $("#modal-for-posts").attr("user-id", userId);
        loadBodyOfPost(postId);
        loadUserAndEmail(userId);
        loadCommentsOfPost(postId);
      });
    });
  });
}

function createPostWithTitle(element, id, user) {
  $("#main-container-posts").append(
    $("<div>")
      .addClass("col")
      .append(
        $("<div>")
          .addClass("card bg-white no-border shadow-sm no-radius")
          .append(
            $("<img>")
              .attr("src", "./assets/img/post2.jpg")
              .attr("alt", "post img")
              .addClass("card-img-top no-radius")
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
                  .addClass("post card-title fs-6 bold")
                  .text(element)
              )
          )
      )
  );
}

function cleanPostBodyUserEmail() {
  $("#post-title").text("");
  $("#post-body").html("");
  $("#user-name").html("");
  $("#email-user").html("");
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

function editPost(id, title, body) {
  section = "posts/";
  var postToEdit = {
    url: `${mainUrl}${section}${id}/`,
    method: "PATCH",
    timeout: 0,
    data: {
      title: title,
      body: body,
    },
  };

  $.ajax(postToEdit).done(function (response) {});
}

function deletePost(id) {
  section = "posts/";
  var postToDelete = {
    url: `${mainUrl}${section}${id}`,
    method: "DELETE",
    timeout: 0,
  };

  $.ajax(postToDelete).done(function (response) {});
}
