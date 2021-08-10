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
 * @param {String} section
 * @param {Number} from
 * @param {Number} limit
 */
async function fetchData(section = 'posts', from = 0, limit = 10) {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  const data = await fetch(`${baseUrl}/${section}?_start=${from}&_limit=${limit}`)
    .then((response) => response.json())
  // .then((data) => console.log(data));

  console.log(data)
}
