import { openPost, showTitleBody, showUserEmail } from "./info-modal.js";

// Fetch posts from api for posts, return as .json data, and pass to displayPosts function.
function getPostData() {
  const fetchPosts = fetch("http://localhost:3000/posts");
  fetchPosts
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayPosts(data);
    });
}

// Loads the blog posts when site is opened.
window.onload = getPostData();

// Shows the blog posts with title and body on the main page
function displayPosts(data) {
  const dataContainer = document.getElementById("postDisplay");

  data.map((post) => {
    const postContainer = document.createElement("div");
    const blogTitle = document.createElement("h3");
    const blogPost = document.createElement("p");

    postContainer.classList.add(
      "post__container",
      "shadow-sm",
      "mx-1",
      "col-3",
      "p-3",
      "mb-5",
      "bg-body",
      "rounded",
      "container-xxl"
    );
    postContainer.setAttribute("data-post-id", `${post.id}`);
    postContainer.setAttribute("data-user-id", `${post.userId}`);
    
    blogTitle.classList.add("post__title", "fw-bolder","font-monospace", "text-sm-start");
    blogTitle.setAttribute("data-post-id", `${post.id}`);
    blogTitle.setAttribute("data-user-id", `${post.userId}`);
    
    blogPost.classList.add("post__blog--post", "font-monospace");
    blogPost.setAttribute("data-post-id", `${post.id}`);
    blogPost.setAttribute("data-user-id", `${post.userId}`);
    blogTitle.textContent = post.title;
    blogPost.textContent = post.body;

    postContainer.append(blogTitle, blogPost);
    dataContainer.append(postContainer);
    postContainer.addEventListener("click", (e) => {
      showTitleBody(e);
      openPost();
      showUserEmail(e);
    });
  });
}
