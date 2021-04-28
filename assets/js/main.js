function postData(postId) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts/" + postId,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    /* $("#modalTitle").text(""); */
    $(".modal-title").text(response.title);
    $(".modal-body p").text(response.body);
  });
}

function openModal() {
  $(".post").each(function (index, element) {
    $(element).on("click", function () {
      let id = $(this).data("id");
      postData(id);
    });
  });
}

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
