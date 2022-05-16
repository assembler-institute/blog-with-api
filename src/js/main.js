import { openPost, showTitleBody, showUserEmail } from "./info-modal.js";
import { getSearchResults, displaySearchResults } from "./search.js";

// Variable and listener for searchbar functions
const searchBtn = document.getElementById('headerSearchBtn');
searchBtn.addEventListener('click', function () {
  getSearchResults()
  displaySearchResults();
});

// Fetch posts from api for posts, return as .json data, and pass to displayPosts function.
async function getPostData() {
  try {
    const response = await fetch("http://localhost:3000/posts");
    const postData = response.json();
    return postData;
  } catch(error) {
    console.log(error)
  }
}

// Call function to define data for window onload
async function manageData () {
  const data = await getPostData();
  displayPosts(data)
}

window.onload = manageData;

// Get Comments from json server
async function getComments () {
  try {
    const response = await fetch('http://localhost:3000/comments');
    const commentsData = await response.json();
    return commentsData;
  } catch(error) {
    console.log(error);
  }
}

// Shows the blog posts with title and body on the main page
function displayPosts(data) {
  const dataContainer = document.getElementById("postDisplay");

  data.map((post) => {
    const postContainer = document.createElement("div");
    const blogTitle = document.createElement("h4");
    const blogPost = document.createElement("p");

    postContainer.classList.add(
      "post__container",
      "shadow-sm",
      "mx-1",
      "col-sm-12",
      "col-md-6",
      "col-xxl-3",
      "p-3",
      "mb-5",
      "bg-body",
      "container-xxl"
    );
    postContainer.setAttribute("data-post-id", `${post.id}`);
    postContainer.setAttribute("data-user-id", `${post.userId}`);
    
    blogTitle.classList.add("post__title",);
    blogTitle.setAttribute("data-post-id", `${post.id}`);
    blogTitle.setAttribute("data-user-id", `${post.userId}`);
    
    blogPost.classList.add("post__blog--post", );
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

export { getPostData, getComments, displayPosts };