var postModal = $("#postModal");
var closeModalDownBtn = $("#closeModalDownBtn");
var closeModalUpBtn = $("#closeModalUpBtn");
var postsArray = [];

$("#postsWrapper").click(function (event) {
  console.log(event.target.href);
  if (event.target.href) {
    $(".modal-title").html(postsArray[event.target.id - 1].title);
    $(".modal-body").html(postsArray[event.target.id - 1].body);
    displayUserData(postsArray[event.target.id - 1].userId);
    postModal.toggleClass("show").show();
  }
});

closeModalDownBtn.click(function () {
  postModal.toggleClass("show").hide();
});

closeModalUpBtn.click(function () {
  postModal.toggleClass("show").hide();
});

$.get("https://jsonplaceholder.typicode.com/posts", function (data) {
  //console.log($("#postsWrapper"));
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
}

function displayUserData(userId) {
  return $.get(
    "https://jsonplaceholder.typicode.com/users/" + userId,
    function (data) {
      $(".modal-body").append(
        "<br><br><strong>" +
          data.name +
          "</strong><br><strong>" +
          data.email +
          "</strong>"
      );
    }
  );
}
