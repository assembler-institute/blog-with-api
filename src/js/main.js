let url = "http://localhost:3000/";

const commentsData = fetch(`${url}comments`);
const postsData = fetch(`${url}posts`);
const usersData = fetch(`${url}users`);

window.onload = () => {
  postsData
    .then((response) => response.json())
    .then((data) => {
      printPostTitle(data);
    });
};

function printPostTitle(postTitle) {
  //Get the container from html
  const postsTitlesContainer = document.getElementById("postsTitlesContainer");
  //Create a list for the titles & append it to the container
  const listContainer = document.createElement("ul");
  listContainer.className = "blog__postTitle--listContainer";
  postsTitlesContainer.append(listContainer);
  //Iterate each post in posts.json
  postTitle.map((post) => {
    let titleContainer = document.createElement("li");
    titleContainer.className = "post__title";
    titleContainer.textContent = post.title;
    titleContainer.id = post.id;
    titleContainer.dataset.user = post.userId;
    listContainer.append(titleContainer);
  });
 getUserId();
}
function getUserId(){
    let title = document.querySelectorAll("[data-user]");
    console.log(title);
    title.addEventListener("click", (e) => {
        console.log(e.target);

    });
}

