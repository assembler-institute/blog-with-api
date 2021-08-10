let cardy = `<div class="card" id="card"><p class="title" id="title">I am the title</p></div>`;

let btnTest = document.querySelector(".button");

btnTest.addEventListener("click", getPosts);

function getPosts() {
    return fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((data) => {
            let container = document.querySelector("#grid");
            data.forEach((element) => {
                container.innerHTML += `<div class="card" id=${element.id}><p class="title" id="title">${element.title}</p></div>`;
            });
        });
}

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