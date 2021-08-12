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
    jsonPosts[postNumber - 1].title;
  document.querySelector(".modal-body").textContent =
    jsonPosts[postNumber - 1].body;

  $.get("http://localhost:3000/users", function (jsonUsers) {
    jsonUsers.forEach((jsonUser) => {
      if (jsonPosts[postNumber - 1].userId == jsonUser.id) {
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

$(`[data-action="delete"]`).on("click", (e) => {
  let postId = document.querySelector(".modal-content").dataset.blogId;
  console.log(postId);
  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      console.log("It's Ok");
      e.preventDefault();
      $("[data-success]").removeClass("visually-hidden");

      setTimeout(() => {
        $("[data-success]").addClass("visually-hidden");
      }, 3000);
    } else {
      console.log("Te troleo");
    }
  });
});

$(`[data-action="edit"]`).on("click", () => {
  $("[edit-title]").val($("[title]").text());
  $("[edit-body]").val($("[body]").text());
});

$("[confirm-edit]").on("click", () => {
  let postId = document.querySelector(".modal-content").dataset.blogId;
  console.log(postId);

  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title: $("[edit-title]").val(),
      body: $("[edit-body]").val(),
    }),
  });
});
