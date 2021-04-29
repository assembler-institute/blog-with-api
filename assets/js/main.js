/* -------------------------------------------------------------------------- */
/*                                   TESTING                                  */
/* -------------------------------------------------------------------------- */
console.log("Loaded javaScript file");

/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */
// Responese
let post;
let allPosts;
let shownPosts = 30;
let postsContainer = $(".posts-container");

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */
// Getting all posts
var settings = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  timeout: 0,
  headers: {},
};
$.ajax(settings).done(function (response) {
  for (let el = 1; el <= shownPosts; el++) {
    postBox(response[el], el);
  }

  // Making all posts clickables
  $(".custom-post").each(function () {
    currPost = $(this);
    currPost.attr("data-target", "#exampleModal");
    currPost.attr("data-toggle", "modal");
  });
});

// Create the box container
function postBox(post, postId) {
  let rawTitle = post.title;
  let rawBody = post.body;
  let rawUser = post.userId;

  let postWrapper = $("<div>");
  postWrapper.addClass("col col-sm-6 col-lg-3 p-2");
  let postInside = $("<div>");
  postInside.addClass("custom-post p-4");
  postInside.attr("data-postId", postId);

  // Assigning title
  let postTitle = $("<div>");
  postTitle.addClass("card-title");
  postTitle.text(rawTitle);
  // Assigning user
  let postUser = $("<div>");
  postUser.addClass("card-text");
  postUser.text(rawUser);

  // Appending divs
  postInside.append(postTitle);
  postInside.append(postUser);
  postWrapper.append(postInside);
  postsContainer.append(postWrapper);

  postInside.on("click", function () {
    console.log($(this).data("postid"));
  });
}

/* -------------------------------------------------------------------------- */
/*                                    USERS                                   */
/* -------------------------------------------------------------------------- */
// Getting all users
var settings = {
  url: "https://jsonplaceholder.typicode.com/users",
  method: "GET",
  timeout: 0,
  headers: {},
};
$.ajax(settings).done(function (users) {
  console.log(users);
  returnUser(2, users);
});

// Return username
function returnUser(index, response) {
  console.log(response[index].username);
}
