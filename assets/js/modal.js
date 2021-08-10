//listen click to the corresponding image 
document.addEventListener("click", function (e) {
  if (e.target.matches("[data-id]")) getModalPost(e);
});

//get correct post for the modal
function getModalPost(e) {
  fetch(`http://localhost:3000/posts/${e.target.dataset.id}`)
    .then((response) => response.json())
    .then((post) => fillModalContent(post));
}

//add content to the modal
function fillModalContent(post) {
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
