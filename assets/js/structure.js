//Load posts
/* <div class="col">
  <div class="row row-cols-1 bg-dark p-2">
    <div>
      <img class="img-fluid" src="assets/img/newPost.png" />
    </div>
    <div class="text-center bg-white mt-2">
      <h3>Title</h3>
    </div>
    <div class="lead text-center bg-white">Body</div>
  </div>
</div> */

var postList = $("#post-list");

var posts = $.get("https://jsonplaceholder.typicode.com/posts", (data) => {
  $.each(data, (i, element) => {
    post = $(
      '<div class="col mb-2" id="' +
        i +
        '"><div class="row row-cols-1 bg-dark p-2"><div><img class="img-fluid" src="assets/img/newPost.png" /></div><div class="text-center bg-white mt-2"><h3>' +
        element.title +
        '</h3></div><div class="lead text-center bg-white pb-3">' +
        element.body +
        "</div></div></div>"
    );
    $("#post-list").append(post);
  });
});
