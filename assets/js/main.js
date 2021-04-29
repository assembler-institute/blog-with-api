let posts = {};
$(document).ready(function () {
  const Url = "https://jsonplaceholder.typicode.com/posts";
  //$(".btn").click(function () {
  $.ajax({
    url: Url,
    type: "GET",
    success: function (result) {
      posts = result;
      //console.log(posts);
      fnPostsTitle();
      fnPosts();
      //return posts;
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
  //});
});

function fnPosts() {
  $.each(posts, function (index, element) {
    //console.log("nº: " + posts);
    $("#containerPosts")
      .append(
        $("<div>", {
          class: "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3",
        }).append(
          $("<div>", {
            class: "card div__card",
            "data-bs-toggle": "modal",
            "data-bs-target": "#staticBackdrop",
            "data-id": "" + posts[index].id + "",
          }).append(
            $("<div>", {
              class: "card-body",
            })
              .append(
                $("<h5>", {
                  class: "card-title posts__show--title",
                }).text("" + posts[index].title)
              )
              .append(
                $("<p>", {
                  class: "card-text posts__show",
                }).text("" + posts[index].body)
              )
          )
        )
      )
      .fadeIn("slow");
    posts[0] + 1;
  });
}

function fnPostsTitle() {
  $.each(posts, function (index, element) {
    //console.log("nº: " + posts);
    $("#listPosts")
      .append(
        $("<li>", {
          "data-id": "" + posts[index].id + "",
          "data-bs-toggle": "modal",
          "data-bs-target": "#staticBackdrop",
          "data-id": "" + posts[index].id + "",
        }).text(posts[index].title)
      )
      .fadeIn("slow");
    posts[0] + 1;
  });
}
