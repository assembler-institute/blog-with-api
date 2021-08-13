import {navBar} from './layouts/header.js'
import {getAllPosts} from './components/posts.js'
import {getPost, editPost} from "./components/post.js"
import * as Router from './components/router.js'
import { initModal, modalHTML } from './layouts/modal.js'
import { searchHandler } from './layouts/search.js'
import { notificationHTML } from './layouts/notification.js'
import { addNewPost } from './components/new-post.js'

export const appDiv = document.getElementById('app')

export const loadPage = (page = 1, type = 'page', postId, oldURL) => {

  if (type === 'page') getAllPosts(page)
  if (type === 'post') getPost(postId, oldURL)
  if (type === 'edit') editPost(postId, oldURL)
  if (type === 'add-new') addNewPost(oldURL)
  
}

const init = () => {
  appDiv.insertAdjacentHTML('afterbegin',`
  
  ${navBar()}
  
  <div id="hero" class="position-relative p-3 p-md-5 bg-light" style="transition: 1s"></div>
  
  ${notificationHTML}

  <div class="container d-flex justify-content-end mb-5">
    <a id="add-new-post" type="button" class="btn btn-dark" href="#add-new">+ Add new</a>
  </div>

  <div id="main-container" class="container"></div>
  ${modalHTML}


`)
  initModal()
  searchHandler()
}

init()
Router.redirect()