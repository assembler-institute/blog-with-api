/**
 * Adds eventListener to toggle input
 */
function toggleDarkMode() {
  let toggleInput = document.getElementById("toggle__input");
  toggleInput.addEventListener("click", switchStyles);
}

/**
 * Toggle styles when we press the switch button
 */
function switchStyles() {
  const html = document.querySelector("html");
  const toggle = document.getElementById("toggle");

  toggle.classList.toggle("enabled");
  html.classList.toggle("dark-mode");
}

export { switchStyles, toggleDarkMode };