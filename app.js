function adjHtml(a, b) {
  let cardy = `<div class="card" id=${a}><p class="title">${b}</p><div><button class="edit" data-edit="${a}">Edit</button><button class="delete" data-delete="${b}">Delete</button></div></div>`;
  return cardy;
}

function getPosts() {
  return fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector("#grid");
      data.forEach((element) => {
        container.innerHTML += `<div class="card" id=${element.id}><p class="title" id="title" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${element.title}</p><div><button class="btn btn-warning" data-edit="${element.id}">Edit</button><button class="btn btn-danger" data-delete="${element.id}">Delete</button></div></div>`;
      });
      let titles = document.querySelectorAll(".title");
      titles.forEach((element) => {
        element.addEventListener("click", () => {
          let textoTitulo = element.textContent;
          document.getElementById("staticBackdropLabel").innerHTML =
            textoTitulo;
          document.getElementById("modal-body").innerHTML = data.body;
        });
      });
    });
}

getPosts();

function getComments() {
  return fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        //console.log(element.body);
      });
    });
}

function getUsers() {
  return fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        // console.log(element.username);
      });
    });
}
