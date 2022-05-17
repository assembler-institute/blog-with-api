import { getComments } from "./main.js";

//modal display in the main content
function openPost() {
  const modalOpen = new bootstrap.Modal(document.getElementById("modal"));
  const commentsBtn = document.getElementById("commentsContentBtn");
  modalOpen.show();
  removeComments();
  commentsBtn.addEventListener("click", loadComments);
}

//show the content of body and title
function showTitleBody(event) {
  const postId = event.target.getAttribute("data-post-id");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalText");
  const postData = fetch("https://jsonplaceholder.typicode.com/posts/");
  try {
    postData
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let obj = data.find((item) => item.id == postId); // whe could make typeof!!
        modalTitle.textContent = obj.title;
        modalBody.textContent = obj.body;
      });
  } catch (error) {
    alert("Error Data");
  }
  setCommentsId(postId);
}

// Show the email and user in post modal
function showUserEmail(event) {
  const userId = event.target.getAttribute("data-user-id");
  const modalUser = document.getElementById("modalUsername");
  const modalEmail = document.getElementById("modalEmail");
  const userData = fetch("https://jsonplaceholder.typicode.com/users");
  try {
    userData
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let obj = data.find((item) => item.id == userId); // whe could make typeof!!
        modalUser.textContent = obj.username;
        modalEmail.textContent = obj.email;
      });
  } catch (error) {
    alert("Error Data");
  }
}
// Gives comments section a data attribute, to match with the id from the comments json data.
function setCommentsId(postId) {
  const commentsContent = document.getElementById("commentsContentBody");
  commentsContent.setAttribute("data-post-id", `${postId}`);
}

// Removes comments before displaying more comments
function removeComments() {
  const commentsBody = document.getElementById("commentsContentBody");
  while (commentsBody.firstElementChild) {
    commentsBody.removeChild(commentsBody.lastElementChild);
  }
}

// Loads comments into the bottom of the modal, adds comments formatting
async function loadComments() {
  const commentsContent = document.getElementById("commentsContentBody");
  const commentsTitle = document.createElement("h4");
  commentsTitle.textContent = "Comments:";
  commentsTitle.classList.add("fw-bold");

  const modalPostId = parseInt(commentsContent.getAttribute("data-post-id")); // read the attribute for which comments
  const commentsData = await getComments();
  const commentsSet = commentsData.filter((comment) => {
    return comment.postId == modalPostId;
  });
  commentsContent.append(commentsTitle);
  commentsSet.map((comment) => {
    const commentName = document.createElement("h5");
    const email = document.createElement("p");
    const body = document.createElement("p");
    commentName.textContent = comment.name;

    email.textContent = comment.email;
    body.textContent = comment.body;
    body.classList.add("border-bottom", "pb-3");

    commentsContent.append(commentName, email, body);
  });
}

//EXPORT
export { openPost, showTitleBody, showUserEmail };
