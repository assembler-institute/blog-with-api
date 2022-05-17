import { userIcon } from '/assets/js/icons.js';

/**
 * Fill modal´s comments
 *
 *  @param {Number} modalId id of  modal
 *  @param {String} companyName name of user company
 */
async function fillModalComments(modalId, companyName) {

  const comments = await fetch("https://jsonplaceholder.typicode.com/comments") //id del comentario
    .then(response => response.json())

  const icon = await userIcon(companyName);

  const commentArea = document.getElementById("comments-list");

  commentArea.innerHTML = "";

  for (let index = comments.length; index > 0; index--) {

    const { postId, id, name, body, } = { ...comments[index] };
    if (postId === modalId) {

      const templateModalComment = `
          <template id="comment-template-${id}">
            <li class="comments__item d-flex" id="comment-${id}">
              ${icon}
              <blockquote class="blockquote w-100">
                <div class="blockquote__header d-flex justify-content-start">
                  <p id="blockquote__name-${id}" class="blockquote__name d-flex justify-content-start">${name}</p>
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

      document.getElementById(`comment-delete-${id}`).addEventListener("click", deleteComment);
      document.getElementById(`comment-edit-${id}`).addEventListener("click", editComment);
    }
  }

  recountComments();
}

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

  return response;
}

/**
 * Edit comment of post
 *
 * @param {Object} e event
 */
function editComment(e) {
  const id = e.target.parentElement.dataset.id;

  let nameContainer = document.getElementById(`blockquote__name-${id}`);
  let prevName = nameContainer.innerHTML;

  nameContainer.innerHTML = `
      <textarea class="w-100 border border-secondary p-3" name="textareaName" rows="1" cols="100" id="name-text-area-${id}">${prevName}</textarea>
    `
  let textContainer = document.getElementById(`blockquote__body-${id}`);
  let prevText = textContainer.innerHTML;

  textContainer.innerHTML = `
      <textarea class="w-100 border border-secondary p-3" name="textareaBody" rows="4" cols="100" id="body-text-area-${id}">${prevText}</textarea>
      <button type="button" class="comments__save btn btn-dark" id="comments__save-${id}">Save</button>
    `

  document.querySelector(`#comment-${id} .comments__buttons`).classList.add('d-none');
  document.querySelector(`#comment-${id} .blockquote__dot`).classList.add('d-none');
  document.querySelector(`#comment-${id} .blockquote__company-name`).classList.add('d-none');

  document.getElementById(`comments__save-${id}`).addEventListener("click", function () {
    saveEditComment(id)
  })
}

/**
 * Saves comment after edit
 *
 * @param {Number} id id of comment
 */
async function saveEditComment(id) {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  let finalName = document.getElementById(`name-text-area-${id}`).value;
  document.getElementById(`blockquote__name-${id}`).innerHTML = finalName;

  let finalText = document.getElementById(`body-text-area-${id}`).value;
  document.getElementById(`blockquote__body-${id}`).innerHTML = finalText;

  document.querySelector(`#comment-${id} .comments__buttons`).classList.toggle('d-none');
  document.querySelector(`#comment-${id} .blockquote__dot`).classList.toggle('d-none');
  document.querySelector(`#comment-${id} .blockquote__company-name`).classList.toggle('d-none');

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

  return response;
}

/**
 * Recount and modify total comments
 */
function recountComments() {
  const counter = document.getElementById("comments-list").children.length;
  document.getElementById("totalComments").innerHTML = `${counter} comments`;
}

export {
  fillModalComments
};