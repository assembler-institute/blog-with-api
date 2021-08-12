document.addEventListener("click", function (e) {
  if ((e.target.matches("[data-delete]")) || (e.target.matches("[data-delete] *"))) deletePost(e.target.dataset.delete);
});


function deletePost(post){
  fetch(`http://localhost:3000/posts/${post}`,{
    method: 'DELETE'
  })
    .then((response) => response.json())
    .then(() => location.reload());
}