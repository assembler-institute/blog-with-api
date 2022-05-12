let url= 'http://localhost:3000/';

const commentsData = fetch(`${url}comments`);
const postsData = fetch(`${url}posts`);
const usersData = fetch(`${url}users`);

window.onload = () => {
postsData
.then(response => response.json())
.then(data => {
    showTitle(data)  
});
}


function showTitle(postTitle) {
  //   let postTitleContainer = document.getElementById("postTitleContainer");
  console.log(postTitleContainer);

  postTitle.map((post) => {
    let titleContainer = document.createElement("div");
    titleContainer.className = "post__title";
    titleContainer.textContent = post.title;
    postTitleContainer.append(titleContainer);
    // console.log(post);
  });
  //Take userId & postId
}
