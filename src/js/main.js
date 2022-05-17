let url = "http://localhost:3000/posts";
const postsContainer = document.getElementById('postsContainer');
const comments = fetch(`${url}/comments`);
const posts = fetch(`${url}/posts`);
const users = fetch(`${url}/users`);

const gridContainer = [
    [[""]],[[""]],
    [[""]],[[""]],
    [[""]],[[""]]];

const container = document.getElementById('container');
let index = 0;
let myInput = document.getElementById('myInput');
let myModal = document.getElementById("myModal");
let modalTitle = document.getElementById('modalTitle');
let modalBody = document.getElementById('modalBody');


function getData() {
    posts.then((response) => response.json())
        .then((data) => {
        renderPostTitle(data);
    })
        .catch((error) => console.error(error));
    comments.then((response) => response.json())
        .then((data) => {
        getComments(data);
    })
        .catch((error) => console.error(error));

    users.then((response) => response.json())
        .then((data) => {
        getUsers(data);
    })
        .catch((error) => console.error(error));
}


fetch(url) // Get data from Json server
.then(response => response.json())
.then(data => {
    displayPosts(gridContainer, data);
    modalTitle.textContent = data[index].title;
    modalBody.textContent = data[index].body;
})


function displayPosts(container,data) {
    container.map(function(row) {
        let postsRow = document.createElement("div");
        postsRow.setAttribute("id","postBox");
        postsRow.classList.add("col-lg-6");
    
        row.map(function (content) {
            let postContent = document.createElement("div");
            let imgContainer = document.createElement("img");
            postContent.setAttribute("id","postContent");
            postContent.classList.add("card","mb-4","card-body");
            imgContainer.src =  data[index].img;
            imgContainer.classList.add("card-img-top");
    
            content.map(function () {
                let readMoreBtn = document.createElement("button");
                let titlePost = document.createElement("div")
                let bodyPost = document.createElement("div")
    
                titlePost.setAttribute("id","titlePost");
                titlePost.classList.add("card-title");
                titlePost.textContent = data[index].title;;
    
                bodyPost.setAttribute("id","bodyPost");
                bodyPost.classList.add("card-text");
                bodyPost.textContent = data[index].body;
    
                readMoreBtn.setAttribute("id","myModal");
                readMoreBtn.setAttribute("type","button");
                readMoreBtn.setAttribute("data-bs-toggle","modal");
                readMoreBtn.setAttribute("data-bs-target","#staticBackdrop");
                readMoreBtn.classList.add("btn","btn-primary");
                readMoreBtn.textContent = "Read more →"

                postContent.appendChild(titlePost);
                postContent.appendChild(bodyPost);
                postContent.appendChild(readMoreBtn);
                index++;
            })
    
            postsRow.appendChild(imgContainer);
            postsRow.appendChild(postContent);
        });
    
        postsContainer.appendChild(postsRow);
    })
}