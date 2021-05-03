var postModal = $("#postModal");
var closeModalDownBtn = $("#closeModalDownBtn");
var closeModalUpBtn = $("#closeModalUpBtn");
var postsArray = [];

$("#postsWrapper").click(function (event) {
  if (event.target.href) {
    $(".modal-title").html(postsArray[event.target.id - 1].title);
    $("#modalBody").html(postsArray[event.target.id - 1].body);
    displayUserData(postsArray[event.target.id - 1].userId);
    $("#commentsBtn").val(event.target.id);
    postModal.toggleClass("show").show();
  }
});

$("#commentsBtn").click(function (event) {
  displayComments(event.target.value);
});

closeModalDownBtn.click(function () {
  postModal.toggleClass("show").hide();
});

closeModalUpBtn.click(function () {
  postModal.toggleClass("show").hide();
});

$.get("https://jsonplaceholder.typicode.com/posts", function (data) {
  postsArray = data;
  for (post of data) {
    appendNewPostCard();
    displayAPIPostFields($("#postsWrapper").children().last(), post);
  }
});

function appendNewPostCard() {
  $("#postCardTemplate")
    .clone()
    .removeClass("d-none")
    .appendTo("#postsWrapper");
}

function displayAPIPostFields(postCard, postData) {
  postCard.attr("id", postData.userId + " " + postData.id);
  postCard.find("p").html(postData.body.slice(0, 72) + "...");
  postCard.find("h3").html(postData.title.slice(0, 19));
  postCard.find("a").attr("id", postData.id);
  postCard.find("a").attr("href", "#" + postData.userId + " " + postData.id);
}

function displayUserData(userId) {
  $.get(
    "https://jsonplaceholder.typicode.com/users/" + userId,
    function (data) {
      $("#modalBody").append(
        "<br><br><strong>" +
          data.name +
          "</strong><br><strong>" +
          data.email +
          "</strong>"
      );
    }
  );
}

function displayComments(postId) {
  if ($("#modalBody").children().length < 6) {
    $.get(
      "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments",
      function (data) {
        for (comment of data) {
          $("#modalBody").append(
            "<hr><div class='modal-body'><i>" +
              comment.name +
              "</i><br>" +
              comment.body +
              "<br><br>" +
              comment.email +
              "</div>"
          );
        }
      }
    );
  }
}
