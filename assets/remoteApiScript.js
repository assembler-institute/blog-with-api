let blogGrid = document.getElementById("blog-grid");
let navbar = document.getElementById("nav-bar");
let modalContent = document.getElementById("modal__content");
var retrieveData;
var users;
var comments;

var h = 0;
var j = 9;

//-------------------------PRINT BLOGS-----------------------------//

function createBlogs() {
    //--------------------USER DATA-----------------------//

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => (users = data));

    //--------------------BLOG DATA-----------------------//

    fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => response.json())
        .then((data) => {
            for (i = h; i < j; i++) {
                blogGrid.innerHTML += `<div class="card" id="${
          data[i].id
        }" data-id = "${data[i].userId}">
    <img src="./assets/images/img-0${Math.floor(
      Math.random() * 8
    )}.jfif" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title" id="blog-title-${data[i].id}">${
          data[i].title
        }</h5>
        <p class="card-text" id="blog-body-${data[i].id}">
           ${data[i].body}
        </p>
        <button class="btn btn-primary" id="read-blog" data-bs-toggle="modal" data-bs-target="#exampleModal">Read Blog</button>
    </div>
    </div>`;
            }
            retrieveData = data;
        });
}

createBlogs();

//--------------------END PRINT BLOGS-----------------------//

document.addEventListener("click", (event) => {
    switch (event.target.id) {
        //-----------------------SHOW MODAL------------------------//
        case "read-blog":
            showModal(event);
            break;

            //--------------------Load Comments-----------------------//
        case "open__comments":
            loadComments(event);
            break;
            //--------------------Hide Comments-----------------------//
        case "hide__comments":
            hideComments();
            break;
            //--------------------EDIT BLOG-----------------------//

        case "edit-blog":
            editBlog();

            break;
            //--------------------Save and Patch EDITED BLOG-----------------------//
        case "save-blog":
            saveEditedBlog();
            break;

            //-----------------------DELETE BLOG-------------------------//

        case "delete-blog":
            deleteBlog(event);

            break;

        default:
            break;
    }
});