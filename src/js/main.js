import { fetchPosts } from "./api.js";
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

getPosts(0, 10);
addPaginators();



export { getPosts, postList };
