import {navBar} from './layouts/header.js'
import {getAllPosts} from './components/posts.js'

export const loadPage = (page = 1) => {

  // Build HTML
  let appDiv = document.getElementById('app')
  appDiv.querySelectorAll('*').forEach(elm => elm.remove()) 
  appDiv.insertAdjacentHTML('afterbegin',`

    ${navBar()}

    <div id="main-container" class="container">
      <div id="blog" class="row"></div>

      <ul id="pagination" class="pagination"></ul>
    </div>
    


  
  `)

  //
  getAllPosts(page)
  
}

loadPage()

window.addEventListener('hashchange', event => {
  let page = parseInt(location.hash.match(/\d*$/)[0])
  loadPage(page) 
})