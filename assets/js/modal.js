//listen click to the corresponding image post
document.addEventListener("click", function (e) {
  if (e.target.matches("[data-id]")) getModalPost(e);
});

//verify if the edit button contains data-post
document.addEventListener("click", function (e) {
  if (e.target.matches("[data-post]")) renderEditModal(e);
});

async function renderEditModal(e) {
  const response = await fetch(`http://localhost:3000/posts/${e.target.dataset.post}`);
  const data = await response.json();
  fillEditModal(data);
}

function fillEditModal(post) {
  document.querySelector("#edit-title").value = "";
  document.querySelector("#edit-body").value = "";
  document.querySelector("#edit-title").value = post.title;
  document.querySelector("#edit-body").value = post.body;
}


async function fetchGetPost(post) {
  return await fetch(`http://localhost:3000/posts/${post}`);
}

//get correct post for the modal
function getModalPost(e) {
  fetchGetPost(e.target.dataset.id)
    .then((response) => response.json())
    .then((post) => fillModalContent(post));
}

//add content to the modal
function fillModalContent(post) {
  //fill the modal with the post information
  document.querySelector(".modal-title").textContent = post.title;
  document.querySelector(".modal-body").textContent = post.body;
  //edit post
  document.querySelector("#edit-button").dataset.post = post.id;
  document.querySelector("#edit-button-icon").dataset.post = post.id;
  //confirm edit
  document.querySelector("#confirm-edit").dataset.edit = post.id;
  document.querySelector("#confirm-edit-icon").dataset.edit = post.id;
  //confirm delete
  document.querySelector("#confirm-delete").dataset.delete = post.id;
  document.querySelector("#confirm-delete-icon").dataset.delete = post.id;
  //comments
  document.querySelector("#show-comments").dataset.comments = post.id;
  document.querySelector("#show-comments-icon").dataset.comments = post.id;
  document.querySelector("#comments").classList.remove("show");
  getUser(post);
}

//get the username and email
function getUser(post) {
  fetch(`http://localhost:3000/users/${post.userId}`)
    .then((response) => response.json())
    .then((user) => {
      document.querySelector(".modal-footer__username").innerHTML = `<i class="fas fa-user"></i> <i>${user.username}</i>`;
      document.querySelector(".modal-footer__email").innerHTML = `<i class="fas fa-envelope"></i> <i>${user.email}</i>`;
    });
}
