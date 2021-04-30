// GLOBAL CONSTANTS AND VARIABLES
const baseURL = `http://localhost:3000/`;
var currentPage = 1;
const listElm = document.querySelector("#scrollableElement");
/*
To run on document load
*/
$(function () {
  getPosts(1, 5, true);
  listElm.addEventListener("scroll", infiniteScroll);
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
            .addClass("card bg-light h-100")
            .append(
              $("<div>")
                .addClass("card-body ")
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
  if (refresh === true) {
    currentPage = 1;
    populateHomePage();
  }
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
    $("#spinner-container").fadeOut(200, () =>
      $("#postModalContent").fadeIn(200)
    );
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
  $("#editForm").on("submit", saveEditedPost);
}

/* 
This function saves the edited post to DB after submitted form
*/
function saveEditedPost(event) {
  event.preventDefault();
  const postId = $("#postModal").attr("postId");
  var settings = {
    url: `${baseURL}posts/${postId}`,
    method: "PATCH",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      userId: $("#postEditUserId").val(),
      title: $("#postEditTitle").val(),
      body: $("#postEditBody").val(),
    }),
  };

  $.ajax(settings).done(function () {
    $("#editModal").modal("hide");
    $("#editForm").off();
    $("#postModalLabel").text($("#postEditTitle").val());
    $("#postModalText").text($("#postEditBody").val());
    $("#postModal").attr("userId", $("#postEditUserId").val());
    $("#postModal").modal("show");
    getPosts(1, 10, true);
  });
}

/* 
This function loads the infinite Scroll
*/
function infiniteScroll() {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    currentPage += 1;
    getPosts(currentPage, 5, false);
    console.log("nextPage");
  }
}

/* 
This function makes the first population fo the homepage 
calculating the height needed
*/
function populateHomePage() {
  let postCont = document.getElementById("posts-container");
  let header = document.querySelector("header");
  let body = document.querySelector("body");
  const pagesToLoad = Math.ceil(
    body.clientHeight / (postCont.clientHeight + header.clientHeight)
  );
  for (let i = 0; i < pagesToLoad; i++) {
    currentPage += 1;
    getPosts(currentPage, 5, false);
  }
}
