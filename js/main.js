import { templateHeader, templateCard } from "./templates.js";
function printHome() {
  document
    .querySelector("body")
    .insertAdjacentHTML("beforeend", templateHeader);

  let mainNode = document.querySelector("#template-header").content;
  let copyNode = document.importNode(mainNode, true);

  document.querySelector("body").lastChild.remove();

  document.querySelector("body").appendChild(copyNode);
}
printHome();
printPosts();

function printCard() {
  document
    .querySelector(".row-cols-1")
    .insertAdjacentHTML("beforeend", templateCard);

  let mainNode = document.querySelector("#template-card").content;
  let copyNode = document.importNode(mainNode, true);

  document.querySelector(".row-cols-1").lastChild.remove();
  document.querySelector(".row-cols-1").appendChild(copyNode);
}

function printPosts() {
  $.get("http://localhost:3000/posts", function (jsonPosts) {
    var postsLength = jsonPosts.length;
    for (let i = 0; i < postsLength; i++) {
      printCard();

      document.querySelectorAll(".card-body[data-post]")[i].dataset.postNum =
        jsonPosts[i].id;

      document.querySelectorAll(".card-title")[i].textContent =
        jsonPosts[i].title;
    }

    $("[data-show]").on("click", (e) => {
      loadPostInfo(e, jsonPosts);
      collapseButton();
    });
  });
}

function collapseButton() {
  let collapse = document.querySelector("#collapseExample");
  if (collapse.classList.contains("show")) {
    collapse.classList.remove("show");
  }
}

function loadPostInfo(e, jsonPosts) {
  let postNumber = e.target.parentElement.dataset.postNum;

  //let parsed = parseInt(postNumber);
  //let parsedResult = parsed + 1;

  document.querySelector(".modal-content").dataset.blogId = postNumber;

  document.querySelector(".modal-title").textContent =
    jsonPosts[postNumber].title;
  document.querySelector(".modal-body").textContent =
    jsonPosts[postNumber].body;

  $.get("http://localhost:3000/users", function (jsonUsers) {
    jsonUsers.forEach((jsonUser) => {
      if (jsonPosts[postNumber].userId == jsonUser.id) {
        document.querySelector("[data-username]").textContent =
          jsonUser.username;
        document.querySelector("[data-email]").textContent = jsonUser.email;
      }
    });
  });
}

$("[data-show-comments]").on("click", () => {
  let postId = document.querySelector(".modal-content").dataset.blogId;
  $.get(
    `http://localhost:3000/posts/${postId}/comments`,
    function (jsonComments) {
      $("[data-comment]").html("");
      jsonComments.forEach((comment) => {
        $("[data-comment]").append(`<p>${comment.body}</p>`);
      });
    }
  );
});

$("[delete-content]").on("click", () => {
  $("[data-comment]").html("");
});

$(`[data-action="delete"]`).on("click", () => {
  let postId = document.querySelector(".modal-content").dataset.blogId;
  console.log(postId);
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      console.log("It's Ok");
    } else {
      console.log("Te troleo");
    }
  });
});

// [15:38] Antonio Copete
// fetch('https://example.com/delete-item/' + id, {
//   method: 'DELETE',
// })
// .then(res => res.text()) // or res.json()
// .then(res => console.log(res))
