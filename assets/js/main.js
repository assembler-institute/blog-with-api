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
async function fillMainPost(mainPost=0) {
  let cards = await fetchData("posts", mainPost, 1);

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
    fillModal(id,"main");
  });
}

/**
 * Fill post of line Section
 */
async function fillLinesSection(linePost=1, lineLimit=6) {
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
      fillModal(id,"line");

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
async function fillTinderSection(tinderPost=7 , tinderLimit=6) {

  let cards = await fetchData("posts", tinderPost, tinderLimit);

  const tinderContent = document.getElementById("tinder-content");

  for (const card of cards) {
    const { userId, id, title } = { ...card };

    const users = await fetchData("users", userId-1 , 1);

    const { name } = { ...users[0] };
    const templateCard = `
      <template id="tinder-template-${id}">
        <div class="post__card col-md-4 hoverable" id="card-${id}">
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
    document.getElementById(`card-${id}`).addEventListener("click", function () {
    fillModal(id,"tinder");

      let modal = new bootstrap.Modal(document.getElementById('postModal'), {
      keyboard: false
      })

    modal.show();
    });

  }
}

/**
 * Fill post of line Section
 */
 async function fillInlineSection(inlinePost=13, inlineLimit=10) {
  
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

    document.getElementById(`post-inline-${id}`).addEventListener("click", function () {
      fillModal(id,"inline");
  
        let modal = new bootstrap.Modal(document.getElementById('postModal'), {
        keyboard: false
        })
      modal.show();
    });
  }
 
}


/**
 * Fill the modal when read more is clicked
 */
async function fillModal(modalId, section) {

  const post = await fetchData("posts", modalId - 1, 1);

  const { userId, id, title, body } = { ...post[0] };

  const user = await fetchData("users", userId-1, 1);

  const { name, company } = { ...user[0] };

  const modalContentArea = document.getElementById("postModal");

  modalContentArea.innerHTML = "";

  const templateModal = `
    <template id="modal-template-${id}">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content p-4">
          <div class="post row">
            <div class="post__user col-4 col-md-3 d-flex flex-column align-items-stretch justify-content-start p-4">
              <div class="">
                <i class="bi bi-emoji-sunglasses big"></i>
              </div>
              <div class="">
                <h6><strong>By</strong> ${name}</h6>
                <h6><strong>From</strong> ${company.name}</h6>
                <hr />
                <p>
                  <small> ${company.catchPhrase}</small>
                </p>
              </div>
            </div>
            <div class="post__content col-8 col-md-9">
              <div class="post__header row modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <h3 class="post__title" id="postModalLabel">
                  ${title}
                </h3>
              </div>
              <div class="post__body modal-body">
                <div class="post__text">
                  <em>${body}</em>
                </div>
                <hr />
                <div class="comments col 12" id="totalComments">N comments</div>
                <hr />
                <div id="commentsArea" class="comments-area">
                  <div class="d-flex p-4">
                    <i class="bi bi-emoji-sunglasses pr-4"></i>
                    <blockquote class="blockquote">
                      <p class="blockquote__text">
                        comment text
                      </p>
                      <footer class="blockquote__footer">
                        comment author
                        <cite title="Source Title">comment author company name </cite>
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
  let commentsCounter = 0;
  const commentArea = document.getElementById("commentsArea");
  commentArea.innerHTML = "";
  for (const comment of comments) {
    const { postId, id, name, email, body } = { ...comment };
    if (postId === modalId) {
      commentsCounter++;
      const templateModalComment = `
        <template id="comment-template-${id}">
          <div class="d-flex p-4" id="comment-${id}">
            <i class="bi bi-emoji-sunglasses pr-4"></i>
            <blockquote class="blockquote">
              <p class="blockquote__text" comment-body-${id}>${body} </p>
              <footer class="blockquote__footer">
                ${name}
                <cite title="Source Title">${companyName} </cite>
              </footer>
            </blockquote>
            <button type="button" class="btn-modal btn-danger" data-id="${id}" id="comment-delete-${id}">
            <i class="bi bi-trash"></i></button>
            <button type="button" class="btn-modal btn-success" data-id="${id}" id="comment-edit-${id}">
            <i class="bi bi-pencil"></i></button>
          </div>
        </template>
      `;

      commentArea.insertAdjacentHTML("beforeend", templateModalComment);
      const contentTemplate = document.getElementById(`comment-template-${id}`).content;
      const copyContent = document.importNode(contentTemplate, true);
      document.getElementById(`comment-template-${id}`).remove();
      commentArea.appendChild(copyContent);
      document.getElementById(`comment-delete-${id}`).addEventListener("click", deleteComment)
      document.getElementById(`comment-edit-${id}`).addEventListener("click", editComment)
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
  fillLinesSection();
  fillTinderSection();
  fillInlineSection()
})()

async function deleteComment(e){
  const id=e.target.parentElement.dataset.id; 
  const baseUrl = "https://jsonplaceholder.typicode.com";

  let response = await fetch(
    `${baseUrl}/comments/${id}`, { method: 'DELETE',
    });
  if (response.status===200) {
    console.log("El comentario se ha borrado");
    document.getElementById(`comment-${id}`).remove();
    
  }
  return response
}

async function editComment(e){
  const id=e.target.parentElement.dataset.id;
  const baseUrl = "https://jsonplaceholder.typicode.com";
  let prevText= document.getElementById(`comment-body-${id}`).innerHTML

  let response = await fetch(
    `${baseUrl}/comments/${id}`, { method: 'PUT',
    });
  if (response.status===200) {
    console.log("El comentario se ha editado");

    
  }
  return response
}