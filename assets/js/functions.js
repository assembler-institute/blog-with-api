const URL = 'http://localhost:3000'
const modal = document.querySelector('[data-open-modal="myModal"]')

function renderPost (start, limit) {
  let cardHTML = ''
  return fetch(`${URL}/posts?_start=${start}&_limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        cardHTML = `
          <div class="col-12 col-sm-6 col-md-4">
            <div class="card h-100">
              <img src="https://picsum.photos/id/${post.id}/600/200" alt="Post image" onerror="this.src='https://picsum.photos/id/1/600/200'" class="card-img-top">
              <div class="card-body d-flex flex-wrap">
                <h5 class="card-title capitalize-text">${post.title}</h5>
                <p class="card-text capitalize-text text-truncate">${post.body}</p>
                <div class="d-flex justify-content-between align-items-center align-self-end w-100">
                  <a
                    href="#"
                    class="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTemplate"
                    data-id="${post.id}"
                    >Read more</a
                  >
                  <div>
                    <button id="editPost" class="btn btn-success icon-pencil" data-edit="${post.id}" data-bs-toggle="modal" data-bs-target="#exampleModal2"></button>
                    <button id="deletePost" class="btn btn-danger icon-bin" data-delete="${post.id}"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      document.getElementById('postFeed').innerHTML += cardHTML
    })
  })
}

document.getElementById('postFeed').addEventListener('click', async (e) => {
  let targetId = e.target.dataset.id
  let targetDelete = e.target.dataset.delete
  let targetEdit = e.target.dataset.edit

  if (targetId) {
    let comments = []
    let post = await fetch(`${URL}/posts/${targetId}`).then(response => response.json())
    let user = await fetch(`${URL}/users/${post.userId}`).then(response => response.json())
    await fetch(`${URL}/comments/`).then(response => response.json()).then(data => {
      data.forEach(comment => {
        if(targetId == comment.postId) {
          comments.push(comment)
        }
      })
    })

    let modalHTML = `
    <div class="modal-header align-items-start">
      <h2 class="modal-title capitalize-text lh-sm" id="modalTitle">${post.title}</h2>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <img src="https://picsum.photos/id/${post.id}/600/200" alt="Post image" onerror="this.src='https://picsum.photos/id/1/600/200'" class="card-img-top">
    <div id="modalBody" class="modal-body">
      <p class="capitalize-text">${post.body}</p>
      <div class="d-flex justify-content-center mx-1 my-2">
        <img src="${user.photo}" alt="Profile picture of ${user.name}" class="w-25 rounded-circle me-4">
        <div class="d-flex flex-column">
          <h3 class="pb-3">Author</h3>
          <p>${user.name}</p>
          <a href="mailto:${user.email}">${user.email}</a>
        </div>
      </div>
      <div class="accordion accordion-flush" id="loadComments">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
          <button id="commentsBtn" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          Show comments
          </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#loadComments">
          <div id="commentsContainer" class="accordion-body"></div>
        </div>
      </div>
    </div>

    `
    document.getElementById('myModal').innerHTML = modalHTML
    document.getElementById('loadComments').addEventListener('click', () => loadComments(comments))
  }

  if (targetDelete) {
    await fetch(`${URL}/posts/${targetDelete}`, {method: 'DELETE'})
      .then(response => response.json())
    let lastId = document.querySelectorAll('[data-id]').length
    document.getElementById('postFeed').innerHTML = ''
    renderPost(0, lastId)
    triggerDeleteToast()
  }

  if(targetEdit) {
    setForm(targetEdit)
  }
})

function loadComments (comments) {
  let button = document.getElementById('commentsBtn')
  if (button.getAttribute('aria-expanded') === "true") {
    button.innerHTML = "Hide comments"
  } else {
    button.innerHTML = "Show comments"
  }
  let commentHTML = ''
  let commentsContainer = document.getElementById('commentsContainer')
  commentsContainer.innerHTML = '<h3 class="py-3">Comments</h3>'
  comments.forEach(comment => {
    commentHTML = `
      <div class="border-bottom mb-3 pb-3">
        <h4 class="capitalize-text">${comment.name}</h4>
        <p class="capitalize-text">${comment.body}</p>
        <p>Contact email: <a href="mailto:${comment.email}">${comment.email}</a></p>
      </div>
    `
    commentsContainer.innerHTML += commentHTML
  })
}

