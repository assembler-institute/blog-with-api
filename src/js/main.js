import { fetchPosts, fetchUser } from "./api.js";
import { createPost, addPaginators, updatePostsDisplay } from "./utils.js";

const postList = document.getElementById("postList");
const previousPage = document.getElementById("previous-page");
const nextPage = document.getElementById("next-page");

let startNumberPagination = 0;
let endNumberPagination = 0;

.


















const getPosts = (startNumber, endNumber) => {
  startNumberPagination = startNumber;
  endNumberPagination = endNumber;
  fetchPosts().then((data) => {
    // console.log(data);
    data.forEach((post, index) => {
      if (index >= startNumber && index < endNumber) {
        const liElement = createPost(
          post.userId,
          post.id,
          post.title,
          post.body,
          index
        );
        postList.append(liElement);
      }
    });
    addMultiEvents();
  });
};

previousPage.addEventListener("click", (e) => {
  e.preventDefault();
  if (startNumberPagination < 1) return;
  updatePostsDisplay();
  getPosts(startNumberPagination - 10, endNumberPagination - 10);
});

nextPage.addEventListener("click", (e) => {
  e.preventDefault();
  if (startNumberPagination > 90) return;
  updatePostsDisplay();
  getPosts(startNumberPagination + 10, endNumberPagination + 10);
});

function addMultiEvents() {
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modal__post_body");
  const userName = document.getElementById("user_name");
  const userEmail = document.getElementById("user_email");

  Array.from(postList.children).map((post) => {
    const title = post.querySelector("h3");
    title.addEventListener("click", (e) => {
      let user = fetchUser(e.target.getAttribute("data-userId"));
      user.then((data) => {
        userName.textContent = data[0].username;
        userEmail.textContent = data[0].email.toLowerCase();
      });

      modalTitle.textContent = e.target.textContent;
      modalBody.textContent = e.target.nextSibling.textContent;
    });
  });
}

getPosts(0, 10);
addPaginators();

export { getPosts, postList };
