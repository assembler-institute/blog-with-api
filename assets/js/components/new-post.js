import { Modal } from "../layouts/modal.js"

export const addNewPost = (oldURL) => {
  
  Modal.show()

  document.getElementById('delete-post').classList.add('d-none')

  
    // Add close modal listeners
    document.querySelectorAll('.modal-close').forEach(elm => {
      elm.addEventListener('click', () => {
        document.getElementById('form-edit-post').removeEventListener('submit', submitHandler)
  
        location.hash = oldURL

        document.getElementById('delete-post').classList.remove('d-none')
      })
    })
    
    // Add new listener
    document.getElementById('form-edit-post').addEventListener('submit', submitHandler)
    function submitHandler(event) {
      if (addNewPostHandler(event)) {
        document.getElementById('form-edit-post').removeEventListener('submit', submitHandler)

        location.hash = oldURL
        Modal.hide()

        document.getElementById('delete-post').classList.remove('d-none')

        notification.classList.add('show')
        notification.querySelector('.toast-body').textContent = 'Post created successfully'
        notification.querySelector('.toast-body').classList.add('alert-success')
        setTimeout(() => {
          notification.classList.remove('show')
          notification.querySelector('.toast-body').classList.remove('alert-success')
        }, 3000)
      }
    }
}

const addNewPostHandler = async (event) => {
  event.preventDefault()
  event.target.querySelector('[type="submit"]').innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`

  let postObj = {}

  // Get the Form Data
  let formData = new FormData(event.target)
  for(let pair of formData.entries()) {
    postObj[pair[0]] = pair[1] 
  }

  // Add fake user
  postObj.userId = 1
  
  // Update Post
  let updatePost = await fetch(`http://localhost:3000/posts`, {
    method: 'POST',
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