let blogGrid = document.getElementById("blog-grid");
let navbar = document.getElementById("nav-bar");
let modalContent = document.getElementById("modal__content");
var retrieveData;
var users;
var comments;

var h = 0;
var j = 9;

//-------------------------Grid of Blogs-----------------------------//

function createBlogs() {
    //--------------------USER DATA-----------------------//

    fetch("https://jsonplaceholder.typicode.com/users/")
        .then((response) => response.json())
        .then((data) => (users = data));

    //--------------------BLOG DATA-----------------------//

    fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => response.json())
        .then((data) => {
            for (i = h; i < j; i++) {
                blogGrid.innerHTML += `<div class="card" id="${data[i].id}" data-id = "${data[i].userId}">
    <img src="./assets/images/bg-img.jfif" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title" id="blog-title-${i}">${data[i].title}</h5>
        <p class="card-text" id="blog-body-${i}">
           ${data[i].body}
        </p>
        <button class="btn btn-primary read-blog" data-bs-toggle="modal" data-bs-target="#exampleModal">Read Blog</button>
    </div>
    </div>`;
            }
            retrieveData = data;
        });
}

createBlogs();

//-------------MODAL-----------//

document.addEventListener("click", (event) => {
    if (event.target.matches(".read-blog")) {
        //document.getElementById("modal").style.display = "block";

        retrieveData.forEach((blog) => {
            users.forEach((user) => {
                if (
                    parseInt(event.target.parentNode.parentNode.id) === blog.id &&
                    parseInt(
                        event.target.parentNode.parentNode.getAttribute("data-id")
                    ) === user.id
                ) {
                    document.getElementById("modal__content").innerHTML = "";

                    //-----------get individual data from the data array-----------//
                    let modalWindow = ` <div class="modal-header" id="modal__header">
                <h5 class="modal-title" id="modal__title">${blog.title}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" id="modal__body">${blog.body}</div>
              <div class="modal-body">
               </div>
               <div class="modal-body" id="author__details">
               <div><span>Author:</span> <span class = "details"> ${user.name}</span></div>
              <div><span>Email:</span> <span class = "details"> ${user.email}</span></div></div>
              <div class="modal-footer" id= "modal__footer" data-id = "${blog.id}"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" id = "open__comments">Read Comments</button>
              <button type="button" class="btn btn-primary" id="edit-blog">Edit Blog</button>`;

                    document
                        .getElementById("modal__content")
                        .insertAdjacentHTML("afterbegin", modalWindow);
                }
            });
        });
    }
});

//--------------------Load Comments-----------------------//

document.addEventListener("click", (event) => {
    let commentSection = `<div class="container-sm" id = "comment__section"></div>`;

    if (event.target.matches("#open__comments")) {
        modalContent.insertAdjacentHTML("beforeend", commentSection);
        fetch(
                `https://jsonplaceholder.typicode.com/posts/${event.target.parentNode.getAttribute(
        "data-id"
      )}/comments`
            )
            .then((response) => response.json())
            .then((data) =>
                data.forEach((comment) => {
                    let everyComment = `<div class="container-sm">
                <span>Name:</span> <span>${comment.name}</span>
                </div>
                <div class="container-sm">
                <span>Email:</span> <span>${comment.email}</span>
                </div>
                <div class="container-sm">
                <span>Name:</span> <span>${comment.name}</span>
                </div>
                <div class="container-sm">
                <span>Comment:</span> <span>${comment.body}</span>
                </div>`;

                    document
                        .getElementById("comment__section")
                        .insertAdjacentHTML("afterbegin", everyComment);
                })
            );
    }
});

//---------------------------------NEXT PREVIOUS BUTTONS -------------------------------------------//

navbar.addEventListener("click", (event) => {
    if (event.target.matches("button")) {
        switch (event.target.id) {
            case "page-1":
                blogGrid.innerHTML = "";
                h = 0;
                j = 9;
                createBlogs();
                document.getElementById("prev-li").classList.add("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-2":
                blogGrid.innerHTML = "";
                h = 10;
                j = 19;
                createBlogs();

                document.getElementById("prev-li").classList.remove("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-3":
                blogGrid.innerHTML = "";
                h = 20;
                j = 29;
                createBlogs();
                document.getElementById("prev-li").classList.remove("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-previous":
                blogGrid.innerHTML = "";
                h -= 10;
                j -= 10;
                createBlogs();

                document.getElementById("next-li").classList.remove("disabled");

                if (h === 0) {
                    document.getElementById("prev-li").classList.add("disabled");
                }

                //---------------Remove the Number Tiles--------------//

                if (document.getElementById("new-tile") !== null) {
                    document.getElementById("new-tile").remove();
                }
                if ((h + 10) / 10 > 3) {
                    let newTile = `<li class="page-item" id = "new-tile">
                    <button class="page-link" id="page-${
                      (h + 10) / 10
                    }">....  ${(h + 10) / 10}</button>
                  </li>`;
                    document
                        .getElementById("next-li")
                        .insertAdjacentHTML("beforebegin", newTile);
                }

                break;

            case "page-next":
                document.getElementById("prev-li").classList.remove("disabled");

                blogGrid.innerHTML = "";
                h += 10;
                j += 10;
                createBlogs();

                if (j === retrieveData.length - 1) {
                    document.getElementById("next-li").classList.add("disabled");
                }

                if (j > 29) {
                    if (document.getElementById("new-tile") !== null) {
                        document.getElementById("new-tile").remove();
                    }
                    let newTile = `<li class="page-item" id = "new-tile">
                    <button class="page-link" id="page-${
                      (h + 10) / 10
                    }">....  ${(h + 10) / 10}</button>
                  </li>`;
                    document
                        .getElementById("next-li")
                        .insertAdjacentHTML("beforebegin", newTile);
                }

                break;
            default:
                break;
        }
    }
});

//--------------------EDIT BLOG-----------------------//

window.addEventListener("click", (event) => {
    if (event.target.matches("#edit-blog")) {
        let title = document.getElementById("modal__title").textContent;
        let body = document.getElementById("modal__body");
        let header = document.getElementById("modal__header");
        let footer = document.getElementById("modal__footer");
        let authorDetails = document.getElementById("author__details");

        header.innerHTML = `<h5>Title:</h5>
        <textarea   cols="60"  style = "resize: none">${title}
    </textarea>
    <button
    type="button"
    class="btn-close"
    data-bs-dismiss="modal"
    aria-label="Close"
  >`;

        body.innerHTML = `<h5>Blog:</h5> <textarea rows="10" cols="60">${body.textContent}</textarea > `;
        footer.innerHTML = `</button> <div class="modal-footer"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="save-blog">Save Changes</button>`;

        authorDetails.remove();
    }
});