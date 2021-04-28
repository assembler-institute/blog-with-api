/* -------------------------------------------------------------------------- */
/*                                   TESTING                                  */
/* -------------------------------------------------------------------------- */
console.log("Loaded javaScript file");

/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */
// Responese
let allPosts;

// All posts
var settings = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  timeout: 0,
  headers: {},
};

// Getting all posts
$.ajax(settings).done(function (response) {
  console.log(response);
});
