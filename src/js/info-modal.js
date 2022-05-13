//modal display in the main content
function openPost() {
  const modalOpen = new bootstrap.Modal(document.getElementById("modal"));
  modalOpen.show();
}
//show the content of body and title
function showTitleBody(event) {
  const postId = event.target.getAttribute("data-post-id");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalText");
  const postData = fetch("http://localhost:3000/posts");

  postData
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let obj = data.find((item) => item.id == postId);// whe could make typeof!!
      modalTitle.textContent = obj.title;
      modalBody.textContent = obj.body;
    });
}
function showUserEmail(event) {
  const userId = event.target.getAttribute("data-user-id");
  const modalUser = document.getElementById("modalUsername");
  const modalEmail = document.getElementById("modalEmail");
  const userData = fetch("http://localhost:3000/users");
  userData
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let obj = data.find((item) => item.id == userId);// whe could make typeof!!
      modalUser.textContent = obj.username;
      modalEmail.textContent = obj.email;
    });
}
//EXPORT
export { openPost, showTitleBody, showUserEmail };
