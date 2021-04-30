let posts = {};
let post = {};
let coments = {};
let user = {};

handleEvents();

$(document).ready(function () {
  const Url = "https://jsonplaceholder.typicode.com/posts";
  //$(".btn").click(function () {
  $.ajax({
    url: Url,
    type: "GET",
    success: function (result) {
      posts = result;
      //console.log(posts);
      fnPostsTitle();
      fnPosts();
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
  //});
});

function fnPosts() {
  $.each(posts, function (index, element) {
    //console.log("nº: " + posts);
    $("#containerPosts")
      .append(
        $("<div>", {
          class: "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3",
        }).append(
          $("<div>", {
            class: "card div__card",
            "data-id": "" + posts[index].id + "",
            "data-us": "" + posts[index].userId + "",
          }).append(
            $("<div>", {
              class: "card-body",
              "data-id": "" + posts[index].id + "",
              "data-us": "" + posts[index].userId + "",
            })
              .append(
                $("<h5>", {
                  class: "card-title posts__show--title",
                  "data-id": "" + posts[index].id + "",
                  "data-us": "" + posts[index].userId + "",
                }).text("" + posts[index].title)
              )
              .append(
                $("<p>", {
                  class: "card-text posts__show",
                  "data-id": "" + posts[index].id + "",
                  "data-us": "" + posts[index].userId + "",
                }).text("" + posts[index].body)
              )
          )
        )
      )
      .fadeIn("slow");
    posts[0] + 1;
  });
}

function fnPostsTitle() {
  $.each(posts, function (index, element) {
    //console.log("nº: " + posts);
    $("#listPosts")
      .append(
        $("<li>", {
          "data-id": "" + posts[index].id + "",
        }).text(posts[index].title)
      )
      .fadeIn("slow");
    posts[0] + 1;
  });
}

function setPost(uId) {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts?id=" + uId,
    type: "GET",
    success: function (result) {
      post = result;
      fnSetPost();
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
}
function fnSetPost() {
  $.each(post, function (index, element) {
    $(".post__title")
      .append($("<h5>").text(post[index].title))
      .append(
        $("<div>", {
          class: "post__content",
        }).append($("<span>").text(post[index].body))
      );
  });
  //$(".modal__background").css({ visibility: "visible" });
}

function setComents(id) {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts/" + id + "/comments",
    type: "GET",
    success: function (result) {
      coments = result;
      console.log(coments);
      fnSetComents();
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
}
function fnSetComents() {
  $.each(coments, function (index, element) {
    $(".post__content--coments")
      .append($("<span>").text(coments[index].body))
      .append(
        $("<div>", {
          class: "post__coment--user",
        })
          .append($("<span>").text(coments[index].name))
          .append($("<span>").text(coments[index].email))
      )
      .append($("<hr>"));
  });
}

function setUser(us) {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users?id=" + us,
    type: "GET",
    success: function (result) {
      user = result;
      fnSetUser();
    },
    error: function (error) {
      console.log(`Error ${error}`);
    },
  });
}
function fnSetUser() {
  $.each(user, function (index, element) {
    $(".post__content--user")
      .append($("<span>").text(user[index].username))
      .append($("<span>").text(user[index].email))
      .append($("<hr />"));
  });
  $(".modal__background").css({ visibility: "visible" });
}

/*
 * Control listeners
 *
 */
function handleEvents() {
  /* Click event */
  document.addEventListener("click", (e) => {
    /* Click btn year */
    if (
      e.target.matches("div.div__card *") ||
      e.target.matches("#listPosts *")
    ) {
      //console.log("entro");
      console.log("Data-id: " + e.target.getAttribute("data-id"));
      //console.log(e.target.getAttribute("data-us"));

      setComents(e.target.getAttribute("data-id"));
      setUser(e.target.getAttribute("data-us"));
      setPost(e.target.getAttribute("data-id"));
    }

    if (e.target.matches(".modal__background") || e.target.matches("svg *")) {
      console.log("modal closed");
      $(".modal__background").css({ visibility: "hidden" });
      $(".post__content--coments").css({ display: "none" });
      $("button.button").attr("disabled", false).css({ opacity: "1" });
      $(".post__title").empty();
      $(".post__content--user").empty();
      $(".post__content--coments").empty();
    }
    if (e.target.matches(".button")) {
      console.log("open coments");
      $(".post__content--coments").css({ display: "block" });
      $("button.button").attr("disabled", true).css({ opacity: "0.5" });
    }
  });
}
