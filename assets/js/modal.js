//------------------------------------------------------------------------
// ADDING EVENT LISTENERS
//------------------------------------------------------------------------
$(".btnEditPost").on("click", setEditPostContent);
$("#saveEditPostBtn").on("click", saveEditPost);
$("#cancelEditPostBtn").on("click", cancelEditPost);
//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------
function setModalContent() {
  idPost = $(this).attr("data-id");
  idUser = $(this).attr("data-userId");

  $("#commentsContainer").hide();

  getPostModalContent(idPost);
  getUserModalContent(idUser);
  getCommentsModalContent(idPost);
  /*Loading img post using its attribute*/
  $(".imgModal").attr("src", $(this).attr("data-img"));
}

function getPostModalContent(idPost) {
  var settings = {
    url: urlBaseLocal + "posts?id=" + idPost + "",
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

function setEditPostContent() {
  $("#postModal").modal("hide");
  // $("#postModal").css("opacity", "0.5")
  var settings = {
    url: urlBaseLocal + "posts?id=" + idPost + "",
    method: "GET",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    $("#postTitleInput").val(response[0].title);
    $("#bodyTitleInput").val(response[0].body);
  });
}

function cancelEditPost() {
  $("#editPostModal").modal("hide");
  $("#postModal").modal("show");
}

function saveEditPost() {
  var settings = {
    url: urlBaseLocal + "posts/" + idPost,
    method: "PATCH",
    timeout: 0,
    data: {
      title: $("#postTitleInput").val(),
      body: $("#bodyTitleInput").val(),
    },
  };

  $.ajax(settings).done(function (response) {
    getPostModalContent(idPost);
    getPostsRequest(indexPage);
    $("#editPostModal").modal("hide");
    $("#postModal").modal("show");
  });
}

