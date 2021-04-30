import { fnAjax } from "./_ajax.js";

let arrPosts = [];

document.addEventListener("DOMContentLoaded", function () {
  // Get posts
  fnAjax("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
    success: (data) => (arrPosts = data),
    error: () => console.log("Fail loading posts"),
  });

  // Get photos
  fnAjax("https://jsonplaceholder.typicode.com/photos", {
    method: "GET",
    success: (data) => printArticle(data),
    error: () => console.log("Fail loading photos"),
  });
});

// TODO: INTENTA OPTIMIZAR ESTO, BUSCA EN JQUERY.COM
function printArticle(data) {
  arrPosts.forEach((el, index) => {
    if (index < 3) {
      $(".hero-post").each(function (i, v) {
        if (index === i) {
          $(v).find(".bg-img");
          $(v).find("h2").length
            ? $(v).find("h2").text(el.title)
            : $(v).find("h3").text(el.title);
        }
      });
    } else {
      let article = $($("#main-article").html());
      $(article).find(".col-sm-8 h3").text(el.title);
      $(article).find(".col-sm-8 p").text(el.body);
      $(article)
        .find(".img-post")
        .attr("src", `https://picsum.photos/id/${el.id}/300`);
      $(article).attr({
        "data-postid": el.id,
        "data-userid": el.userId,
      });
      $(article).find("h3").on("click", fnShowPost);
      $(article)
        .find("h3")
        .attr({ "data-bs-toggle": "modal", "data-bs-target": "#exampleModal" });
      $(article).find(".delete-post").on("click", fnDeletePost);
      $(article)
        .find(".edit-post")
        .attr({ "data-bs-toggle": "modal", "data-bs-target": "#EditModal" });
      $(".posts-wrapper").append(article);
    }
  });
}

//* Show details
function fnShowPost(e) {
  let post = $(e.target).closest(".blog-post").get(0);
  getInfo(post);
}

/*
 * return POST INFO:
 * {
 * post{id, title, body...}
 * user{name, email...}
 * comment{...}
 * }
 */
function getInfo(post) {
  // get post info
  // let url = "https://jsonplaceholder.typicode.com/posts/";
  // fnAjax(url + post.dataset.postid, {
  //   method: "GET",
  //   success: (data) => fnPrintPostModal(data),
  //   error: () => console.log("Fail loading modal post"),
  // });
  const [postinfo] = arrPosts.filter((v) => v.id == post.dataset.postid);
  $(".modal .bg-img").attr(
    "src",
    `https://picsum.photos/id/${postinfo.id}/1200/700`
  );
  $(".modal-title").text(postinfo.title);
  $(".post-body").text(postinfo.body);

  // get user info
  let url = "https://jsonplaceholder.typicode.com/users/";
  fnAjax(url + post.dataset.userid, {
    method: "GET",
    success: (data) => fnPrintUserModal(data),
    error: () => console.log("Fail loading modal user"),
  });

  // get comments
  url = "https://jsonplaceholder.typicode.com/posts/";
  fnAjax(url + post.dataset.postid + "/comments", {
    method: "GET",
    success: (data) => fnPrintCommentsModal(data),
    error: () => console.log("Fail loading modal user"),
  });
}

/*
 * print post details
 */
function fnPrintPostModal(post) {
  $(".modal .bg-img").attr(
    "src",
    `https://picsum.photos/id/${post.id}/1200/700`
  );

  $(".modal-title").text(post.title);
  $(".post-body").text(post.body);
}

/*
 * print user details
 */
function fnPrintUserModal(user) {
  $(".detail-post-content h2").first().text(user.name);
  $(".detail-post-content h2").last().text(user.email);
}

/*
 * print comments details
 */
function fnPrintCommentsModal(comments) {
  $(".comments").empty();
  comments.forEach((element) => {
    let article = $($("#comment-article").html());
    $(article).find("h6").text(element.name);
    $(article).find("p").text(element.body);
    $(".comments").append(article);
  });
}

//* Edit post
$("#EditModal").on("show.bs.modal", function (e) {
  let post = $(e.relatedTarget).closest(".blog-post").get(0);
  const [postinfo] = arrPosts.filter((v) => v.id == post.dataset.postid);

  $("#EditModal").find("#title-name").val(postinfo.title);
  $("#EditModal").find("#body-text").val(postinfo.body);
  $("#EditModal").find("#patch-post").attr("data-postid", post.dataset.postid);
});

$("#patch-post").on("click", function (e) {
  // patch post
  const id = e.target.dataset.postid;
  let url = "https://jsonplaceholder.typicode.com/posts/";
  fnAjax(url + id, {
    method: "PATCH",
    success: (data) => fnModifyPost(data),
    error: () => console.log("Fail patching post"),
    data: {
      title: $("#EditModal").find("#title-name").val(),
      body: $("#EditModal").find("#body-text").val(),
    },
  });
  $("#EditModal").modal("hide");
});

//* delete post
function fnDeletePost(e) {
  e.preventDefault();
  let post = $(e.target).closest(".blog-post").get(0);
  let url = "https://jsonplaceholder.typicode.com/posts/";

  // delete post
  fnAjax(url + post.dataset.postid, {
    method: "DELETE",
    success: (data) => {
      $(`article[data-postid="${post.dataset.postid}"]`).slideUp(
        200,
        function () {
          $(this).remove();
        }
      );
    },
    error: () => console.log("Fail deleting post"),
  });
}

function fnModifyPost(data) {
  const article = $(`article[data-postid=${data.id}]`);
  $(article).find("h3").text(data.title);
  $(article).find("p").text(data.body);
  arrPosts[parseInt(data.id) - 1] = data;
}
