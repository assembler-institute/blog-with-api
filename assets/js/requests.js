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

// Specific Post settings
var specificPostRequestSettings = {
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
      requestSettings.url = requestSettings.url + "/comments" + "?_start=" + newStart + "&_limit=" + limit;
      console.log("comments url -->", requestSettings.url);
      commentStart = newStart;
    }
  }
}

// Creates and makes a request and shows posts
function getPostsRequest(limit, postID) {
  
  // Set posts url
  setRequestURL(postStart, limit, postRequestSettings, null);
  
  // Make posts requests and create posts environment
  $.ajax(postRequestSettings).done(function (response) {
    createPostsEnvironment(limit, null, response);
  });

}

// Creates and makes a request and shows comments for a given post
function getCommentsRequest(limit, postID) {
  
  // Set posts url
  setRequestURL(commentStart, limit, commentRequestSettings, postID);
  console.log("commentRequestSettings.url -->", commentRequestSettings.url);
  
  // Make posts requests and create posts environment
  $.ajax(commentRequestSettings).done(function (response) {
    createCommentsEnvironment(limit, postID, response)

  });

}

// 
/*
function makeRequest(requestType, limit, postID) {
  // Choosing request
  if (requestType === "posts?") {

    setRequestURL(postStart, limit, postRequestSettings, null);
    console.log("postRequestSettings.url -->", postRequestSettings.url);
    $.ajax(postRequestSettings).done(function (response) {
      getPosts(requestType, limit, null, response)
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
}*/

// Creates a post enrty for every post in the request 
// response stored in the posts array and displays it
function createPostsEnvironment(limit, postID, response){

  // Creates posts environment to display response stored in array posts
  for(element of response){

    let postLeftDiv = $("<div>");

    $("#postsContainer").append(
        $("<div>").addClass("post").attr("id", "post" + element.id).attr("data-user", element.userId).append(
          $("<div>").addClass("row")
          .append(
            postLeftDiv.addClass("col-11 p-4 d-flex flex-column position-static").attr("data-id", element.id)
            .append($("<h3>").addClass("mb-2").text(element.title))
            .append($("<p>").addClass("card-text mb-auto").text(element.body))
          )
        .append($("<div>").addClass("col-1 d-flex flex-column justify-content-center")
          .append($("<div>").addClass("row d-flex justify-content-center")
            .append($("<button>").addClass("remove mb-2 btn btn-dark").attr("type", "button")
              .append($("<i>").addClass("fa fa-trash"))
            )
          )
          .append($("<div>").addClass("row d-flex justify-content-center")
            .append($("<button>").addClass("edit mb-2 btn btn-dark").attr("type", "button")
              .append($("<i>").addClass("fa fa-edit"))
            )
          )
        )
      )
    );
    
    // Add an event listener to show the modal to every post
    postLeftDiv.on("click",function(){
      
      // Setting up post request URL and making request
      let postID = $(this).attr("data-id");
      specificPostRequestSettings.url = "https://jsonplaceholder.typicode.com/posts/" + postID;
      
      // Creating modal to show specific post
      createShowModalEnvironment(specificPostRequestSettings, postID);

    });

  }
}

// Creates the modal environment for a given post
/*
function createShowModalEnvironment(response, postID){
  
  // Making user request and creating modal environtment
  // when the response is received
  $.ajax(userRequestSettings.url +"/"+ $("#post"+ postID).attr("data-user")).done(function(data){
    
    // Modal environment to show a post
    $(".modal-content").attr("id", "showPostModal").append(
      $("<div>").addClass("modal-header").append(
        $("<h5>").addClass("modal-title").attr("id", "exampleModalLabel").text(response.title)
        )
        .append($("<button>").attr("id", "btnClose").addClass("btn btn-dark")
          .append($("<i>").addClass("fa fa-window-close")
        )
      )
    )
    .append($("<div>").addClass("modal-body")
      .append($("<p>").text(response.body))
      .append($("<h5>").addClass("modal-title").text("USER"))
      .append($("<p>").text(data.name))
      .append($("<p>").text(data.email))
    )
    .append($("<div>").addClass("modal-footer flex-column").attr("id", "exampleModalFooter")
      .append($("<h5>").addClass("modal-title").text("Comments"))
      .append($("<button>").attr("id", "btnLoadComments").addClass("btn btn-dark").attr("type", "button").text("Load Comments"))
    );
    
    let modalCloseBtn = $("#btnClose");
    let loadCommentsBtn = $("#btnLoadComments");

    // Adding event listeners to empty modal content
    $("main").on("click", emptyHideModalEnvironment); // comentar con compis esto del listener de cerrar
    modalCloseBtn.on("click", emptyHideModalEnvironment);

    // Adding listsener to show post comments
    loadCommentsBtn.on("click", function(){
      $(loadCommentsBtn).addClass("d-none");
      createShowCommentEnvironment();
      // createShowCommentEnvironment(postID, response);
    });
  });
  
}
*/
function createShowCommentEnvironment(){
  console.log("im in");
  //for(let comment of response){
  for(let i=0; i<5; i++){

    $("#modalFooter").append($("<div>").addClass("modal-body")
      .append($("<h6>").addClass("modal-title").text("Mock comment name "))
      .append($("<p>").text("Mock comment body"))
      .append($("<p>").text("Mock comment mail"))
    );

  }
}

