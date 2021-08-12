document.addEventListener("click", function (e) {
  if ((e.target.matches("[data-edit]")) || (e.target.matches("[data-edit] *"))) editPost(e.target.dataset.edit);
});

function editPost(post) {
  let title = document.querySelector("#edit-title").value;
  let body = document.querySelector("#edit-body").value;

  fetch(`http://localhost:3000/posts/${post}`, {
    method: "PATCH",
    body: JSON.stringify({ title: title, body: body }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then(() => {
      location.reload();
    })
    .catch((err) => console.log(err)); 
}

function parentElements(elem){
  console.log(elem);
}