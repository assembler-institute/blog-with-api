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
        let postInfo = document.querySelector(`.card-body[data-post-num="1"]`);
        postInfo.addEventListener("click", (e) => {
          document.querySelector(".modal-title").textContent = "Hello";
          console.log(e.target);
        });

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
    });
}
