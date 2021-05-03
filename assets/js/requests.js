/*-------------- Global variables ----------------*/
// Start and Limit
var postStart = 0;
var commentStart = 0;
var userStart = 0;
var limit = 20;

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

// Creates and makes a request and shows posts
function getPostsRequest(limit) {
  
  // Set posts url method
  postRequestSettings.url = "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=" + limit;
  postRequestSettings.method = "GET";
  
  // Make posts requests and create posts environment
  $.ajax(postRequestSettings).done(function (response) {
    createPostsEnvironment(response);
  });

}

// Creates a post enrty for every post in the request 
// response stored in the posts array and displays it
function createPostsEnvironment(response){

  // Creates posts environment to display response stored in array posts
  for(element of response){

    let postLeftDiv = $("<div>");

    $("#postsContainer").append(
        $("<div>").addClass("post mt-3").attr("id", "post" + element.id).attr("data-user", element.userId).append(
          $("<div>").addClass("row border border-dark")
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
      
      // Setting up post request URL and  method and making request
      let postID = $(this).attr("data-id");
      specificPostRequestSettings.url = "https://jsonplaceholder.typicode.com/posts/" + postID;
      specificPostRequestSettings.method = "GET";
      
      // Creating modal to show specific post
      createShowModalEnvironment(specificPostRequestSettings, postID);

    });

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
      .append($("<h5>").addClass("modal-title mb-3").text("Comments"))
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
  userRequestSettings.method = "GET";

  // Making specific user request and filling modal user fields
  $.ajax(userRequestSettings).done(function(users){
    
    $("#modalBody")
    .append($("<h5>").addClass("modal-title mb-3").text("USER"))
      .append($("<p>").addClass("mb-0").text(users.name))
      .append($("<p>").addClass("mb-0").text(users.email));
      $("#exampleModal").modal("show");
  });

}

// Makes an specific user request and creates the second part for the modal
// that needs to in order to fill its fields that this request receives.
function specificPostCommentsRequestinfo(commentRequestSettings, postID){
  
  // Setting up specific post comments URL
  commentRequestSettings.url ="https://jsonplaceholder.typicode.com/posts/" + postID + "/comments?_start=" + commentStart + "&_limit=" + limit;

  // Making comments request and creating and filling modal comments fields
  $.ajax(commentRequestSettings).done(function(comments){
    
    $(comments).each(function(index){
      
      $("#modalFooter").append($("<div>").addClass("modal-body border mb-3")
        .append($("<h6>").addClass("modal-title mb-3").text($(comments)[index].name))
        .append($("<p>").text($(comments)[index].body))
        .append($("<p>").addClass("mb-0").text($(comments)[index].email))
      );

    });

  });
}

// Creates the modal environment and shows the modal 
function createShowModalEnvironment(specificPostRequestSettings, postID){

  specificPostRequestinfo(specificPostRequestSettings, postID);
  specificPostUserRequestInfo(userRequestSettings, postID)
  // $("#exampleModal").modal("show");

}

// Removes all children from post modal and hides modal
function emptyHideModalEnvironment(){
  $("#exampleModal").modal("hide");
  $("#showPostModal").empty();
}

/*---------------------------------------------------------------*/

/*--------------------- Global Listeners ------------------------*/

$(window).on("load", function(){
  getPostsRequest(limit, null);
});

/*---------------------------------------------------------------*/

/*----------------------- Function calls ------------------------*/
// makeRequest("users", limit, null);
