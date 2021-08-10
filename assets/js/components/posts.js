import { getButtonsPagination } from './pagination.js'
import { loadPage } from '../index.js'

export const getAllPosts = async (page = 1, limit = 9) => {

  let allPostHTML = ''
  let buttons = ''

  let data = await fetch(`http://localhost:3000/posts?_page=${page}&_limit=${limit}`,{
    method: 'GET'
  })
  .then(res => {
    buttons = getButtonsPagination(res, page)
    return res.json()
  })
  .then(data => data)
  .catch(err => err)

  
  if (data.length > 0) {

    data.forEach(post => {
      allPostHTML += `
        <div class="post col-md-4" data-id="${post.id}">
          <span class="h5">${post.title}</span>
          <p>${post.body}</p>
        </div>
      `
    })

    // Print the posts
    document.getElementById('blog').insertAdjacentHTML('afterbegin', allPostHTML)
    // Print pagination
    document.getElementById('pagination').insertAdjacentHTML('beforeend', buttons)
    // Listener
    document.querySelectorAll('#next, #prev').forEach(elm => elm.addEventListener('click', event => {
      loadPage(parseInt(event.target.getAttribute('data-page')))
    }))
    
  }
}

