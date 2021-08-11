const URL = 'http://localhost:3000'
const modal = document.querySelector('[data-open-modal="myModal"]')

function renderPost () {
  let cardHTML = ''
  return fetch(`${URL}/posts`)
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        cardHTML = `
          <div class="card col-4">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
              <a
                href="#"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalTemplate"
                data-id="${post.id}"
                >Go somewhere</a
              >
              <button id="editPost">Edit</button>
              <button id="deletePost" data-delete="${post.id}">Delete</button>
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
    <div class="modal-header">
      <h2 class="modal-title" id="modalTitle">${post.title}</h2>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div id="modalBody" class="modal-body">
      <p>${post.body}</p>
      <h3>user</h3>
      <p>${user.name}</p>
      <a href="mailto:${user.email}">${user.email}</a>
      <div id="commentsContainer">
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" id="loadComments" class="btn btn-primary">
        Load comments
      </button>
    </div>
    `
    document.getElementById('myModal').innerHTML = modalHTML
    document.getElementById('loadComments').addEventListener('click', () => loadComments(comments))
  }
  if (targetDelete) {
    await fetch(`${URL}/posts/${targetDelete}`, {method: 'DELETE'})
      .then(response => response.json())
      renderPost()
  }

})

function loadComments (comments) {
  let commentHTML = ''
  let commentsContainer = document.getElementById('commentsContainer')
  commentsContainer.innerHTML = '<h3>comments</h3>'
  comments.forEach(comment => {
    commentHTML = `
      <p style="color: red">${comment.name}</p>
      <p style="color: blue">${comment.body}</p>
      <p style="color: pink">${comment.email}</p>
    `
    commentsContainer.innerHTML += commentHTML
  })
}

renderPost()
