"use strict";

var $toggleInput = document.getElementById("toggle__input");
$toggleInput.addEventListener("click", switchStyles);

/**
 * Toggle styles when we press the switch button
 */
function switchStyles() {
  const $html = document.querySelector("html");
  const $toggle = document.getElementById("toggle");

  $toggle.classList.toggle("enabled");
  $html.classList.toggle("dark-mode");
}

/**
 * Fetch data
 *
 * @param {Number} from
 * @param {Number} limit
 * @param {String} section
 */

function fetchData(section = "posts", from = 0, limit = 20) {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  fetch(`${baseUrl}/${section}?_start=${from}&_limit=${limit}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function getPostData(id) {
  let postCard = {
    card: [{}],
  };
  fetch(`assets/data/db.json`)
    .then((response) => response.json())
    .then((data) => {
      let postDataId = id - 1;
      postCard.card.post = data["posts"].find(
        (element) => (element.id = postDataId)
      );
      postCard.card.user = data["users"].find(
        (element) => (element.id = postCard.card.post.userId)
      );
      postCard.card.comments = [];
      for (const comment of data["comments"]) {
        if (comment.postId === postDataId) {
          postCard.card.comments.push(comment);
        }
      }
    });

  return postCard;
}

function fillMainPost(id) {
  getPostData(id);
  console.log(postCard);
  let infoCard = `<template id="post-${card["post"].id}">
  <article class="post-main">
  <span class="post-main__author">${card["user"].name}</span>
  <h1 class="post-main__title">${card["post"].title}</h1>
  <button
    type="button"
    class="btn btn-dark"
    data-bs-toggle="modal"
    data-bs-target="#postModal"
  >
    Dark
  </button>
</article>
  </template>`;
  let toInsertInfo = document.getElementById("mainPost");
  toInsertInfo.insertAdjacentHTML("beforeend", infoCard);
  let contentTemplate = document.getElementById(
    `post-${card["post"].id}`
  ).content;
  let copyContent = document.importNode(contentTemplate, true);
  toInsertInfo.lastChild.remove();
  toInsertInfo.appendChild(copyContent);
}

function fetchLocalData(section) {
  const baseUrl = "assets/data/";
  fetch(`${baseUrl}/${section}.json`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
