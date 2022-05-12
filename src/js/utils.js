import { getPosts, postList } from "./main.js";
const paginatorNumbers = document.querySelectorAll("[data-type]");
const exampleModal = document.getElementById("exampleModal");

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
  modifyButton.classList.add("btn", "btn-primary", "btn__modify");
  const iconModify = document.createElement("i");
  iconModify.classList.add("bi", "bi-bookmark-check");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger", "btn__delete");
  const iconDelete = document.createElement("i");
  iconDelete.classList.add("bi", "bi-file-x");

  postTitle.textContent = `${id} ${title}`;
  postList.setAttribute("data-id", id);
  postList.setAttribute("data-userId", userId);

  postTitle.setAttribute("data-bs-toggle", "modal");
  postTitle.setAttribute("data-bs-target", "#exampleModal");
  postList.addEventListener("click", openModal);
  postBody.textContent = body;
  deleteButton.setAttribute("data-id", id);
  deleteButton.textContent = "Delete";
  modifyButton.setAttribute("data-id", id);
  modifyButton.textContent = "Modify";
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

const addPaginators = () => {
  Array.from(paginatorNumbers).map((number) => {
    number.addEventListener("click", (e) => {
      e.preventDefault();
      updatePostsDisplay();
      getPosts(
        (e.target.getAttribute("value") - 1) * 10,
        e.target.getAttribute("value") * 10
      );
      console.log(e.target.getAttribute("value"));
    });
  });
};

const openModal = (e) => {
  exampleModal.modal("show");
};

export { createPost, addPaginators, updatePostsDisplay };
