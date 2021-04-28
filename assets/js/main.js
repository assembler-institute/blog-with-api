/*Request for getting all posts*/
var settings = {
  url: "https://jsonplaceholder.typicode.com/posts",
  method: "GET",
  timeout: 0,
};
$.ajax(settings).done(function (response) {
  console.log(response);
  for (let k = 0; k < 10; k = k + 10) {
    /*Here we work as header post as col-12 in a different row*/
    rowHeaderPost = $("<div>");
    rowHeaderPost.addClass("row");
    colHeaderPost = $("<div>");
    colHeaderPost.addClass("col-12");

    imgPost = $("<img>");
    imgPost.attr("src", "./assets/img/0.jpg");

    figurePost = $("<figure>");
    figurePost.append(imgPost);

    spanPost = $("<span>");
    spanPost.html(response[k].title);

    divPost = $("<div>");
    divPost.addClass("post");
    divPost.append(figurePost, spanPost);

    colHeaderPost.append(divPost);

    rowHeaderPost.append(colHeaderPost);

    $(".container").append(rowHeaderPost);
    for (let i = k + 1; i < k + 10; i = i + 3) {
      rowPost = $("<div>");
      rowPost.addClass("row");
      for (let j = i; j < i + 3; j++) {
        /*Here we work as normal post as col-4*/
        colPost = $("<div>");
        colPost.addClass("col-6 col-md-4");

        imgPost = $("<img>");
        imgPost.attr("src", "./assets/img/" + (j - k) + ".jpg");
        figurePost = $("<figure>");
        figurePost.append(imgPost);
        spanPost = $("<span>");
        spanPost.html(response[j].title);
        divPost = $("<div>");
        divPost.addClass("post");
        divPost.append(figurePost, spanPost);

        colPost.append(divPost);
        rowPost.append(colPost);
      }

      $(".container").append(rowPost);
    }
  }
});
