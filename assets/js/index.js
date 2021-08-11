import {navBar} from './layouts/header.js'
import {getAllPosts} from './components/posts.js'
import {getPost, editPost} from "./components/post.js"
import * as Router from './components/router.js'

export const appDiv = document.getElementById('app')

export const loadPage = (page = 1, type = 'page', postId) => {

  // Build HTML
  appDiv.querySelectorAll('*').forEach(elm => elm.remove()) 
  appDiv.insertAdjacentHTML('afterbegin',`

    ${navBar()}

    <div id="main-container" class="container">
      <div id="blog" class="row"></div>

      <ul id="pagination" class="pagination"></ul>
    </div>

    <div class="modal fade" id="modal-edit" tabindex="-1" aria-labelledby="modalEdit" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title h4" id="modalEdit">Full screen modal</h5>
            <button type="button" class="btn-close modal-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          
            <form id="form-edit-post">
              
              <div class="mb-3">
                <label for="postTitle" class="form-label">Post title</label>
                <input type="text" class="form-control" id="postTitle">
              </div>
              <div class="mb-3">
                <label for="postBody" class="form-label">Post content</label>
                <textarea class="form-control" id="postBody"></textarea>
              </div>

              <div class="mb-3">
                <label for="postDate" class="form-label">Publish Date</label>
                <input type="datetime-local" class="form-control" id="postDate">
              </div>
    
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-danger">Delete</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary modal-close" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `)

  if (type === 'page') getAllPosts(page)
  if (type === 'post') getPost(postId)
  if (type === 'edit') editPost(postId)
  
  // Add close modal listeners
  document.querySelectorAll('.modal-close').forEach(elm => {
    elm.addEventListener('click', () => history.back())
  })

}

Router.redirect()