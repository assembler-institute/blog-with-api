import {navBar} from './layouts/header.js'
import {getAllPosts} from './components/posts.js'
import {getPost, editPost} from "./components/post.js"
import * as Router from './components/router.js'
import { initModal, modalHTML } from './layouts/modal.js'
import { searchHandler } from './layouts/search.js'

export const appDiv = document.getElementById('app')

export const loadPage = (page = 1, type = 'page', postId, oldURL) => {

  if (type === 'page') getAllPosts(page)
  if (type === 'post') getPost(postId, oldURL)
  if (type === 'edit') editPost(postId, oldURL)
  
}

const init = () => {
  appDiv.insertAdjacentHTML('afterbegin',`
  
  ${navBar()}

  <div id="main-container" class="container"></div>
  ${modalHTML}

`)
  initModal()
  searchHandler()
}

init()
Router.redirect()