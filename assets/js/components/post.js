import {appDiv} from '../index.js'
import { data } from './posts.js'

export const getPost = async (idPost) => {
  
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
    <article class="post-article pt-5">
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
    history.back()
  })

}

export const editPost = async (idPost) => {

  let postData;
  
  if (typeof data === 'undefined') {
    postData = await fetch(`http://localhost:3000/posts/${idPost}`).then(res => res.json()).then(data => data)
  } else {
    postData = data.filter(elm => elm.id === idPost)[0]
  }

  let titleInput = document.getElementById('postTitle').value = postData.title
  let bodyInput = document.getElementById('postBody').value = postData.body



  let myModal = new bootstrap.Modal(document.getElementById('modal-edit'), {
    keyboard: true,
    backdrop: false,
    focus: true
  })

  myModal.show()


}