import { searchHTML } from "./search.js"

export const navBar = () => {
  return `
  <div class="container mt-5 mb-5">
    <nav class="navbar navbar-light bg-light d-flex justify-content-between px-3">
      <a href="#" class="text-decoration-none"><span class="navbar-brand mb-0 h1">Blog with API</span><a>
      ${searchHTML}
    </nav>
  </div>
  `
}