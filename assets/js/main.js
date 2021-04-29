import { fnAjax } from "./_ajax.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get posts
  fnAjax("https://jsonplaceholder.typicode.com/posts", {
    method: "GET",
    success: (data) => printPosts(data),
    error: () => console.log("Fail"),
  });
});

function printPosts(data) {
  data.forEach((element) => {
    // let article = $("#main-article")
    //   .clone()
    //   .html(function () {
    //     return $(this).html().find(".col-sm-8 h3").text("kakaka");
    //   });

    let article = $($("#main-article").html());
    $(article).find(".col-sm-8 h3").text(element.title);
    console.log(article);
    $(".prueba").append(article);
  });
}
