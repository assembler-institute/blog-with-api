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
    .querySelector(".row-cols-3")
    .insertAdjacentHTML("beforeend", templateCard);

  let mainNode = document.querySelector("#template-card").content;
  let copyNode = document.importNode(mainNode, true);

  document.querySelector(".row-cols-3").lastChild.remove();
  document.querySelector(".row-cols-3").appendChild(copyNode);
}

function printPosts() {
  $.get("http://localhost:3000/posts", function (jsonPosts) {
    var postsLength = jsonPosts.length;
    for (let i = 0; i < postsLength; i++) {
      printCard();
      document.querySelectorAll(".card-body")[i].dataset.postNum = i + 1;
      document.querySelectorAll(".card-title")[i].textContent =
        jsonPosts[i].title;
    }

    $("[data-show]").on("click", (e) => {
      loadPostInfo(e, jsonPosts);
    });
  });
}

function loadPostInfo(e, jsonPosts) {
  let postNumber = e.target.parentElement.dataset.postNum;

  document.querySelector(".modal-title").textContent =
    jsonPosts[postNumber - 1].title;
  document.querySelector(".modal-body").textContent =
    jsonPosts[postNumber - 1].body;

  $.get("http://localhost:3000/users", function (jsonUsers) {
    console.log(jsonUsers);
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
  console.log("CLICK");
  $.get(`http://localhost:3000/posts/1/comments`, function (jsonComments) {
    jsonComments.forEach((comment) => {
      $("[data-comment]").text(comment.body);
    });
  });
});
