
/*
 * Global Variables
 * @ author:
 */
var postID;
const container = $("#posts");
let limit = 15;
let page = 1;
let finishPost = $(
  `<h3 class="d-flex justify-content-center mt-4 fs-2"> Not More Posts</h3>`
);


/*
 * this function fetch data from api
 * @ author:
 */

async function getPost() {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?_page=${page}&_limit=${limit}`
    );
    const data = await response.json();
    return data;
};

/*
 * this function inject data to DOM
 * @ author:
 */
async function showPosts() {
    const posts = await getPost();
    posts.forEach((post) => {
        let postCont = $(`<div class="d-flex text-white pt-3 postcont mt-2" id="${post.id}">
                            <img src="assets/img/${post.userId}.jpg" class="flex-shrink-0 me-2 rounded" width="80" height="80">
                            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div class="d-flex justify-content-between">
                                <strong data-id="${post.id}" class="title fs-6" data-userid="${post.userId}" id="${post.id}" data-body="${post.body}" data-bs-toggle="modal" data-bs-target="#exampleModal">${post.id}) ${post.title}</strong>
                                </div>
                            </div>
                    </div>`);
    container.append(postCont);
    if(post.id >= 100) {
      container.append(finishPost);
    }
    });
}

showPosts();

/*
 * this function fetch data when scrolls
 * @ author:
 */
$(window).scroll(function () {
  if ($(window).scrollTop() + $(window).height() == $(document).height()) {
    page++;
    showPosts();
  }
});

/*
 * this function inject body a title to modal
 * @ author:
 */

$(document).on("click", function (event) {
    if (event.target.matches(".title")) {
      let settings = {
        url: `https://jsonplaceholder.typicode.com/users/${event.target.dataset.userid}`,
        method: "GET",
      };
      $.ajax(settings).done(function (response) {
        postID = event.target.id;
        $("#user").text(response.username);
        $("#email").text(response.email);
        $(".text-start").text(event.target.dataset.body);
        let titleSet = $(`strong[data-id="${event.target.id}"]`).text();
        $(".modal-title").text(titleSet);
      });
      $("#load-comments").on("click", function () {
        $(this).addClass("d-none");

        var settings = {
          url: `https://jsonplaceholder.typicode.com/posts/${event.target.id}/comments`,
          method: "GET",
        };

        $.ajax(settings).done(function (comments) {
          const commetsContainer = $(".modal-content");
          comments.forEach((comms) => {
            let comCont = $(`<div class="modal-body2">
                <strong class="fs-4">${comms.name}</strong>
                <span class="mt-2">${comms.body}</span>
                <span class="text-muted mt-3">${comms.email}</span>
                </div>`);
            commetsContainer.append(comCont);
          });
        });
      });
    }
});

/*
 * this function remove listeners and olders data
 * @ author:
 */
$("#exampleModal").on("hide.bs.modal", function () {
    $("#load-comments").removeClass("d-none");
    $(".modal-body2").remove();
    $("#load-comments").off();
});

/*
 * this function delete posts
 * @ author:
 */

function deletePost() {

$("#delete").on("click", function () {

  var settings = {
    url: `https://jsonplaceholder.typicode.com/posts/${postID}`,
    method: "DELETE",
    timeout: 0,
  };
  $.ajax(settings).done(function () {
    const div = $(`div[id="${postID}"]`);
    div.remove();
    $("#exampleModal").modal("hide");
    $("#modal2").modal("show");
    $("#delete-close").on("click",function () {
      $("#modal2").modal("hide");
    });
  });
});
}
deletePost();

/*
 * this function edit posts
 * @ author:
 */

function editPost() {
$("#edit").on("click", function () {

  var settings = {
    url: `https://jsonplaceholder.typicode.com/posts/${postID}`,
    method: "PATCH",
    timeout: 0,
    data: {
      title: $("#titlEdit").val(),
      body: $("#bodyEditbodyEdit").val(),
    },
  };

  $.ajax(settings).done(function () {
    $("#exampleModal").modal("hide");
    $("input").val("");
    $("#modal3").modal("show");
    $("#edit-close").on("click", function () {
      $("#modal3").modal("hide");
    });
  });
});
}
editPost();