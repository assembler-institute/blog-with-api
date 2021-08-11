let title = document.getElementById("staticBackdropLabel");
let body = document.getElementById("modal-body");
let username = document.getElementById("modal-username");
let email = document.getElementById("modal-email");
let comments = document.getElementById("modal-comments");

async function getPosts() {
  let container = document.querySelector("#grid");
  const posts = await axios("http://localhost:3000/posts/");
  let postInfo = posts.data;
  postInfo.forEach((element) => {
    container.innerHTML += `<div class="card"><p class="title" id="${element.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${element.title}</p><div><button class="btn btn-warning" data-edit="${element.id}">Edit</button><button class="btn btn-danger" data-delete="${element.id}">Delete</button></div></div>`;
  });
  let titles = document.querySelectorAll(".title");
  // let paragraphWrapper = document.querySelectorAll(".card");
  for (let index = 0; index < titles.length; index++) {
    titles[index].addEventListener("click", async (e) => {
      let target = e.target;
      console.log(target);
      const comments = await axios("http://localhost:3000/comments/");
      let commentsInfo = comments.data;
      const posts = await axios("http://localhost:3000/posts/");
      let postInfo = posts.data;
      const users = await axios("http://localhost:3000/users/");
      let usersInfo = users.data;
      for (let j = 0; j < postInfo.length; j++) {
        for (let i = 0; i < commentsInfo.length; i++) {
          for (let h = 0; h < usersInfo.length; h++) {
            if (target.id == postInfo[j].id) {
              title.textContent = postInfo[j].title;
              body.textContent = postInfo[j].body;
            }
            if (
              target.id == postInfo[j].id &&
              postInfo[j].userId == usersInfo[h].id
            ) {
              username.textContent = usersInfo[h].username;
              email.textContent = usersInfo[h].email;
            }
            if (
              (target.id == postInfo[j].id && postInfo[j].id) ==
              commentsInfo[i].postId
            ) {
            }
          }
        }
      }
    });
  }
}

async function drawModal(e) {
  const posts = await axios("http://localhost:3000/posts/");
  let postInfo = posts.data;
  let target = e.target;
  let id = target.data - id;
  console.log(id);
  let titles = document.querySelectorAll(".title");
}
// alert(target.textContent);
// document.getElementById("staticBackdropLabel").innerHTML = target.textContent;
// console.log(paragraphWrapper[0].id);
// console.log(modalInfo[0].postId);

getPosts();

async function getComments() {
  let containerComm = document.querySelector("#grid");
  const comments = await axios("http://localhost:3000/posts/");
  let comInfo = comments.data;
  console.log(comInfo);
}

// function getUsers() {
//     return fetch("http://localhost:3000/users")
//         .then((response) => response.json())
//         .then((data) => {
//             data.forEach((element) => {
//                 // console.log(element.username);
//             });
//         });
// }
