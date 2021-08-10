import { templateHeader } from "./templates.js";

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

fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((jsonPosts) => {
    console.log(jsonPosts);
    console.log(jsonPosts[0].title);
    console.log(jsonPosts[0].userId);

    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((jsonUsers) => {
        console.log(jsonUsers);
        jsonUsers.forEach((element) => {
          if (element.id == jsonPosts[0].userId) {
            console.log(element.username);
            console.log(element.email);
          }
        });
      });
  });