// Makes an specific post request and creates the first part for the modal
// that needs to in order to fill its fields that this request receives.
function specificPostRequestinfo(specificPostRequestSettings, postID){

  $.ajax(specificPostRequestSettings).done(function (post) {
    
    $(".modal-content").attr("id", "showPostModal").append(
      $("<div>").addClass("modal-header").append(
        $("<h5>").addClass("modal-title").attr("id", "exampleModalLabel").text(post.title)
        )
        .append($("<button>").attr("id", "btnClose").addClass("btn btn-dark")
          .append($("<i>").addClass("fa fa-window-close")
        )
      )
    )
    .append($("<div>").addClass("modal-body").attr("id", "modalBody")
      .append($("<p>").text(post.body))
    )
    .append($("<div>").addClass("modal-footer flex-column").attr("id", "modalFooter")
      .append($("<h5>").addClass("modal-title").text("Comments"))
      .append($("<button>").attr("id", "btnLoadComments").addClass("btn btn-dark").attr("type", "button").text("Load Comments"))
    );

    // Adding event listeners to empty modal content
    $("main").on("click", emptyHideModalEnvironment); 
    $("#btnClose").on("click", emptyHideModalEnvironment);
    
    // Adding listsener to show post comments
    $("#btnLoadComments").on("click", function(){
      $("#btnLoadComments").addClass("d-none");
      specificPostCommentsRequestinfo(commentRequestSettings, postID);
    });

  });

}

// Makes an specific user request and creates the second part for the modal
// that needs to in order to fill its fields that this request receives.
function specificPostUserRequestInfo(userRequestSettings, postID){

  // Setting specific post user URL
  userRequestSettings.url = "https://jsonplaceholder.typicode.com/users" +"/"+ $("#post"+ postID).attr("data-user");

  // Making specific user request and filling modal user fields
  $.ajax(userRequestSettings).done(function(users){
    
    $("#modalBody").append(
      $("<h5>").addClass("modal-title").text("USER")
      .append($("<p>").text(users.name))
      .append($("<p>").text(users.email))
    );
  });

}

// Makes an specific user request and creates the second part for the modal
// that needs to in order to fill its fields that this request receives.
function specificPostCommentsRequestinfo(commentRequestSettings, postID){
  
  // Setting up specific post comments URL
  commentRequestSettings.url ="https://jsonplaceholder.typicode.com/posts/" + postID + "/comments?_start=" + commentStart + "&_limit=" + limit;

  // Making comments request and creating and filling modal comments fields
  $.ajax(commentRequestSettings).done(function(comments){
    console.log(comments);
    $(comments).each(function(index){
      
      $("#modalFooter").append($("<div>").addClass("modal-body")
        .append($("<h6>").addClass("modal-title").text($(comments)[index].name))
        .append($("<p>").text($(comments)[index].body))
        .append($("<p>").text($(comments)[index].email))
      );

    });

  });
}

// Creates the modal environment and shows the modal 
function createShowModalEnvironment(specificPostRequestSettings, postID){

  specificPostRequestinfo(specificPostRequestSettings, postID);
  specificPostUserRequestInfo(userRequestSettings, postID)
  $("#exampleModal").modal("show");

}

// Removes all children from post modal and hides modal
function emptyHideModalEnvironment(){
  $("#exampleModal").modal("hide");
  $("#showPostModal").empty();
}

function getUsers(){
  console.log(users)
}
/*---------------------------------------------------------------*/

/*------------------------- Listeners ---------------------------*/

getUsersBtn.on("click", getUsers);
$(window).on("load", function(){
  getPostsRequest(limit, null);
});

/*---------------------------------------------------------------*/

/*----------------------- Function calls ------------------------*/
// makeRequest("users", limit, null);
