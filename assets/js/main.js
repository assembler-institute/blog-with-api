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
      $(article)
        .find(".img-post")
        .attr("src", `https://picsum.photos/id/${el.id}/300`);
      $(article).attr({
        "data-postid": el.id,
        "data-userid": el.userId,
        "data-bs-toggle": "modal",
        "data-bs-target": "#exampleModal",
      });

      $(article).on("click", fnShowPost);
      $(".prueba").append(article);
    }
  });
}

//* Show details
function fnShowPost(e) {
  let post = $(e.target).closest(".blog-post").get(0);
  const info = getInfo(post);
  console.log(info);

  // setTimeout(() => {
  //   window.open("./detail.html", "_self");
  // }, 5000);
}

/*
 * return POST INFO:
 * {
 * post{id, title, body...}
 * user{name, email...}
 * }
 */
function getInfo(post) {
  let info = {};
  // get post info
  let url = "https://jsonplaceholder.typicode.com/posts/";
  fnAjax(url + post.dataset.postid, {
    method: "GET",
    success: (data) => (info.post = data),
    error: () => console.log("Fail loading modal post"),
  });

  // get user info
  url = "https://jsonplaceholder.typicode.com/users/";
  fnAjax(url + post.dataset.userid, {
    method: "GET",
    success: (data) => fnPrintPostModal(data),
    error: () => console.log("Fail loading modal user"),
  });

  return info;
}

/*
 * print post details
 */
function fnPrintPostModal(post) {
  let article = $($("#modal-article").html());
  // User datail
  $(article).find(".detail-post-content h2").text(post.user.name);
  $(article)
    .find(".detail-post-content h2")
    .after($("<h2>").text(post.user.email));
  $(article).on("click", function () {
    $(this).remove();
  });
  // $(".blog-posts").append(article);
}
