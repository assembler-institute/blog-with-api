//Variables
var url = "https://jsonplaceholder.typicode.com";
var post;
var user;
var posts;
var users;
var comments = [];

var mouseEvent;
var lastEvent;

//Load functions
loadPosts();

function loadPosts() {
  let posts = $.get(url + "/posts", (data) => {
    $.each(data, (i, element) => {
      let post = $(
        '<div id="post" class="col mb-2" onclick="openModal(' +
          element.id +
          "," +
          element.userId +
          ')">' +
          '<div class="post-hover"><p>Double clic to open</p></div>' +
          '<div class="row row-cols-1 bg-dark p-2"><div><img class="img-fluid" src="assets/img/newPost.png" /></div><div class="text-center bg-white mt-2"><h3>' +
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
  $.get(url + "/posts", (data) => {
    $.each(data, (i, element) => {
      if (element.id === id) {
        return (post = element);
      }
    });
  });
}

function checkUser(userId) {
  $.get(url + "/users", (data) => {
    $.each(data, (i, element) => {
      if (element.id === userId) {
        user = element;
      }
    });
  });
}

function checkComments(id) {
  $.get(url + "/comments", (data) => {
    $.each(data, (i, element) => {
      if (element.postId === id) {
        let comment = $(
          '<div class="comment"><div class="comment-user"><div class="comment-name">' +
            element.name +
            '</div><div class="comment-email">' +
            element.email +
            '</div></div><div class="comment-body">' +
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
    //
    '<div id="modal"><div id="modal-bg" onclick="closeModal()">' +
      '</div><div class="info"><div id="modal-content" class="modal-content">' +
      '<div id="modal-title" class="modal-title-div modal-title display-5 text-center"><div class="modal-edit">Click to edit</div>' +
      '<div id="modal-edit-bg"></div><input id="modal-edit-title" value="' +
      post.title +
      '"><p>' +
      post.title +
      "</p></div>" +
      '<div class="modal-user">- Author: ' +
      user.username +
      " | " +
      user.email +
      ' -</div><div id="modal-body" class="modal-body display-6"><div class="modal-edit">Click to edit</div>' +
      '<input id="modal-edit-body" value="' +
      post.body +
      '"><p>' +
      post.body +
      '</p></div><div id="save-delete-post"><div id="edit">Save post</div><div id="delete">Delete post</div></div>' +
      '<div id="modal-comments" class="modal-comments display-6 text-center">' +
      '<div class="modal-comments-title">COMMENTS</div>' +
      '<div id="comments"></div</div></div></div>'
  );
  $("main").append(modal);
}

//Open modal
function openModal(id, userId) {
  checkPost(id);
  checkUser(userId);
  checkComments(id);
  if (user !== undefined && post !== undefined) {
    if (user !== null && post !== null) {
      loadModal();
      editListeners(id, userId);
    }
  }
  $(".post-hover").css({ zIndex: "-1" });
  $("html").css({ overflow: "hidden" });
  $(".info").css({ overflow: "auto" });
}

function closeModal() {
  $("#modal").remove();
  user = null;
  post = null;
  $("html").css({ overflow: "auto" });
  $(".post-hover").css({ zIndex: "2" });
}

function editListeners() {
  $("#modal-title").click(() => {
    edit();
  });
  $("#modal-body").click(() => {
    edit();
  });
  $("#modal-edit-bg").click(() => {
    save();
  });
  $("#edit").click(() => {
    save();
  });
  $("#delete").click(() => {
    deletePost();
  });
}

function edit() {
  $("#modal-edit-bg").css({ display: "block" });
  $("#modal-edit-title").css({ display: "block" });
  $("#modal-edit-body").css({ display: "block" });
  $("#save-delete-post").css({ display: "block", display: "flex" });
}

function save() {
  $("#modal-edit-bg").css({ display: "none", visibility: "hidden" });
  $("#modal-edit-title").css({ display: "none", visibility: "hidden" });
  $("#modal-edit-body").css({ display: "none", visibility: "hidden" });
  $("#save-delete-post").css({ display: "none", visibility: "hidden" });

  let updatedContent = {
    userId: post.userId,
    id: post.id,
    title: $("#modal-edit-title").val(),
    body: $("#modal-edit-body").val(),
  };

  console.log(JSON.stringify(updatedContent));

  $.ajax({
    type: "PATCH",
    url: url + "/posts/" + post.id,
    data: JSON.stringify(updatedContent),
    processData: false,
    contentType: "application/merge-patch+json",
    success: () => {
      console.log("Post updated");
    },
  });
}

function deletePost() {
  $.ajax({
    url: url + "/posts/" + post.id,
    type: "DELETE",
    success: () => {
      console.log("Post deleted");
    },
  });
}

// function modalListeners() {
//   $("#modal-title").click(() => {
//     $(".modal-title-input").toggle(edit);
//     if (edit === true) {
//       let oldTitleContent = $("#modal-title>p").text();
//       $(".modal-title-div").hide();
//       $(".modal-title-input").select();
//     } else if (edit === false) {
//       $("#modal-body").show();
//     }
//   });
// }

// //Edit modal
// function editModalTitle() {
//   let oldTitleContent = $("#modal-title>p").text();
//   $("#modal-title").remove();
//   $(".modal-user").before(
//     '<input id="modal-title" class="modal-title display-5 text-center" value="' +
//       oldTitleContent +
//       '">'
//   );
//   $("#modal-title").select();
// }

// function saveModalTitle() {
//   let newTitleContent = $("#modal-title").text();
//   if (newTitleContent !== "") {
//     console.log(newTitleContent);
//     $("#modal-title").remove();
//     $(".modal-user").before(
//       '<div id="modal-title" class="modal-title display-5 text-center">' +
//         newTitleContent +
//         "</div>"
//     );
//   }
// }

// function editModalBody() {
//   let oldContent = $("#modal-body>p").text();
//   $("#modal-body").replaceWith(
//     '<input id="modal-body" class="modal-body display-5 text-center" value="' +
//       oldContent +
//       '">'
//   );
//   $("#modal-body").select();
// }

// loadListeners();

// function loadListeners() {
//   $("#modal-title").toggle(() => {
//     console.log("test1");
//   });

//   $("#modal").click((event) => {
//     mouseEvent = event;
//     if (
//       mouseEvent.target.parentNode.id === "modal-title" ||
//       mouseEvent.target.id === "modal-title"
//     ) {
//       editModalTitle();
//       lastEvent = "modal-title";
//     } else {
//       saveModalTitle();
//     }
//     console.log(lastEvent);
//   });
// }
