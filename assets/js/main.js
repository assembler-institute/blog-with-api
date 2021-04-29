//------------------------------------------------------------------------
// GLOBAL VARIABLES
//------------------------------------------------------------------------
var urlBase = "https://jsonplaceholder.typicode.com/";
var urlBaseLocal = "http://localhost:3000/";
var indexPage = 0;
/*Para arrancar nuestra db usando json-server*/
//------------------------------------------------------------------------
/*Abrimos cmd
/**/
/*cd Desktop\Assembler School Engineering\Projects\06 - Blog with API\blog-with-api\data*/
/**/
/*json-server --watch db.json*/
//------------------------------------------------------------------------

//------------------------------------------------------------------------
// ADDING EVENT LISTENERS
//------------------------------------------------------------------------
$("#btnComments").on("click", function () {
  $("#commentsContainer").toggle("slow", function () {});
});
/*Depending of window size the header post change its picture*/
$(window).resize(function () {
  if ($(window).width() < 749) {
    $(".imgHeader").attr("src", "./assets/img/0_sm.jpg");
  } else {
    $(".imgHeader").attr("src", "./assets/img/0.jpg");
  }
});
$(".fa-chevron-circle-left").on("click", previusPage);
$(".fa-chevron-circle-right").on("click", nextPage);

//------------------------------------------------------------------------
// CALLING FUNCTIONS
//------------------------------------------------------------------------
getPostsRequest();
checkIndexPage();
//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------
function previusPage() {
  indexPage--;
  checkIndexPage();
  console.log(indexPage);
}
function nextPage() {
  indexPage++;
  checkIndexPage();
  console.log(indexPage);
}

function checkIndexPage() {
  if (indexPage === -1 || indexPage === 0) {
    indexPage = 0;
    $(".fa-chevron-circle-left").addClass("arrowDisabled");
  } else {
    $(".fa-chevron-circle-left").removeClass("arrowDisabled");
  }
  if (indexPage === 10 || indexPage === 9) {
    indexPage = 9;
    $(".fa-chevron-circle-right").addClass("arrowDisabled");
  } else {
    $(".fa-chevron-circle-right").removeClass("arrowDisabled");
  }
}

function getPostsRequest() {
  /*Request for getting all posts*/
  var settings = {
    url: urlBaseLocal + "posts?_start=0&_limit=10",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    globalresponse = response;
    for (let k = 0; k < response.length; k = k + 10) {
      /*Here we work as header post as col-12*/
      setHeaderPost(response, k);
      for (let i = k + 1; i < k + 10; i = i + 3) {
        for (let j = i; j < i + 3; j++) {
          /*Here we work as regular post as col-4*/
          setRegularPost(response, k, j);
        }
      }
      $(".mainContainer").append(rowPost);
    }
  });
}

function setHeaderPost(response, k) {
  rowPost = $("<div>");
  rowPost.addClass("row");
  colHeaderPost = $("<div>");
  colHeaderPost.addClass("col-6 col-md-12");

  imgPost = $("<img>");
  imgPost.addClass("imgHeader");
  imgPost.attr("src", "./assets/img/0.jpg");

  figurePost = $("<figure>");
  figurePost.append(imgPost);

  spanDiv = $("<div>");
  spanDiv.addClass("spanDiv");
  spanPost = $("<span>");
  spanPost.html(response[k].title);
  spanDiv.append(spanPost);

  divPost = $("<div>");
  divPost.addClass("post headerpost");
  divPost.attr("data-toggle", "modal");
  divPost.attr("data-target", "#postModal");
  divPost.attr("data-id", response[k].id);
  divPost.attr("data-userId", response[k].userId);
  divPost.attr("data-img", "./assets/img/0_sm.jpg");
  divPost.append(figurePost, spanDiv);
  divPost.on("click", setModalContent);

  colHeaderPost.append(divPost);

  rowPost.append(colHeaderPost);
}

function setRegularPost(response, k, j) {
  colPost = $("<div>");
  colPost.addClass("col-6 col-md-4");

  imgPost = $("<img>");
  imgPost.attr("src", "./assets/img/" + (j - k) + ".jpg");
  figurePost = $("<figure>");
  figurePost.append(imgPost);

  spanDiv = $("<div>");
  spanDiv.addClass("spanDiv");
  spanPost = $("<span>");
  spanPost.html(response[j].title);
  spanDiv.append(spanPost);

  divPost = $("<div>");
  divPost.addClass("post");
  divPost.attr("data-toggle", "modal");
  divPost.attr("data-target", "#postModal");
  divPost.attr("data-id", response[j].id);
  divPost.attr("data-userId", response[j].userId);
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
  /*Loading img post using its attribute*/
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
    url: urlBaseLocal + "users?id=" + idUser + "",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    setUserModalContent(response);
  });
}

function getCommentsModalContent(idPost) {
  var settings = {
    url: urlBaseLocal + "posts/" + idPost + "/comments",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
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
