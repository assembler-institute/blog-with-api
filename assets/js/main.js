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
async function fetchData(section = "posts", from = 0, limit = 20) {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  let response = await fetch(
    `${baseUrl}/${section}?_start=${from}&_limit=${limit}`
  ).then((response) => {
    return response.json();
  });

  return response;
}

/**
 * Fill main post
 */
async function fillMainPost() {
  let cards = await fetchData("posts", 0, 1);
  console.log(cards);
  const { userId, id, title } = { ...cards[0] };

  const users = await fetchData("users", userId - 1, userId);

  const { name } = { ...users[0] };

  const templateCard = `
    <template id="mainTemplate">
      <article class="post-main">
      <p class="post-main__author">${name}</p>
      <div class="headline-card__line"></div>
      <h2 class="post-main__title text-capitalize">${title}</h2>
      <div class="headline-card__line"></div>
      <div class="post-main__button">
        <button type="button" class="btn btn-dark text-uppercase hoverable" 
         data-bs-toggle="modal" data-bs-target="#postModal" data-id="${id}">Read more</button>
      </div>
    </article>

    </template>
  `;

  const mainPost = document.getElementById("postMain");
  mainPost.insertAdjacentHTML("beforeend", templateCard);

  const contentTemplate = document.getElementById(`mainTemplate`).content;
  const copyContent = document.importNode(contentTemplate, true);
  mainPost.innerHTML = "";
  mainPost.appendChild(copyContent);
}

/**
 * Fill post of tinder Section
 */
async function fillTinderSection() {
  const cards = await fetchData("posts", 1, 6);
  console.log(cards);
  for (const card of cards) {
    const { userId, id, title } = { ...card };
    const users = await fetchData("users", userId - 1, userId);
    const { name } = { ...users[0] };

    const templateCard = `
      <template id="tinderTemplate-${id}">
      <div class="post__card col-md-4 hoverable">
      <div class="post__card__top d-flex flex-column align-items-center justify-content-center bg-black">
        <p class="post__card__author">${name}</p>
        <h2 class="post__card__name">${title}</h2>
      </div>
      <div class="post__card__drag"></div>
    </div>
  
      </template>
    `;

    const tinderContent = document.getElementById("tinderContent");
    tinderContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(
      `tinderTemplate-${id}`
    ).content;
    const copyContent = document.importNode(contentTemplate, true);
    document.getElementById(`tinderTemplate-${id}`).remove();
    tinderContent.appendChild(copyContent);
  }
}

function fillBlog() {
  fillMainPost();
  fillTinderSection();
}

fillBlog();
