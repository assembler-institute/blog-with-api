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

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => console.log(json));

// fetch("https://jsonplaceholder.typicode.com/todos")
//   .then((response) => {
//     if (response.ok) {
//       console.log("Request Done");
//       response.json();
//     } else {
//       console.log("Request Failed");
//     }
//   })
//   .then((json) => {
//     console.log(json);
//   });
