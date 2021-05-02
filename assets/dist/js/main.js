$.get("https://jsonplaceholder.typicode.com/posts", function (data) {
  //console.log($("#postsWrapper"));
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
  postCard.find("p").html(postData.body);
  postCard.find("h3").html(postData.title);
}
