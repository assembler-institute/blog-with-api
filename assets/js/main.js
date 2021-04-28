/* 
To run on document load
*/
$(function () {
  getPosts(0, 10);
});
// TODO first start load animation
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
            .append(
              $("<div>")
                .addClass("card-body")
                .attr("postId", postsJSON[index].id)
                .attr("data-bs-toggle", "modal")
                .attr("data-bs-target", "#postModal")
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
  let userId = [];
  const postId = $(event.relatedTarget).attr("postId");
  var settings = {
    url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#postModal .modal-header").text(response.title);
    $("#postModal .modal-body").text(response.body);
    userId.push(response.userId);
    $("#postModal").css("display: block");
  });
});
