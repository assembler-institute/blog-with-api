let url= 'http://localhost:3000/';

const commentsData = fetch(`${url}comments`);
const postsData = fetch(`${url}posts`);
const usersData = fetch(`${url}users`);

postsData
.then(response => response.json())
.then(data => {
   
});
