var globalresponse = [];


//------------------------------------------------------------------------
// ADDING EVENT LISTENERS
//------------------------------------------------------------------------
$("#btnComments").on("click", function () {
  $("#commentsContainer").toggle("slow", function () {});
});
//------------------------------------------------------------------------
// CALLING FUNCTIONS
//------------------------------------------------------------------------
getPostsRequest();

//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------
function getPostsRequest() {
  /*Request for getting all posts*/
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    globalresponse = response;
    for (let k = 0; k < globalresponse.length; k = k + 10) {
      /*Here we work as header post as col-12*/
      setHeaderPost(k);
      for (let i = k + 1; i < k + 10; i = i + 3) {
        for (let j = i; j < i + 3; j++) {
          /*Here we work as regular post as col-4*/
          setRegularPost(k, j);
        }
      }
      $(".mainContainer").append(rowPost);
    }
  });
}

function setHeaderPost(k) {
  rowPost = $("<div>");
  rowPost.addClass("row");
  colHeaderPost = $("<div>");
  colHeaderPost.addClass("d-none d-md-block col-md-12");

  imgPost = $("<img>");
  imgPost.attr("src", "./assets/img/0.jpg");

  figurePost = $("<figure>");
  figurePost.append(imgPost);

  spanDiv = $("<div>");
  spanDiv.addClass("spanDiv");
  spanPost = $("<span>");
  spanPost.html(globalresponse[k].title);
  spanDiv.append(spanPost);

  divPost = $("<div>");
  divPost.addClass("post headerpost");
  divPost.attr("data-toggle", "modal");
  divPost.attr("data-target", "#postModal");
  divPost.attr("data-id", globalresponse[k].id);
  divPost.attr("data-userId", globalresponse[k].userId);
  divPost.attr("data-img", "./assets/img/0_sm.jpg");
  divPost.append(figurePost, spanDiv);
  divPost.on("click", setModalContent);

  colHeaderPost.append(divPost);

  rowPost.append(colHeaderPost);
}

function setRegularPost(k, j) {
  colPost = $("<div>");
  colPost.addClass("col-6 col-md-4");

  imgPost = $("<img>");
  imgPost.attr("src", "./assets/img/" + (j - k) + ".jpg");
  figurePost = $("<figure>");
  figurePost.append(imgPost);

  spanDiv = $("<div>");
  spanDiv.addClass("spanDiv");
  spanPost = $("<span>");
  spanPost.html(globalresponse[j].title);
  spanDiv.append(spanPost);

  divPost = $("<div>");
  divPost.addClass("post");
  divPost.attr("data-toggle", "modal");
  divPost.attr("data-target", "#postModal");
  divPost.attr("data-id", globalresponse[j].id);
  divPost.attr("data-userId", globalresponse[j].userId);
  divPost.attr("data-img", "./assets/img/" + (j - k) + ".jpg");
  divPost.append(figurePost, spanDiv);

  divPost.on("click", setModalContent);

  colPost.append(divPost);
  rowPost.append(colPost);
}

function setModalContent() {
  let idPost = $(this).attr("data-id");
  let idUser = $(this).attr("data-userId");

  $("#commentsContainer").hide();

  getPostModalContent(idPost);
  getUserModalContent(idUser);
  getCommentsModalContent(idPost);
  $(".imgModal").attr("src", $(this).attr("data-img"));
}

function getPostModalContent(idPost) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts?id=" + idPost + "",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    setPostModalContent(response);
  });
}

function getUserModalContent(idUser) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/users?id=" + idUser + "",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    setUserModalContent(response);
  });
}

function getCommentsModalContent(idPost) {
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts/" + idPost + "/comments",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    response.forEach(function (element) {
      setComentsModalContent(element);
    });
  });
}

function setPostModalContent(response) {
  $(".titleModal").html(response[0].title);
  $(".bodyModal").html(response[0].body);
}

function setUserModalContent(response) {
  $(".nameModal").html(response[0].name);
  $(".emailModal").html(response[0].email);
}

function setComentsModalContent(element) {
  pEmailComment = $("<div>");
  pEmailComment.addClass("emailComment");
  pEmailComment.html(element.email);

  divColEmailComment = $("<div>");
  divColEmailComment.addClass("col-12 text-left");
  divColEmailComment.append(pEmailComment);

  pBodyComment = $("<div>");
  pBodyComment.addClass("bodyComment");
  pBodyComment.html(element.body);

  divColBodyComment = $("<div>");
  divColBodyComment.addClass("col-12 text-left");
  divColBodyComment.append(pBodyComment);

  divRowComment = $("<div>");
  divRowComment.addClass("row");
  divRowComment.append(divColEmailComment, divColBodyComment);

  $("#commentsContainer").append(divRowComment);
}
