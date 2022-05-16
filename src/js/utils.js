import { getPosts, postList, commentsUl } from "./main.js";
const paginatorNumbers = document.querySelectorAll("[data-type]");
const previousPage = document.getElementById("previous-page");
const nextPage = document.getElementById("next-page");
let startNumberPagination = 0;
let endNumberPagination = 10;

previousPage.addEventListener("click", (e) => {
  e.preventDefault();
  if (startNumberPagination < 10) return;
  startNumberPagination -= 10;
  endNumberPagination -= 10;
  updatePostsDisplay();
  getPosts(startNumberPagination, endNumberPagination);
});

nextPage.addEventListener("click", (e) => {
  e.preventDefault();
  if (endNumberPagination > 90) return;
  startNumberPagination += 10;
  endNumberPagination += 10;
  updatePostsDisplay();
  getPosts(startNumberPagination, endNumberPagination);
});

const createPost = (userId, id, title, body, index) => {
  const liElement = document.createElement("li");
  liElement.classList.add("article__post");
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("img__avatar");
  const postContainer = document.createElement("div");
  postContainer.classList.add("post__container");
  const postTitle = document.createElement("h3");
  postTitle.classList.add("post__title", "openModal");
  const postBody = document.createElement("p");
  postBody.classList.add("post__body");
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons__container");
  const modifyButton = document.createElement("button");
  modifyButton.classList.add("btn", "btn-secondary", "btn__modify");
  const iconModify = document.createElement("i");
  iconModify.classList.add("bi", "bi-bookmark-check");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-warning", "btn__delete");
  const iconDelete = document.createElement("i");
  iconDelete.classList.add("bi", "bi-file-x");

  postTitle.textContent = `${title}`;
  postTitle.setAttribute("data-id", id);
  postTitle.setAttribute("data-userId", userId);

  postTitle.setAttribute("data-bs-toggle", "modal");
  postTitle.setAttribute("data-bs-target", "#modalWindow");
  modifyButton.setAttribute("data-bs-toggle", "modal");
  postBody.textContent = body;
  deleteButton.setAttribute("data-id", id);
  deleteButton.setAttribute("data-bs-toggle", "modal");
  deleteButton.setAttribute("data-bs-target", "#modalDelete");

  deleteButton.textContent = "Delete";
  modifyButton.setAttribute("data-id", id);
  modifyButton.setAttribute("data-bs-target", "#modalModify");
  modifyButton.setAttribute("data-modify", true);
  modifyButton.textContent = "Modify";
  deleteButton.setAttribute("data-delete", true);

  avatarImg.src = `https://source.unsplash.com/16${index}x9${index}/?profile picture?orientation=portrait`;

  deleteButton.append(iconDelete);
  modifyButton.append(iconModify);
  buttonsContainer.append(modifyButton, deleteButton);
  postContainer.append(postTitle, postBody, buttonsContainer);
  liElement.append(avatarImg, postContainer);

  return liElement;
};

const updatePostsDisplay = () => {
  while (postList.firstChild) {
    postList.removeChild(postList.lastChild);
  }
};

const updateDisplay = () => {
  while (commentsUl.firstChild) {
    commentsUl.removeChild(commentsUl.lastChild);
  }
};

const addPaginators = () => {
  Array.from(paginatorNumbers).map((number) => {
    number.addEventListener("click", (e) => {
      e.preventDefault();
      updatePostsDisplay();
      startNumberPagination = (e.target.getAttribute("value") - 1) * 10;
      endNumberPagination = e.target.getAttribute("value") * 10;
      getPosts(
        (e.target.getAttribute("value") - 1) * 10,
        e.target.getAttribute("value") * 10
      );
    });
  });
};

export {
  createPost,
  addPaginators,
  updatePostsDisplay,
  updateDisplay,
  startNumberPagination,
  endNumberPagination,
};
