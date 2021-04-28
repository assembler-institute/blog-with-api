var globalresponse = [];




//------------------------------------------------------------------------
// CALLING FUNCTIONS
//------------------------------------------------------------------------
setPosts();


//------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------
function setPosts() {
  /*Request for getting all posts*/
  var settings = {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    globalresponse = response;
    for (let k = 0; k < 10; k = k + 10) {
      /*Here we work as header post as col-12*/
      setHeaderPost(k);
      for (let i = k + 1; i < k + 10; i = i + 3) {
        for (let j = i; j < i + 3; j++) {
          /*Here we work as normal post as col-4*/
          setRegularPost(k, j);
        }
      }
      $(".container").append(rowPost);
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
  divPost.append(figurePost, spanDiv);

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
  divPost.append(figurePost, spanDiv);

  colPost.append(divPost);
  rowPost.append(colPost);
}