async function setForm(postId) {
  let post = await fetch(`${URL}/posts/${postId}`).then(response => response.json())
  let formHTML = `
    <form id="formEdit">
      <div class="form-group">
        <label for="titleName" class="col-form-label">Title:</label>
        <input type="text" class="form-control capitalize-text" id="titleName" name="titleName" value="${post.title}">
      </div>
      <div class="form-group">
        <label for="bodyName" class="col-form-label">Body:</label>
        <textarea type="text" class="form-control capitalize-text" id="bodyName" name="bodyName" cols="30" rows="10" value="${post.body}">${post.body}</textarea>
      </div>
      <button type="button" id="editPostBtn" class="btn btn-dark mt-3" data-bs-dismiss="modal">Edit</button>
    </form>
  `

  document.getElementById('modalFormBody').innerHTML = formHTML
  document.getElementById('editPostBtn').addEventListener('click', () => editPost(postId))
}

function editPost(id) {
  let titlePost = document.getElementById('titleName').value
  let bodyPost = document.getElementById('bodyName').value

  fetch(`${URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      title: `${titlePost}`,
      body: `${bodyPost}`
    })})
    .then(response => response.json())
    .then(triggerEditToast)
}

async function loadOnScroll() {
  let scrollTop = document.documentElement.scrollTop
  let scrollHeight = document.documentElement.scrollHeight
  let clientHeight = document.documentElement.clientHeight
  
  if (scrollTop + clientHeight >= scrollHeight) {
    let lastId = document.querySelectorAll('[data-id]').length
    let postLength = (await fetch(`${URL}/posts/`).then(response => response.json())).length
      if (lastId < postLength) renderPost(lastId, 6)
  }
}

function triggerEditToast () {
  let toastLive = document.getElementById('liveToast')
  let toast = new bootstrap.Toast(toastLive)
  toast.show()
}

function triggerDeleteToast () {
  let toastLive = document.getElementById('liveToastDelete')
  let toast = new bootstrap.Toast(toastLive)
  toast.show()
}

async function search (e) {
  e.preventDefault();

  let searchValue = document.getElementById('searchValue').value
  window.removeEventListener("scroll", loadOnScroll)
  if(searchValue === '') {
    document.getElementById('postFeed').innerHTML = ''
  } else {
    document.getElementById('postFeed').innerHTML = ''
    await fetch(`${URL}/posts?q=${searchValue}`)
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        cardHTML = `
          <div class="col-12 col-sm-6 col-md-4">
            <div class="card h-100">
              <img src="https://picsum.photos/id/${post.id}/600/200" alt="Post image" onerror="this.src='https://picsum.photos/id/1/600/200'" class="card-img-top">
              <div class="card-body d-flex flex-wrap">
                <h5 class="card-title capitalize-text">${post.title}</h5>
                <p class="card-text capitalize-text text-truncate">${post.body}</p>
                <div class="d-flex justify-content-between align-items-center align-self-end w-100">
                  <a
                    href="#"
                    class="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#modalTemplate"
                    data-id="${post.id}"
                    >Read more</a
                  >
                  <div>
                    <button id="editPost" class="btn btn-success icon-pencil" data-edit="${post.id}" data-bs-toggle="modal" data-bs-target="#exampleModal2"></button>
                    <button id="deletePost" class="btn btn-danger icon-bin" data-delete="${post.id}"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      document.getElementById('postFeed').innerHTML += cardHTML
      })
    })
  }
}

renderPost(0, 9)
window.addEventListener("scroll", loadOnScroll)
document.getElementById('searchButton')
.addEventListener('click', search)