let title = document.getElementById("staticBackdropLabel");
let body = document.getElementById("modal-body");
let username = document.getElementById("modal-username");
let email = document.getElementById("modal-email");
let comments2 = document.getElementById("modal-comments");

async function getPosts() {
  let container = document.querySelector("#grid");
  const posts = await axios("http://localhost:3000/posts/");
  let postInfo = posts.data;
  postInfo.forEach((element) => {
    container.innerHTML += `<div class="card m-1 text-center"><p class="title m-1 fs-5" id="${element.id}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${element.title}</p><div><button class="btn btn-warning btn-sm edit m-1" data-bs-toggle="modal" data-bs-target="#editing" data-edit="${element.id}">Edit</button><button class="btn btn-sm btn-danger delete m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" data-delete="${element.id}">Delete</button></div></div>`;
  });
  modalDrawer();
  deleteButton();
  editButton();
}

function modalDrawer() {
  let titles = document.querySelectorAll(".title");
  for (let index = 0; index < titles.length; index++) {
    titles[index].addEventListener("click", async (e) => {
      let target = e.target;
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
              if (postInfo[j].userId == usersInfo[h].id) {
                username.textContent = usersInfo[h].username;
                email.textContent = usersInfo[h].email;
                if (postInfo[j].id == commentsInfo[i].postId) {
                  let comment = document.createElement("div");
                  comment.innerHTML = `
<pre><strong>${commentsInfo[i].name}</strong>
${commentsInfo[i].body}
<i>${commentsInfo[i].email}</i></pre>`;
                  comments2.appendChild(comment);
                }
              }
            }
          }
        }
      }
    });
  }
}
getPosts();

let closeModal = document.getElementById("btnClose");
let closeModal2 = document.getElementById("btnClose2");
closeModal.addEventListener("click", () => {
  comments2.innerHTML = "";
});
closeModal2.addEventListener("click", () => {
  comments2.innerHTML = "";
});

function deleteButton() {
  let deleteButon = document.querySelectorAll(".delete");
  let confirmDelete = document.getElementById("confirmDelete");
  for (let i = 0; i < deleteButon.length; i++) {
    deleteButon[i].addEventListener("click", async (e) => {
      let idDelete = e.target.attributes.getNamedItem("data-delete").value;
      confirmDelete.setAttribute("data-delete", idDelete);
    });
  }
  confirmDelete.addEventListener("click", async () => {
    let iddDelete = confirmDelete.attributes.getNamedItem("data-delete").value;
    const resp = await axios.delete(`http://localhost:3000/posts/${iddDelete}`);
  });
}

function editButton() {
  let editButon = document.querySelectorAll(".edit");
  let confirmEdit = document.getElementById("confirmEdit");
  for (let i = 0; i < editButon.length; i++) {
    editButon[i].addEventListener("click", async (e) => {
      let idEdit = e.target.attributes.getNamedItem("data-edit").value;
      confirmEdit.setAttribute("data-edit", idEdit);
    });
  }
  // confirmEdit.addEventListener("click", async(idEdit, newNoteContent) => {
  //     const placeholderT = await axios.get(
  //         `http://localhost:3000/posts/${idEdit}/`
  //     );
  //     let placeholderTitle = placeholderT.title;
  //     console.log(placeholderTitle);
  //     let identEdit = confirmEdit.attributes.getNamedItem("data-delete").value;
  //     let titleInput = document.getElementById("titleInput").value;
  //     let bodyInput = document.getElementById("bodyInput").value;
  //     const updatedNote = {
  //         title: titleInput,
  //         body: bodyInput,
  //     };
  //     const resp = await axios
  //         .patch("http://localhost:3000/posts/$" + identEdit, updatedNote)
  //         .then(console.log("item " + _id + " has been updated"))
  //         .then(this.loadData());
  // });
}
