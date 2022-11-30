import { userIcon } from '/assets/js/icons.js';
import { fillModalComments } from '/assets/js/comments.js';

/**
 * Fill main post
 *
 * @param {String} mainPost begining post
 */
async function fillMainPost(mainPost = 0) {
  let cards = await fetchData("posts", mainPost, 1);

  const { userId, id, title } = { ...cards[0] };

  const users = await fetchData("users", userId - 1, userId);

  const { name } = { ...users[0] };

  const templateCard = `
      <template id="mainTemplate">
        <div class="post-main">
          <p class="post-main__author">${name}</p>
          <div class="post-main__line"></div>
          <h2 class="post-main__title text-capitalize">${title}</h2>
          <div class="post-main__line"></div>
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
    fillModal(id, "main");
  });
}

/**
 * Fill post of line Section
 *
 *  @param {Number} linePost begining post
 *  @param {Number} lineLimit number of post to fetch
 */
async function fillLinesSection(linePost = 1, lineLimit = 6) {
  let cards = await fetchData("posts", linePost, lineLimit);

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
              <h2 class="post-block__title d-block text-capitalize">${title}</>
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
      fillModal(id, "line");

      let modal = new bootstrap.Modal(document.getElementById('postModal'), {
        keyboard: false
      })

      modal.show();
    });
  }
}

/**
 * Fill post of tinder Section
 *
 *  @param {Number} tinderPost begining post
 *  @param {Number} tinderLimit number of post to fetch
 */
async function fillTinderSection(tinderPost = 7, tinderLimit = 6) {

  let cards = await fetchData("posts", tinderPost, tinderLimit);

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

    document.getElementById(`card-${id}`).addEventListener("click", function () {
      let card = document.getElementById(`card-${id}`);

      if (card.classList.contains('inactive')) return;

      fillModal(id, "tinder");

      let modal = new bootstrap.Modal(document.getElementById('postModal'), {
        keyboard: false
      })

      modal.show();
    });

  }
}

/**
 * Fill post of line Section
 *
 *  @param {Number} inlinePost begining post
 *  @param {Number} inlineLimit number of post to fetch
 */
async function fillInlineSection(inlinePost = 13, inlineLimit = 10) {

  let cards = await fetchData("posts", inlinePost, inlineLimit);

  const postsContent = document.getElementById("inline-content");

  for (const card of cards) {
    const { userId, id, title } = { ...card };

    const users = await fetchData("users", userId - 1, userId);

    const { name } = { ...users[0] };

    const templateCard = `
        <template id="lines-template-${id}">
          <div class="post-inline d-inline" id="post-inline-${id}">
            <div class="post-inline__content d-inline">
              <div class="post-inline__img d-inline"></div>
              <p class="post-inline__name d-inline text-uppercase">${name}</p>
              <h2 class="post-inline__title d-inline text-capitalize">${title}</h2>
            </div>
          </div>
        </template>
      `;

    postsContent.insertAdjacentHTML("beforeend", templateCard);
    const contentTemplate = document.getElementById(`lines-template-${id}`).content;
    const copyContent = document.importNode(contentTemplate, true);
    document.getElementById(`lines-template-${id}`).remove();
    postsContent.appendChild(copyContent);

    document.getElementById(`post-inline-${id}`).addEventListener("click", function () {
      fillModal(id, "inline");

      let modal = new bootstrap.Modal(document.getElementById('postModal'), {
        keyboard: false
      })

      modal.show();
    });
  }
}

/**
 * Fill the modal when read more is clicked
 *
 *  @param {Number} modalId id of  modal
 */
async function fillModal(modalId) {

  const post = await fetchData("posts", modalId - 1, 1);

  const { userId, id, title, body } = { ...post[0] };

  const user = await fetchData("users", userId - 1, 1);

  const { name, company, address } = { ...user[0] };

  const icon = await userIcon(name);

  const modalContentArea = document.getElementById("postModal");

  modalContentArea.innerHTML = "";

  const templateModal = `
      <template id="modal-template-${id}">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content p-4">
            <div class="post row">
              <div class="post__user col-sm-4 col-md-3 d-flex flex-column align-items-stretch justify-content-start p-4">
                <div class="post__avatar">
                  ${icon}
                </div>
                <div class="">
                  <h6 class="post__name"><strong>By</strong> ${name}</h6>
                  <h6 class="post__company-name"><strong>From</strong> ${company.name}</h6>
                  <p class="post__company-catch-phrase"> ${address.city}</p>
                </div>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <div class="post__content col-sm-8 col-md-9">
                <header class="post__header row modal-header">
                  <h3 class="post__title text-capitalize" id="postModalLabel">
                    ${title}
                  </h3>
                </header>
                <div class="post__body modal-body">
                  <div class="post__text">
                    <em>${body}</em>
                  </div>
                  <div class="comments">
                    <div class="comments__total col 12" id="totalComments">
                      N comments
                    </div>
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
  document.querySelector("i").classList.add("big")
  fillModalComments(modalId, company.name);
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

export {
  fillMainPost,
  fillLinesSection,
  fillTinderSection,
  fillInlineSection
};