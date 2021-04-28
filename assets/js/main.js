/* -------------------------------------------------------------------------- */
/*                                   TESTING                                  */
/* -------------------------------------------------------------------------- */
console.log("Loaded javaScript file");

/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */
// Responese
let allPosts;
let shownPosts = 20;
let postsContainer = $(".posts-container");

// All posts
var settings = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  timeout: 0,
  headers: {},
};

// Getting all posts
$.ajax(settings).done(function (response) {
  //   $(response).each(function (index, element) {
  //     postBox(element);
  //   });
  console.log(response);

  for (let el = 1; el <= shownPosts; el++) {
    postBox(response[el]);
  }
});

// Create the box container
function postBox(post) {
  let rawTitle = post.title;
  let rawBody = post.body;
  let rawUser = post.userId;

  let postWrapper = $("<div>");
  postWrapper.addClass("col col-sm-6 col-lg-3 p-2");
  let postInside = $("<div>");
  postInside.addClass("custom-post p-4");

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
  console.log(rawUser);
}
