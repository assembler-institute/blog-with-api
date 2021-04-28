//Variables
var post;
var user;
var posts;
var users;
var comments = [];

//Load functions
loadPosts();

function loadPosts() {
  let posts = $.get("https://jsonplaceholder.typicode.com/posts", (data) => {
    $.each(data, (i, element) => {
      let post = $(
        '<div class="col mb-2" onclick="openModal(' +
          element.id +
          "," +
          element.userId +
          ')"><div class="row row-cols-1 bg-dark p-2"><div><img class="img-fluid" src="assets/img/newPost.png" /></div><div class="text-center bg-white mt-2"><h3>' +
          element.title +
          '</h3></div><div class="lead text-center bg-white pb-3">' +
          element.body +
          "</div></div></div>"
      );
      $("#post-list").append(post);
    });
  });
}

function checkPost(id) {
  $.get("https://jsonplaceholder.typicode.com/posts", (data) => {
    $.each(data, (i, element) => {
      if (element.id === id) {
        return (post = element);
      }
    });
  });
}

function checkUser(userId) {
  $.get("https://jsonplaceholder.typicode.com/users", (data) => {
    $.each(data, (i, element) => {
      if (element.id === userId) {
        user = element;
      }
    });
  });
}

function checkComments(id) {
  $.get("https://jsonplaceholder.typicode.com/comments", (data) => {
    $.each(data, (i, element) => {
      if (element.postId === id) {
        let comment = $(
          '<div class="comment"><div class="comment-name">' +
            element.name +
            '</div><div class="comment-email">' +
            element.email +
            '</div><div class="comment-body">' +
            element.body +
            "</div></div>"
        );
        $("#comments").append(comment);
      }
    });
  });
}

function loadModal() {
  let modal = $(
    '<div id="modal"><div id="modal-bg" onclick="closeModal()">' +
      '</div><div class="info"><div id="modal-content" class="modal-content">' +
      '<div class="modal-title display-5 text-center">' +
      post.title +
      "</div>" +
      '<div class="modal-user">- Author: ' +
      user.username +
      " | " +
      user.email +
      ' -</div><div class="modal-body display-6">' +
      post.body +
      '</div><div id="modal-comments" class="modal-comments display-6 text-center">' +
      '<div class="modal-comments-title">COMMENTS</div>' +
      '<div id="comments"></div</div></div></div>'
  );
  $("main").append(modal);
  $("html").css({ overflow: "hidden" });
}

//Open modal
function openModal(id, userId) {
  checkPost(id);
  checkUser(userId);
  checkComments(id);
  if (user !== undefined && post !== undefined) {
    if (user !== null && post !== null) {
      loadModal();
    }
  }
}

function closeModal() {
  $("#modal").remove();
  user = null;
  post = null;
  $("html").css({ overflow: "auto" });
}
