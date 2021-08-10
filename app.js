function adjHtml(a, b) {
    let cardy = `<div class="card" id=${a}><p class="title">${b}</p><div><button class="edit" data-edit="${a}">Edit</button><button class="delete" data-delete="${b}">Delete</button></div></div>`;
    return cardy;
}

function getPosts() {
<<<<<<< HEAD
  return fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector("#grid");
      data.forEach((element) => {
        container.innerHTML += `<div class="card" id=${element.id}><p class="title" id="title" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${element.title}</p><div><button class="edit" data-edit="${element.id}">Edit</button><button class="delete" data-delete="${element.id}">Delete</button></div></div>`;
      });
      let titles = document.querySelectorAll(".title");
      titles.forEach((element) => {
        element.addEventListener("click", () => {
          let textoTitulo = element.textContent;
          document.getElementById("staticBackdropLabel").innerHTML =
            textoTitulo;
          document.getElementById("modal-body").innerHTML = data.body;
=======
    return fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((data) => {
            let container = document.querySelector("#grid");
            data.forEach((element) => {
                container.appendChild(adjHtml(element.id, element.title));
            });
>>>>>>> c90e6d71474d3743d6dfd2cad047d69d7a8276e0
        });
      });
    });
}

getPosts();

function getComments() {
<<<<<<< HEAD
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
=======
    return fetch("http://localhost:3000/comments")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((element) => {
                console.log(element.body);
            });
        });
}

function getUsers() {
    return fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((element) => {
                console.log(element.username);
            });
        });
}
>>>>>>> c90e6d71474d3743d6dfd2cad047d69d7a8276e0
