//listen click to the corresponding image 
document.addEventListener("click", function (e) {
  if (e.target.matches("[data-id]")) getModalPost(e);
});

document.addEventListener("click", function (e) {
  if (e.target.matches("[data-post]")) renderEditModal(e);
});

function fetchGetPost(post){
  return fetch(`http://localhost:3000/posts/${post}`);
}

function renderEditModal(e){
 /*  fetch(`http://localhost:3000/posts/${e.target.dataset.post}`) */
  fetchGetPost(e.target.dataset.post)
    .then((response) => response.json())
    .then((post) => {
      fillEditModal(post);
    });
}

function fillEditModal(post){
  document.querySelector("#edit-title").value = post.title;
  document.querySelector("#edit-body").value = post.body;
  console.log(post)
}

//get correct post for the modal
function getModalPost(e) {
  fetch(`http://localhost:3000/posts/${e.target.dataset.id}`)
    .then((response) => response.json())
    .then((post) => fillModalContent(post));
}

//add content to the modal
function fillModalContent(post) {
  document.querySelector('#edit-button').dataset.post = post.id;
  document.querySelector('#delete-button').dataset.delete = post.id;
  document.querySelector(".modal-title").textContent = post.title;
  document.querySelector(".modal-body").textContent = post.body;
  getUser(post);
}

//get the username and email
function getUser(post) {
  fetch(`http://localhost:3000/users/${post.userId}`)
    .then((response) => response.json())
    .then((user) => {
      document.querySelector(".modal-footer__username").textContent = user.username;
      document.querySelector(".modal-footer__email").textContent = user.email;
    });
}

/* $('#editModal').on('show.bs.modal', function (event) {
  document.querySelector('#edit-title').value = 
  var button = $(event.relatedTarget) 
  var recipient = button.data('whatever') 
  console.log("hola")
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})


 */