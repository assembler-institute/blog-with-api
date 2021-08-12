import { Modal } from '../layouts/modal.js'
import { data } from './posts.js'

export const getPost = async (idPost, oldURL) => {
  
  let data = await fetch(`http://localhost:3000/posts/${idPost}?_embed=comments`).then(res => res.json()).then(data => data)

  let container = document.getElementById('main-container')
  container.querySelectorAll('*').forEach(elm => elm.remove())

  let commentList = ''
  data.comments.forEach(elm => {
    commentList += `
      <li class="list-group-item">
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">${elm.name}</h4>
          <p>${elm.email}</p>
          <p class="mb-0">${elm.body}</p>
        </div>
      </li>
    `
  })

  let postViewHTML = `
    <article class="post-article">
      <a id="article-back" href="#"><< Back</a>
      <h1>${data.title}</h1>
      <p>${data.body}</p>
      <section class="article-comments pt-5">
        <ul class="list-group">
        ${commentList}
        </ul> 
      </section>
    </article>
  `
  container.insertAdjacentHTML('afterbegin',postViewHTML)

  document.getElementById('article-back').addEventListener('click', e => {
    e.preventDefault()
    location.hash = oldURL
  })

}

export const editPost = async (idPost, oldURL) => {
  
  let postData;
  if (typeof data === 'undefined') {
    postData = await fetch(`http://localhost:3000/posts/${idPost}`).then(res => res.json()).then(data => data)
  } else {
    postData = data.filter(elm => elm.id === idPost)[0]
  }

  // Set Post values into form
  document.getElementById('postTitle').value = postData.title
  document.getElementById('postBody').value = postData.body
  document.getElementById('postDate').valueAsDate = new Date();

  Modal.show()

  // Add close modal listeners
  document.querySelectorAll('.modal-close').forEach(elm => {
    elm.addEventListener('click', () => {
      document.getElementById('form-edit-post').removeEventListener('submit', submitHandler)
      location.hash = oldURL
    })
  })
  
  // Edit listener
  document.getElementById('form-edit-post').addEventListener('submit', submitHandler)
  function submitHandler() {
    if (updatePost(event, idPost)) {
      document.getElementById('form-edit-post').removeEventListener('submit', submitHandler)
      Modal.hide()
      location.hash = oldURL
    }
    
  }

  // Delete post
  document.getElementById('delete-post').addEventListener('click', deleteHandler)
  function deleteHandler() {
    if (deletePost(idPost)) {
      document.getElementById('delete-post').removeEventListener('click', deleteHandler)
      Modal.hide()
      location.hash = oldURL
    }
  }


  
}

const deletePost = async (idPost) => {

  if (!window.confirm("Do you really want to delete the post?")) {
    return false
  }

  let deletePost = await fetch(`http://localhost:3000/posts/${idPost}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res).catch(err => err)
  
  if (deletePost.ok) return true
}

const updatePost = async (event, idPost) => {

  event.preventDefault()
  event.target.querySelector('[type="submit"]').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

  let postObj = {}

  // Get the Form Data
  let formData = new FormData(event.target)
  for(let pair of formData.entries()) {
    postObj[pair[0]] = pair[1] 
  }

  // Update Post
  let updatePost = await fetch(`http://localhost:3000/posts/${idPost}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(postObj)
  })
  .then(res => res)
  .catch(err => err)

  event.target.querySelector('[type="submit"]').innerHTML = `Save`

  if (updatePost.ok) {
    return true
  } else {
    alert(`Error ${updatePost.statusText} - ${updatePost.status}`)
    return false
  }

}
