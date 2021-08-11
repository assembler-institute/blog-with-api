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
async function fetchData(section = "posts", from = 0, limit = 10) {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  let response = await fetch(`${baseUrl}/${section}?_start=${from}&_limit=${limit}`)
    .then((response) => response.json());

  return response;
}

/**
 * Fill main post
 */
async function fillMainPost() {
  let cards = await fetchData("posts", 0, 1);

  const { userId, id, title } = { ...cards[0] };

  const users = await fetchData("users", userId - 1, userId);

  const { name } = { ...users[0] };

  const templateCard = `
    <template id="mainTemplate">
      <article class="post-main" id="post-main">
        <p class="post-main__author">${name}</p>
        <div class="headline-card__line"></div>
        <h2 class="post-main__title text-capitalize">${title}</h2>
        <div class="headline-card__line"></div>
        <div class="post-main__button">
          <button 
            type="button" 
            class="btn btn-dark text-uppercase hoverable"
            data-bs-toggle="modal"
            data-bs-target="#postModal"
          >
            Read more
          </button>
        </div>
      </article>
    </template>
  `;

  const postMain = document.getElementById("post-main");
  postMain.insertAdjacentHTML("beforeend", templateCard);

  const contentTemplate = document.getElementById(`mainTemplate`).content;
  const copyContent = document.importNode(contentTemplate, true);
  postMain.innerHTML = '';
  postMain.appendChild(copyContent);
}

/**
 * Fill post of line Section
 */
async function fillLinesSection() {
  let cards = await fetchData("posts", 1, 6);

  const postsContent = document.getElementById("lines-content");

  for (const card of cards) {
    const { userId, id, title } = { ...card };

    const users = await fetchData("users", userId - 1, userId);

    const { name } = { ...users[0] };

    const templateCard = `
      <template id="lines-template-${id}">
        <div class="post-block d-block">
          <div class="post-block__content d-block">
            <div class="post-block__img d-block"></div>
            <p class="post-block__name d-block text-uppercase">${name}</p>
            <p class="post-block__title d-block text-capitalize">${title}</p>
          </div>
        </div>
      </template>
    `;

    postsContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(`lines-template-${id}`).content;
    const copyContent = document.importNode(contentTemplate, true);

    document.getElementById(`lines-template-${id}`).remove();
    postsContent.appendChild(copyContent);
  }
}

/**
 * Fill post of tinder Section
 */
async function fillTinderSection() {
  let cards = await fetchData("posts", 7, 6);

  const tinderContent = document.getElementById("tinder-content");

  for (const card of cards) {
    const { userId, id, title } = { ...card };

    const users = await fetchData("users", userId - 1, userId);

    const { name } = { ...users[0] };

    const templateCard = `
      <template id="tinder-template-${id}">
        <div class="post__card col-md-4 hoverable">
          <div class="post__card__content outside">
            <div class="post__card__top inside d-flex flex-column align-items-center justify-content-center bg-black">
            <p class="post__card__author">${name}</p>
            <h2 class="post__card__name text-capitalize">${title}</h2>
            </div>
            <div class="post__card__drag"></div>
          </div>
        </div>
      </template>
    `;

    tinderContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(`tinder-template-${id}`).content;
    const copyContent = document.importNode(contentTemplate, true);

    document.getElementById(`tinder-template-${id}`).remove();
    tinderContent.appendChild(copyContent);
  }
}

/**
 * Fill post of line Section
 */
async function fillInlineSection() {
  let cards = await fetchData("posts", 13, 10);

  const postsContent = document.getElementById("inline-content");

  for (const card of cards) {
    const { userId, id, title } = { ...card };

    const users = await fetchData("users", userId - 1, userId);

    const { name } = { ...users[0] };

    const templateCard = `
      <template id="lines-template-${id}">
        <div class="post-inline d-inline">
          <div class="post-inline__content d-inline">
            <div class="post-inline__img d-inline"></div>
            <p class="post-inline__name d-inline text-uppercase">${name}</p>
            <p class="post-inline__title d-inline text-capitalize">${title}</p>
          </div>
        </div>
      </template>
    `;

    postsContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(`lines-template-${id}`).content;
    const copyContent = document.importNode(contentTemplate, true);

    document.getElementById(`lines-template-${id}`).remove();
    postsContent.appendChild(copyContent);
  }
}

/**
 * Initialize the blog
 */
(function initialize() {
  fillMainPost();
  fillLinesSection();
  fillTinderSection();
  fillInlineSection()
})()
