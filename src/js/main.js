import {printPostTitle} from "./functions.js";

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
        getData();
};

  
  function getData() {
    let url = "http://localhost:3000/";
    let commentsData = "hola";
    let postsData ;
    let usersData = "";
    const fetchedComments = fetch(`${url}comments`);
    const fetchedPosts = fetch(`${url}posts`);
    const  fetchedUsers = fetch(`${url}users`);
  
    fetchedPosts
      .then((response) => response.json())
      .then((data) => {
        postsData = data;
      });
    fetchedComments
      .then((response) => response.json())
      .then((data) => {
        commentsData = data;
      });
      fetchedUsers
      .then((response) => response.json())
      .then((data) => {
        usersData = data;
        return usersData
    });
   console.log(usersData);
     
  }




