$(function () {
  getPosts(0, 10);
});
/*
This function gets posts between input numbers from API and displays them in homepage
 */
function getPosts(from, to) {
  var postsJSON = [];
  const settings = {
    url: `https://jsonplaceholder.typicode.com/posts?_start=${from}&_limit=${to}`,
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    populatePosts(response);
  });
}
/* 
This function inserts in DOM all elements from an array of objects
*/
function populatePosts(postsJSON) {
  $(postsJSON).each(function (index) {
    $("#posts-container .container .row").append(
      $("<div>")
        .addClass("col")
        .append(
          $("<div>")
            .addClass("card")
            .attr("postId", postsJSON[index].id)
            .append(
              $("<div>")
                .addClass("card-body")
                .append(
                  $("<h5>").addClass("card-title").text(postsJSON[index].title)
                )
            )
        )
    );
  });
}
