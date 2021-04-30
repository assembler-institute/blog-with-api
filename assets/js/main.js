/* DELETE function */
function deletePost(postIdToRemove) {
  let deletePetition = $.ajax({
    method: "DELETE",
    url: "https://jsonplaceholder.typicode.com/posts/" + postIdToRemove,
    dataType: "JSON",
  });

  deletePetition.done(function () {});
}

/* GET functions */
function userData(userId) {
  $.get(
    "https://jsonplaceholder.typicode.com/users/" + userId,
    function (userData) {
      $("#authorInfo").text(userData.name + " - " + userData.email);
    }
  );
}

function commentsData(currentPostId) {
  $.get(
    "https://jsonplaceholder.typicode.com/posts/" + currentPostId + "/comments",
    function (commentsData) {
      $(".accordion-body").empty();
      $(commentsData).each(function (index, comment) {
        let divComment = $("<div>").addClass(
          "comment container rounded-3 p-3 mb-2"
        );
        $("<h6>")
          .addClass("comment-title")
          .text(comment.name)
          .appendTo(divComment);
        $("<p>")
          .addClass("comment-body")
          .text(comment.body)
          .appendTo(divComment);
        $("<p>")
          .addClass("comment-email text-end fw-light")
          .text(comment.email)
          .appendTo(divComment);
        $(divComment).appendTo(".accordion-body");
      });
    }
  );
}

function postData(postId) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts/" + postId,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    $(".modal-title").text(response.title);
    $(".modal-body p").text(response.body);
    userData(response.userId);
    commentsData(response.id);
  });
}

/* Event Listeners */
function openModal() {
  $(".post").each(function (index, element) {
    $(element).on("click", function () {
      let id = $(this).data("id");
      postData(id);
    });
  });
}

function confirmDelete() {
  console.log("henlo");
  $("#deletePost").on("click", function () {
    console.log("click");
    $("<div>").attr("id", "shadow");
    $("<div>")
      .attr({
        class: "spinner-border text-primary",
        role: "status",
        id: "spinner",
      })
      .appendTo($("#shadow"));
    $("<span>")
      .addClass("visually-hidden")
      .text("Loading...")
      .appendTo($("#spinner"));
    $("#shadow").appendTo($("main"));
  });
}

/* Init function */
function init(openModal) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    timeout: 0,
    DocumentType: JSON,
  };

  $.ajax(settings).done(function (response) {
    response.forEach((post) => {
      let postDiv = $("<div>").addClass(
        "container-lg bg-light row mt-lg-3 mx-auto post"
      );
      $("<h2>").text(post.title).appendTo(postDiv);
      $(postDiv).attr({
        "data-id": post.id,
        "data-bs-toggle": "modal",
        "data-bs-target": "#postModal",
      });
      $("main").append(postDiv);
    });
    openModal();
  });
}

init(openModal);
confirmDelete();
