document.addEventListener("click", function (e) {
  if (e.target.matches("[data-comments]")) showComments(e.target.dataset.comments);
});

function showComments(post) {
  fetch(`http://localhost:3000/posts/${post}/comments/`)
    .then((response) => response.json())
    .then((comments) => {renderComments(comments)})
    .catch((err) => console.log(err));
}

function renderComments(comments) {
  let contentDom = document.getElementById("comments");
  contentDom.innerHTML = '<h3 class="text-center">Comments</h3>';
  comments.forEach((comment) => {
    contentDom.innerHTML += `<div class="card card-body">
    <span><b>${comment.name}</b></span>
    <span>${comment.body}</span>
    <span>${comment.email}</span>
  </div>`;
  });
}