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

    fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => (users = data));

    //--------------------BLOG DATA-----------------------//

    fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((data) => {
            for (i = h; i < j; i++) {
                blogGrid.innerHTML += `<div class="card" id="${data[i].id}" data-id = "${data[i].userId}">
    <img src="./assets/images/bg-img.jfif" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title" id="blog-title-${data[i].id}">${data[i].title}</h5>
        <p class="card-text" id="blog-body-${data[i].id}">
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

//--------------------END PRINT BLOGS-----------------------//

//-------------MODAL-----------//

document.addEventListener("click", (event) => {
    if (event.target.matches(".read-blog")) {
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

//--------------------END MODAL-----------------------//

//--------------------Load Comments-----------------------//

document.addEventListener("click", (event) => {
    let commentSection = `<div class="container-sm" id = "comment__section"></div>`;
    let hideComments = `<button class="btn btn-secondary" id="hide__comments">Hide Comments</button>`;

    if (event.target.matches("#open__comments")) {
        modalContent.insertAdjacentHTML("beforeend", commentSection);
        fetch(
                `http://localhost:3000/posts/${event.target.parentNode.getAttribute(
        "data-id"
      )}/comments`
            )
            .then((response) => response.json())
            .then((data) =>
                data.forEach((comment) => {
                    let everyComment = `<div class="comment">
                    <p> <span class= "bold-it">Name:</span> <span>${comment.name}</span></p>
                    
                    <p><span class= "bold-it">Email:</span> ${comment.email}</span></p>
                    
                    <p><span class= "bold-it">Comment:</span>  <span>${comment.body}</span></p>
                    </div>`;

                    document
                        .getElementById("comment__section")
                        .insertAdjacentHTML("afterbegin", everyComment);
                })
            );

        document.getElementById("open__comments").remove();
        document
            .getElementById("edit-blog")
            .insertAdjacentHTML("beforebegin", hideComments);
    }
});

//--------------------END Load Comments-----------------------//

//--------------------Hide Comments-----------------------//

document.addEventListener("click", (event) => {
    let readButton = `<button type="button" class="btn btn-secondary" id="open__comments">Read Comments</button>`;
    if (event.target.matches("#hide__comments")) {
        document.getElementById("comment__section").remove();

        document.getElementById("hide__comments").remove();

        document
            .getElementById("edit-blog")
            .insertAdjacentHTML("beforebegin", readButton);
    }
});

//--------------------END Hide Comments-----------------------//

//---------------------------------NAV BAR -------------------------------------------//

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
                h = 9;
                j = 18;
                createBlogs();

                document.getElementById("prev-li").classList.remove("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-3":
                blogGrid.innerHTML = "";
                h = 18;
                j = 27;
                createBlogs();
                document.getElementById("prev-li").classList.remove("disabled");
                document.getElementById("next-li").classList.remove("disabled");

                break;

            case "page-previous":
                blogGrid.innerHTML = "";
                h -= 9;
                j -= 9;
                createBlogs();

                document.getElementById("next-li").classList.remove("disabled");

                if (h === 0) {
                    document.getElementById("prev-li").classList.add("disabled");
                }

                //---------------Remove the Number Tiles--------------//

                if (document.getElementById("new-tile") !== null) {
                    document.getElementById("new-tile").remove();
                }
                if ((h + 9) / 9 > 3) {
                    let newTile = `<li class="page-item" id = "new-tile">
                    <button class="page-link" id="page-${(h + 9) / 9}">....  ${
            (h + 9) / 9
          }</button>
                  </li>`;
                    document
                        .getElementById("next-li")
                        .insertAdjacentHTML("beforebegin", newTile);
                }

                break;

            case "page-next":
                document.getElementById("prev-li").classList.remove("disabled");

                blogGrid.innerHTML = "";
                h += 9;
                j += 9;

                if (j > retrieveData.length) {
                    j = retrieveData.length;
                }

                createBlogs();

                if (j > retrieveData.length - 3) {
                    document.getElementById("next-li").classList.add("disabled");
                }

                if (j > 27) {
                    if (document.getElementById("new-tile") !== null) {
                        document.getElementById("new-tile").remove();
                    }
                    let newTile = `<li class="page-item" id = "new-tile">
                    <button class="page-link" id="page-${(h + 9) / 9}">....  ${
            (h + 9) / 9
          }</button>
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

//--------------------END NAV BAR-----------------------//

//--------------------EDIT BLOG-----------------------//

window.addEventListener("click", (event) => {
    if (event.target.matches("#edit-blog")) {
        let title = document.getElementById("modal__title").textContent;
        let body = document.getElementById("modal__body");
        let header = document.getElementById("modal__header");
        let footer = document.getElementById("modal__footer");
        let authorDetails = document.getElementById("author__details");
        let comments = document.getElementById("comment__section");

        header.innerHTML = `<h5>Title:</h5>
        <textarea   cols="60"  style = "resize: none" id="edit__title">${title}
    </textarea>
    <button
    type="button"
    class="btn-close"
    data-bs-dismiss="modal"
    aria-label="Close"
  >`;

        body.innerHTML = `<h5>Blog:</h5> <textarea rows="10" cols="60" id="edit__body">${body.textContent}</textarea > `;
        footer.innerHTML = `<div class="modal-footer"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button><button type="button" data-bs-dismiss="modal" class="btn btn-warning" id="delete-blog">Delete</button>
        <button type="button" class="btn btn-primary" id="save-blog">Save Changes</button>`;

        authorDetails.remove();
        if (comments !== null) {
            comments.remove();
        }
    }
});

//--------------------Save EDITED BLOG-----------------------//

window.addEventListener("click", (event) => {
    if (event.target.matches("#save-blog")) {
        let editedTitle = document.getElementById("edit__title").value;
        let editedBody = document.getElementById("edit__body").value;

        var modalWindow;
        retrieveData.forEach((blog) => {
            users.forEach((user) => {
                if (
                    parseInt(
                        event.target.parentNode.parentNode.getAttribute("data-id")
                    ) === blog.id
                ) {
                    if (blog.userId === user.id) {
                        modalWindow = ` <div class="modal-header" id="modal__header">
                <h5 class="modal-title" id="modal__title">${editedTitle}</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body" id="modal__body">${editedBody}</div>
              <div class="modal-body">
               </div>
               <div class="modal-body" id="author__details">
               <div><span>Author:</span> <span class = "details"> ${user.name}</span></div>
              <div><span>Email:</span> <span class = "details"> ${user.email}</span></div></div>
              <div class="modal-footer" id= "modal__footer" data-id = "${blog.id}"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-secondary" id = "open__comments">Read Comments</button>
              <button type="button" class="btn btn-primary" id="edit-blog">Edit Blog</button>`;
                    }
                }
            });
        });

        //-------Change Text Of the Title of the Card-------//

        document.getElementById(
            `blog-title-${parseInt(
        event.target.parentNode.parentNode.getAttribute("data-id")
      )}`
        ).innerHTML = editedTitle;

        //-------Change Text Of the Body of the Card-------//

        document.getElementById(
            `blog-body-${parseInt(
        event.target.parentNode.parentNode.getAttribute("data-id")
      )}`
        ).innerHTML = editedBody;

        //--------Updated Model Content With Edited Text--------//

        document.getElementById("modal__content").innerHTML = "";
        document
            .getElementById("modal__content")
            .insertAdjacentHTML("afterbegin", modalWindow);

        fetch(
            `http://localhost:3000/posts/${parseInt(
        event.target.parentNode.parentNode.getAttribute("data-id")
      )}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    title: editedTitle,
                    body: editedBody,
                }),
            }
        );
    }
});

//----------------------SAVED AND PATCHED--------------------//

//--------------------SEARCH ANY BLOGS----------------------//

document
    .getElementById("search__blog__button")
    .addEventListener("click", (event) => {
        event.preventDefault();

        retrieveData.forEach((post) => {
            if (post.title.includes(document.getElementById("search__blog").value)) {
                blogGrid.innerHTML = "";

                blogGrid.innerHTML += `<div class="card" id="${post.id}" data-id = "${post.userId}">
              <img src="./assets/images/bg-img.jfif" class="card-img-top" alt="..." />
              <div class="card-body">
                  <h5 class="card-title" id="blog-title-${post.id}">${post.title}</h5>
                  <p class="card-text" id="blog-body-${post.id}">
                     ${post.body}
                  </p>
                  <button class="btn btn-primary read-blog" data-bs-toggle="modal" data-bs-target="#exampleModal">Read Blog</button>
              </div>
              </div>`;
            }
        });
    });

//----------------------END SEARCH FUNCTION-------------//

//-------------------DELETE BLOG----------------------//

document.addEventListener("click", (event) => {
    if (event.target.matches("#delete-blog")) {
        let postNumber = parseInt(event.target.parentNode.parentNode.dataset.id);

        fetch(`http://localhost:3000/posts/${postNumber}`, {
            method: "DELETE",
        });

        document.getElementById(postNumber).remove();
        let newPost = parseInt(blogGrid.lastChild.id);

        let numberArray = [];

        fetch(`http://localhost:3000/posts/`)
            .then((response) => response.json())
            .then((data) => {
                for (p = 0; p < data.length; p++) {
                    if (data[p].id > newPost) {
                        numberArray.push(data[p].id);
                    }
                }

                let newPostId = numberArray[0];
                data.forEach((post) => {
                    if (post.id === newPostId) {
                        blogGrid.innerHTML += `<div class="card" id="${post.id}" data-id = "${post.userId}">
        <img src="./assets/images/bg-img.jfif" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title" id="blog-title-${post.id}">${post.title}</h5>
            <p class="card-text" id="blog-body-${post.id}">
               ${post.body}
            </p>
            <button class="btn btn-primary read-blog" data-bs-toggle="modal" data-bs-target="#exampleModal">Read Blog</button>
        </div>
        </div>`;
                    }
                });
            });
    }
});

//------------------DELETE BLOG END------------------//

//-------------------HOME BUTTON---------------------//

document.getElementById("page-home").addEventListener("click", () => {
    blogGrid.innerHTML = "";
    createBlogs();
});

//-------------------END HOME BUTTON---------------------//