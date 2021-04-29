
/*
 * Global Variables
 * @ author:
 */

const container = $("#posts");
let limit = 10;
let page = 1;


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
        const randomColor = Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
        let postCont = $(`<div class="d-flex text-muted pt-3">
                        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="70" height="70" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#${randomColor}"/><text x="0%" y="50%" fill="black" dy=".3em">${post.id}</text></svg>
                            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                                <div class="d-flex justify-content-between">
                                <strong data-id="${post.id}" class="text-gray-dark title fs-6" data-userid="${post.userId}" id="${post.id}" data-body="${post.body}" data-bs-toggle="modal" data-bs-target="#exampleModal">${post.title}</strong>
                                </div>
                            </div>
                    </div>`);
    container.append(postCont);
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
    if (event.target.matches(".text-gray-dark")) {
      let settings = {
        url: `https://jsonplaceholder.typicode.com/users/${event.target.dataset.userid}`,
        method: "GET",
      };
      $.ajax(settings).done(function (response) {
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
                <span>${comms.body}</span>
                <span class="text-muted">${comms.email}</span>
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




