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

  const contentTemplate = document.getElementById(`post-${id}`).content;
  const copyContent = document.importNode(contentTemplate, true);
  postMain.innerHTML = '';
  postMain.appendChild(copyContent);
}

fillMainPost();