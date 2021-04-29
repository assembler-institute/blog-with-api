/*-------------- Global variables ----------------*/
// Start and Limit
var postStart = 0;
var commentStart = 0;
var userStart = 0;
var limit = 10;
var firstTimePosts = true;
var firstTimeComments = true;
var firstTimeUsers = true;
var posts = [];
var users = [];
var comments = [];
var getUsersBtn = $("#usersBtn");
var getPostsBtn = $("#postsBtn");

// Requests Settings
// Posts request settings
var postRequestSettings = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  timeout: 0,
};

// Comments request settings
var commentRequestSettings = {
  url: "https://jsonplaceholder.typicode.com/posts/",
  method: "GET",
  timeout: 0,
  headers: {
    Cookies: "__cfduid=dc4543ecb63ede243bc85284095cc31a71619515823",
  },
};
// Users request settings
var userRequestSettings = {
  url: "https://jsonplaceholder.typicode.com/users",
  method: "GET",
  timeout: 0,
  headers: {
    Cookies: "__cfduid=dc4543ecb63ede243bc85284095cc31a71619515823",
  },
};
/*---------------------------------------------------------------*/

/*------------------------- Functions ---------------------------*/

// Sets up the request URL for any given request to any of the endpoints
function setRequestURL(start, limit, requestSettings, postID) {
  // Setting up URL for current Request and
  // newStart for the given requestSettings
  if (postID === null) {

    if(requestSettings.url.indexOf("posts?")){

      if (start === 0) {
        requestSettings.url = "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=" + limit;
      } else {
        let newStart = start + limit;
        requestSettings.url.replace("?_start=0", "?_start=" + newStart);
        postStart = newStart;
      }

    }else if(requestSettings.url.indexOf("users")){

      if (start === 0) {
        requestSettings.url = "https://jsonplaceholder.typicode.com/users?_start=0&_limit=" + limit;
      } else {
        let newStart = start + limit;
        requestSettings.url.replace("?_start=0", "?_start=" + newStart);
        userStart = newStart;
      }
    }
  } else if (requestSettings.url.indexOf("posts/")) {
    // Adding postID to request URL
    requestSettings.url = requestSettings.url.replace(
      "posts/",
      "posts/" + postID + "/comments?_start="
    );

    if (start === 0) {
      requestSettings.url = requestSettings.url + "0&_limit=" + limit;
    } else {
      let newStart = start + limit;
      requestSettings.url = "https://jsonplaceholder.typicode.com/posts/" + postID;
      requestSettings.url = requestSettings.url + "/comments" + "?_start=" + "&_limit=" + limit;
      console.log("comments url -->", requestSettings.url);
      commentStart = newStart;
    }
  }
}

// Creates and makes a request and stores its response into global variables
function makeRequest(requestType, limit, postID) {
  // Choosing request
  if (requestType === "posts?") {

    setRequestURL(postStart, limit, postRequestSettings, null);
    console.log("postRequestSettings.url -->", postRequestSettings.url);
    $.ajax(postRequestSettings).done(function (response) {
      posts = response;
      console.log("posts -->", posts);
    });

  } else if (requestType === "users") {

    setRequestURL(userStart, limit, userRequestSettings, null);
    console.log("userRequestSettings.url -->", userRequestSettings.url);
    $.ajax(userRequestSettings).done(function (response) {
      users = response;
      console.log("users -->", users);
    });

  } else if (requestType === "posts/") {

    setRequestURL(commentStart, limit, commentRequestSettings, postID);
    console.log("commentRequestSettings.url -->", commentRequestSettings.url);
    $.ajax(commentRequestSettings).done(function (response) {
      comments = response;
      console.log("comments -->", comments);
    });
    
  }
}

/*-------------------- Listeners -----------------------*/

/*------------------ Function calls --------------------*/
makeRequest("users", limit, null);
