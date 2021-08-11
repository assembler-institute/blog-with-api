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
            data-id="${id}"
            id="readBtn"
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
  postMain.innerHTML = "";
  postMain.appendChild(copyContent);
  document.getElementById("readBtn").addEventListener("click", function () {
    fillModal(id);
  });
}

/**
 * Fill post of tinder Section
 */
async function fillTinderSection() {
  let cards = await fetchData("posts", 1, 6);

  const tinderContent = document.getElementById("tinder-content");

  for (const card of cards) {
    const { userId, id, title } = { ...card };

    const users = await fetchData("users", userId - 1, 1);

    const { name } = { ...users[0] };
    const templateCard = `
      <template id="tinder-template-${id}">
        <div class="post__card col-md-4 hoverable" id="card-${id}">
          <div class="post__card__top d-flex flex-column align-items-center justify-content-center bg-black">
            <p class="post__card__author">${name}</p>
            <h2 class="post__card__name">${title}</h2>
          </div>
          <div class="post__card__drag"></div>
        </div>
      </template>
    `;

    tinderContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(
      `tinder-template-${id}`
    ).content;
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
  const post = await fetchData("posts", modalId, 1);
  const { userId, id, title, body } = { ...post[0] };
  const user = await fetchData("users", userId, 1);
  const { name, username, email, address, company } = { ...user[0] };
  const modalContentArea = document.getElementById("postModal");
  console.log(modalContentArea);
  const templateModal = `
      <template id="modal-template-${id}">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content p-4">
              <div class="row">
                <div
                class=" col-4 d-flex flex-column
                align-items-stretch justify-content-around p-4">
                <div class="col p-4">
                  <i class="bi bi-emoji-sunglasses big"></i>
                </div>
                <div class="col">
                  <h6><strong>By</strong> ${name} hola!</h6>
                  <h6><strong>From</strong> ${company.name}</h6>
                <hr />
                  <p> <small>${company.catchPhrase}</small> </p>
                </div>
              </div>
            <div class="col-8">
              <div class="row modal-header">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                </button>
                <h3 class="modal-title pb-10" id="postModalLabel">
                ${title}
                </h3>
              </div>
              <div class="modal-body">
                <h5>
                  <em>${body}</em>
                </h5>
              </div>
              <hr />
              <div class="comments col 12" id="totalComments"> </div>
              <hr />
              <div id="commentsArea" class"commentsArea">
                <div class="row p-4">
                  <div class="col-2">
                    <i class="bi bi-emoji-sunglasses"></i>
                  </div>
                  <div class="col">
                    <blockquote class="blockquote">
                      <p class="blockquote__text">
                        body
                      </p>
                      <footer class="blockquote__footer">
                        name
                        <cite title="Source Title">company name </cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </template>
    `;

  modalContentArea.insertAdjacentHTML("beforeend", templateModal);
  const contentTemplate = document.getElementById(
    `modal-template-${id}`
  ).content;
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
  let commentsCounter = 0;
  const commentArea = document.getElementById("commentsArea");
  for (const comment of comments) {
    const { postId, id, name, email, body } = { ...comment };
    if (postId === modalId) {
      commentsCounter++;
      const templateModalComment = `
      <template id="comment-template-${id}">
      <div class="row p-4">
      <div class="col-2">
        <i class="bi bi-emoji-sunglasses"></i>
      </div>
        <div class="col">
          <blockquote class="blockquote">
            <p class="blockquote__text">${body} </p>
            <footer class="blockquote__footer">
              ${name}
              <cite title="Source Title">${companyName} </cite>
            </footer>
          </blockquote>
        </div>
      </div>
      </template>
    `;

      commentArea.insertAdjacentHTML("beforeend", templateModalComment);
      const contentTemplate = document.getElementById(
        `comment-template-${id}`
      ).content;
      const copyContent = document.importNode(contentTemplate, true);
      document.getElementById(`comment-template-${id}`).remove();
      commentArea.appendChild(copyContent);
    }
  }
  document.getElementById(
    "totalComments"
  ).innerHTML = `${commentsCounter} comments`;
}

/**
 * Initialize the blog
 */
(function initialize() {
  fillMainPost();
  fillTinderSection();
})();
