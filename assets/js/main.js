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

  const { name, company,address } = { ...user[0] };

  const modalContentArea = document.getElementById("postModal");

  modalContentArea.innerHTML = "";
  
  const templateModal = `
    <template id="modal-template-${id}">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content p-4">
          <div class="post row">
            <div class="post__user col-4 col-md-3 d-flex flex-column align-items-stretch justify-content-start p-4">
              <div class="post__avatar">
                ${await userIcon(name)}
              </div>
              <div class="">
                <h6 class="post__name"><strong>By</strong> ${name}</h6>
                <h6 class="post__company-name"><strong>From</strong> ${company.name}</h6>
                <p class="post__company-catch-phrase"> ${address.city}</p>
              </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="post__content col-8 col-md-9">
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
 * Fill modal´s comments
 * 
 *  @param {Number} modalId id of  modal
 *  @param {String} companyName name of user company 
 */
async function fillModalComments(modalId, companyName) {

  const comments = await fetchData("comments", 0, 500);

  const commentArea = document.getElementById("comments-list");

  commentArea.innerHTML = "";

  for (let index = comments.length; index > 0 ; index--) {

    const { postId, id, name, body, } = { ...comments[index] };
    if (postId === modalId) {

      const templateModalComment = `
        <template id="comment-template-${id}">
          <li class="comments__item d-flex" id="comment-${id}">
          ${await  userIcon(companyName)}
            <blockquote class="blockquote">
              <div class="blockquote__header">
                <p id="blockquote__name-${id}" class="blockquote__name d-inline">${name}</p>
                <span class="blockquote__dot"> · </span>
                <cite title="Source Title" class="blockquote__company-name">${companyName}</cite>
              </div>
              <p id="blockquote__body-${id}" class="blockquote__body">${body}</p>
            </blockquote>
            <div class="comments__buttons d-flex flex-column" data-id="${id}">
              <button type="button" class="comments__delete" data-id="${id}" id="comment-delete-${id}">
                <i class="bi bi-trash"></i>
              </button>
              <button type="button" class="comments__edit" data-id="${id}" id="comment-edit-${id}">
                <i class="bi bi-pencil"></i>
              </button>
            </div>
          </li>
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

  recountComments()
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

/**
 * Delete comment of post
 * 
 * @param {Object} e event 
 */
async function deleteComment(e) {
  const id = e.target.parentElement.dataset.id;
  const baseUrl = "https://jsonplaceholder.typicode.com";

  let response = await fetch(`${baseUrl}/comments/${id}`, { method: 'DELETE' });

  if (response.status === 200) {
    console.log("El comentario se ha borrado");
    document.getElementById(`comment-${id}`).remove();
    recountComments();
  }

  return response
}

/**
 * Edit comment of post
 * 
 * @param {Object} e event 
 */
 function editComment(e) {
  const id = e.target.parentElement.dataset.id;

  let nameContainer=document.getElementById(`blockquote__name-${id}`);
  let prevName=nameContainer.innerHTML;

  nameContainer.innerHTML=`
    <textarea name="textareaName" rows="3" cols="40" id="name-text-area-${id}">
      ${prevName}
    </textarea> 
    `
  let textContainer=document.getElementById(`blockquote__body-${id}`);
  let prevText= textContainer.innerHTML;

  textContainer.innerHTML=`
    <textarea name="textareaBody" rows="5" cols="40" id="body-text-area-${id}">
      ${prevText}
    </textarea> 
    <button type="button" class="comments__save" id="comments__save-${id}">
      save
    </button>
  `
  document.getElementById(`comments__save-${id}`).addEventListener("click", function () {
    saveEditComment(id)
  })
}

/**
 * Saves comment after edit
 * 
 * @param {Number} id id of comment 
 */
async function saveEditComment(id){
  const baseUrl = "https://jsonplaceholder.typicode.com";
  let finalName= document.getElementById(`name-text-area-${id}`).value;
  document.getElementById(`blockquote__name-${id}`).innerHTML=finalName;

  let finalText= document.getElementById(`body-text-area-${id}`).value;
  document.getElementById(`blockquote__body-${id}`).innerHTML=finalText;
  

    let response = await fetch(`${baseUrl}/comments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: finalName,
        body: finalText,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.status === 200) {
      console.log("El comentario se ha editado");
    }
    return response
}

/**
 * Recount and modify total comments
 */
function recountComments(){
  const counter =document.getElementById("comments-list").children.length
  document.getElementById("totalComments").innerHTML = `${counter} comments`;
}

/**
 * Assings an icon to the user/company name
 * 
 * @param {String} name name of user or company 
 */
async function userIcon(name){
  const users=await fetch("https://jsonplaceholder.typicode.com/users") //id del comentario
    .then(response => response.json())
  const userNamesArray=[];
  for (const user of users) { 
    const { name, company } = { ...user };
    userNamesArray.push(name) 
    userNamesArray.push(company.name) 
  }
 const iconsArray=[
   `<i class="bi bi-emoji-angry"></i>`,
   `<i class="bi bi-emoji-dizzy"></i>`,
   `<i class="bi bi-emoji-expressionless"></i>`,
   `<i class="bi bi-emoji-frown"></i>`,
   `<i class="bi bi-emoji-heart-eyes"></i>`,
   `<i class="bi bi-emoji-laughing"></i>`,
   `<i class="bi bi-emoji-neutral"></i>`,
   `<i class="bi bi-emoji-smile"></i>`,
   `<i class="bi bi-emoji-smile-upside-down"></i>`,
   `<i class="bi bi-emoji-sunglasses"></i>`,
   `<i class="bi bi-emoji-wink"></i>`,
   `<i class="bi bi-emoji-expressionless-fill"></i>`,
   `<i class="bi bi-emoji-frown-fill"></i>`,
   `<i class="bi bi-emoji-heart-eyes-fill"></i>`,
   `<i class="bi bi-emoji-laughing-fill"></i>`,
   `<i class="bi bi-emoji-neutral-fill"></i>`,
   `<i class="bi bi-emoji-smile-fill"></i>`,
   `<i class="bi bi-emoji-smile-upside-down-fill"></i>`,
   `<i class="bi bi-emoji-sunglasses-fill"></i>`,
   `<i class="bi bi-emoji-dizzy-fill"></i>`,
   `<i class="bi bi-emoji-angry-fill"></i>`,
   `<i class="bi bi-emoji-wink-fill"></i>`,
 ]
 const nameIndex = userNamesArray.indexOf(name);
 let userIcon;

 nameIndex <= iconsArray.length-1? userIcon= iconsArray[nameIndex] 
  : userIcon= iconsArray[nameIndex-iconsArray.length-1]

    return userIcon;
}