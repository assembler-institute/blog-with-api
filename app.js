async function getPosts() {
    let container = document.querySelector("#grid");
    const posts = await axios("http://localhost:3000/posts/");
    let postInfo = posts.data;
    postInfo.forEach((element) => {
        container.innerHTML += `<div class="card" id=${element.id}><p class="title" id="title" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${element.title}</p><div><button class="btn btn-warning" data-edit="${element.id}">Edit</button><button class="btn btn-danger" data-delete="${element.id}">Delete</button></div></div>`;
    });
    let titles = document.querySelectorAll(".title");
    // let paragraphWrapper = document.querySelectorAll(".card");
    let modalBody = document.querySelector("#modal-body");
    titles.forEach((element) => {
        element.addEventListener("click", () => {
            let textoTitulo = element.textContent;
            document.getElementById("staticBackdropLabel").innerHTML = textoTitulo;
        });
    });
    async() => {
        const comments = await axios("http://localhost:3000/comments/");
        let commentsInfo = comments.data;
        for (let j = 0; j < postInfo.length; j++) {
            for (let i = 0; i < commentsInfo.length; i++) {
                if (postInfo[j].id === commentsInfo[i].postId) {
                    modalBody.innerHTML += "Hola";
                }
            }
        }
    };
}
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