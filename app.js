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
                container.appendChild(adjHtml(element.id, element.title));
            });
        });
}

getPosts();

function getComments() {
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