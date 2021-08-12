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

  let response = await fetch(
    `${baseUrl}/${section}?_start=${from}&_limit=${limit}`
  ).then((response) => response.json());

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
      <div class="post-main__content" id="post-main-${id}">
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
            data-id="${id}"
            id="readBtn"
          >
            Read more
          </button>
        </div>
      </div>
    </template>
  `;

  const postMain = document.getElementById("post-main");
  postMain.insertAdjacentHTML("beforeend", templateCard);

  const contentTemplate = document.getElementById(`mainTemplate`).content;
  const copyContent = document.importNode(contentTemplate, true);
  postMain.innerHTML = "";
  postMain.appendChild(copyContent);
  document.getElementById("readBtn").addEventListener("click", function () {
    fillModal(id);
  });
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
          <div class="post-block__content d-block" id="post-block-${id}">
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
    document.getElementById(`post-block-${id}`).addEventListener("click", function () {
      fillModal(id);

      let modal = new bootstrap.Modal(document.getElementById('postModal'), {
        keyboard: false
      })

      modal.show();
    });

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

    const users = await fetchData("users", userId - 1, 1);

    const { name } = { ...users[0] };

    const templateCard = `
      <template id="tinder-template-${id}">
        <div class="post-card col-md-4 hoverable" id="card-${id}">
          <div class="post-card__content outside">
            <div class="post-card__top inside d-flex flex-column align-items-center justify-content-center bg-black">
            <p class="post-card__author">${name}</p>
            <h2 class="post-card__name text-capitalize">${title}</h2>
            </div>
            <div class="post-card__drag"></div>
          </div>
        </div>
      </template>
    `;

    tinderContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(`tinder-template-${id}`).content;
    const copyContent = document.importNode(contentTemplate, true);

    document.getElementById(`tinder-template-${id}`).remove();
    tinderContent.appendChild(copyContent);
    document
      .getElementById(`card-${id}`)
      .addEventListener("click", function () {
        fillModal(id);
      });
  }
}

/**
 * Fill the modal when read more is clicked
 */
async function fillModal(modalId) {

  const post = await fetchData("posts", modalId - 1, 1);

  const { userId, id, title, body } = { ...post[0] };

  const user = await fetchData("users", userId, 1);

  const { name, company } = { ...user[0] };

  const modalContentArea = document.getElementById("postModal");

  modalContentArea.innerHTML = "";

  const templateModal = `
    <template id="modal-template-${id}">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content p-4">
          <div class="post row">
            <div class="post__user col-4 col-md-3 d-flex flex-column align-items-stretch justify-content-start p-4">
              <div class="post__avatar">
                <i class="bi bi-emoji-sunglasses big"></i>
              </div>
              <div class="">
                <h6 class="post__name"><strong>By</strong> ${name}</h6>
                <h6 class="post__company-name"><strong>From</strong> ${company.name}</h6>
                <p class="post__company-catch-phrase"> ${company.catchPhrase}</p>
              </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="post__content col-8 col-md-9">
              <div class="post__header row modal-header">
                <h3 class="post__title text-capitalize" id="postModalLabel">
                  ${title}
                </h3>
              </div>
              <div class="post__body modal-body">
                <div class="post__text">
                  <em>${body}</em>
                </div>
                <div class="comments">
                  <div class="comments__total col 12" id="totalComments">N comments</div>
                  <ul class="comments__list" id="comments-list">
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  `;

  modalContentArea.insertAdjacentHTML("beforeend", templateModal);
  const contentTemplate = document.getElementById(`modal-template-${id}`).content;

  const copyContent = document.importNode(contentTemplate, true);
  document.getElementById(`modal-template-${id}`).remove();
  modalContentArea.appendChild(copyContent);

  fillModalComments(modalId, company.name);
}

/**
 * Fill modal´s comments
 */
async function fillModalComments(modalId, companyName) {

  const comments = await fetchData("comments", 0, 500);

  let counter = 0;

  const commentArea = document.getElementById("comments-list");

  commentArea.innerHTML = "";

  for (const comment of comments) {

    const { postId, id, name, body } = { ...comment };

    if (postId === modalId) {

      counter++;

      const templateModalComment = `
        <template id="comment-template-${id}">
          <li class="comments__item d-flex">
            <i class="bi bi-emoji-sunglasses pr-4"></i>
            <blockquote class="blockquote">
              <div class="blockquote__header">
                <p class="blockquote__name d-inline">${name}</p>
                <span class="blockquote__dot"> · </span>
                <cite title="Source Title" class="blockquote__company-name">${companyName}</cite>
              </div>
              <p class="blockquote__body">${body}</p>
            </blockquote>
          </li>
        </template>
      `;

      commentArea.insertAdjacentHTML("beforeend", templateModalComment);
      const contentTemplate = document.getElementById(`comment-template-${id}`).content;

      const copyContent = document.importNode(contentTemplate, true);
      document.getElementById(`comment-template-${id}`).remove();
      commentArea.appendChild(copyContent);
    }
  }

  document.getElementById("totalComments").innerHTML = `${counter} comments`;
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
