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
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((jsonPosts) => {
      var postsLength = jsonPosts.length;

      for (let i = 0; i < postsLength; i++) {
        printCard();
        document.querySelectorAll(".card-body")[i].dataset.postNum = i + 1;
        document.querySelectorAll(".card-title")[i].textContent =
          jsonPosts[i].title;

        fetch("http://localhost:3000/users")
          .then((response) => response.json())
          .then((jsonUsers) => {
            jsonUsers.forEach((jsonUser) => {
              if (jsonPosts[i].userId == jsonUser.id) {
                document.querySelector(
                  `.card-body[data-post-num="${i + 1}"] .username-post`
                ).textContent = jsonUser.username;
                document.querySelector(
                  `.card-body[data-post-num="${i + 1}"] .email-post`
                ).textContent = jsonUser.email;
              }
            });
          });
      }
      let showButtons = document.querySelectorAll("[data-show]");
      showButtons.forEach((element) => {
        element.addEventListener("click", () => {
          let postNumber = element.parentElement.dataset.postNum;

          document.querySelector(".modal-title").textContent =
            jsonPosts[postNumber - 1].title;
          document.querySelector(".modal-body").textContent =
            jsonPosts[postNumber - 1].body;
        });
      });
    });
}
