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

  let response = await fetch(`${baseUrl}/${section}?_start=${from}&_limit=${limit}`)
    .then((response) => { return response.json() })

  return response;
}

/**
 * Fill main post
 */
async function fillMainPost() {

  const cards = await fetchData("posts", 0, 1);

  const { userId, id, title } = { ...cards[0] }

  const users = await fetchData("users", userId - 1, userId);

  const { name } = { ...users[0] }

  const templateCard = `
    <template id="post-${id}">
      <article class="post-main">
        <span class="post-main__author">${name}</span>
        <h1 class="post-main__title">${title}</h1>
        <button
          type="button"
          class="btn btn-dark"
          data-bs-toggle="modal"
          data-bs-target="#postModal"
        >
          Read more
        </button>
      </article>
    </template>
  `;

  const mainPost = document.getElementById("mainPost");
  mainPost.insertAdjacentHTML("beforeend", templateCard);

  const contentTemplate = document.getElementById(`post-${id}`).content;
  const copyContent = document.importNode(contentTemplate, true);
  mainPost.innerHTML = '';
  mainPost.appendChild(copyContent);
}

fillMainPost();