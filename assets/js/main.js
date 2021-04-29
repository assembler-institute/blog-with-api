// CONSTANTS
const baseURL = `http://localhost:3000/`;

/*
To run on document load
*/
$(function () {
  getPosts(1, 10, false);
});

// TODO first start load animation
/*
This function gets posts between input numbers from API and displays them in homepage
The refresh variable indicates if a whole page reload is necessary of if we'll just apend more posts
 */
function getPosts(page, limit, refresh) {
  var postsJSON = [];
  const settings = {
    url: `${baseURL}posts?_page=${page}&_limit=${limit}`,
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    populatePosts(response, refresh);
  });
}

/* 
This function inserts in DOM all elements from an array of objects
*/
function populatePosts(postsJSON, refresh) {
  if (refresh === true) {
    $("#posts-container .container .row").empty();
  }
  $(postsJSON).each(function (index) {
    $("#posts-container .container .row").append(
      $("<div>")
        .addClass("col")
        .append(
          $("<div>")
            .addClass("card")
            .append(
              $("<div>")
                .addClass("card-body")
                .attr("postId", postsJSON[index].id)
                .attr("data-bs-toggle", "modal")
                .attr("data-bs-target", "#postModal")
                .attr("role", "button")
                .append(
                  $("<h5>").addClass("card-title").text(postsJSON[index].title)
                )
            )
        )
    );
  });
}

/* 
OPEN MODAL
*/
$("#postModal").on("show.bs.modal", function (event) {
  const postId = $(event.relatedTarget).attr("postId");
  const settings = {
    url: `${baseURL}posts/${postId}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    renderUserPostModal(response.userId);
    injectCommentCount(response.id);
    $("#postModalLabel").text(response.title);
    $("#postModalText").text(response.body);
    $("#postModal").attr("userId", response.userId).attr("postId", response.id);
    $("#openComments").on("click", openComments); //TODO add variables
    $("#editPost").on("click", openEditModal);
    $("#deletePost").on("click", deletePost);
  });
});

// Event post modal close
$("#postModal").on("hidden.bs.modal", function () {
  if ($("#commentsCollapse").hasClass("show")) {
    closeComments();
  }
  $("#postModalContent").css("display", "none");
  $("#spinner-container").css("display", "inline-block");
  $("#openComments").off();
  $("#editPost").off();
  $("#deletePost").off();
});

/* 
This function adds the information of the user that made the post
*/
function renderUserPostModal(userId) {
  var settings = {
    url: `${baseURL}users/${userId}`,
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    $("#username").text(response.username);
    $("#userEmail").text(response.email);
  });
}

/* 
This function injects the number of comments in the comments button
*/
function injectCommentCount(postId) {
  var settings = {
    url: `${baseURL}comments?postId=${postId}`,
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    $("#commentsCount").text(response.length);
    $("#spinner-container").fadeOut(200, () => $(".modal-content").fadeIn(200));
  });
}

/* 
This function opens and injects info into the collapsable comments section
*/
function openComments() {
  $("#openComments").off();
  $("#openComments").on("click", closeComments);
  const postId = $("#postModal").attr("postId");
  var settings = {
    url: `${baseURL}comments?postId=${postId}`,
    method: "GET",
    timeout: 0,
  };
  $("#commentsCollapse").empty();
  $.ajax(settings).done(function (response) {
    $(response).each((index, element) => {
      $("#commentsCollapse").append(
        $("<div>")
          .addClass("card")
          .append(
            $("<div>")
              .addClass("card-body")
              .append(
                $("<h5>").addClass("card-title").text(element.name),
                $("<h6>")
                  .addClass("card-subtitle mb-2 text-muted")
                  .text(element.email),
                $("<p>").addClass("card-text").text(element.body)
              )
          )
      );
    });
    toggleCollapseComments();
    $("#commentsCount").addClass("d-none");
    $("#openComments span:last-child").text("Close comments");
  });
}

/* 
This function closes the collapsable comments section
*/
function closeComments() {
  toggleCollapseComments();
  $("#openComments").off();
  $("#openComments").on("click", openComments);
  $("#commentsCount").removeClass("d-none");
  $("#openComments span:last-child").text("Comments");
  const myModalEl = document.getElementById("postModal");
  const modal = bootstrap.Modal.getInstance(myModalEl); // Returns a Bootstrap modal instance
  modal.handleUpdate();
}

/* 
This function collapses or opens the comments section
*/
function toggleCollapseComments() {
  // Collapse
  var collapseElementList = [].slice.call(
    document.querySelectorAll("#commentsCollapse")
  );
  var collapseList = collapseElementList.map(function (collapseEl) {
    return new bootstrap.Collapse(collapseEl);
  });
}

/* 
This function deletes de selected post from database
*/
function deletePost() {
  const postId = $("#postModal").attr("postId");
  var settings = {
    url: `${baseURL}posts/${postId}`,
    method: "DELETE",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    getPosts(1, 10, true);
    $("#postModal").modal("hide");
  });
}
/* 
This functions opens the Edit modal and injects its content
*/
function openEditModal() {
  const postId = $("#postModal").attr("postId");
  $("#postEditTitle").val($("#postModalLabel").text());
  $("#postEditBody").val($("#postModalText").text());
  $("#postEditUserId").val($("#postModal").attr("userId"));
  $("#saveEdit").attr("postId", postId);
  $("#editModal").modal("show");
}

function saveEditedPost() {
  //TODO
}
