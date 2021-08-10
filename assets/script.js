let blogGrid = document.getElementById("blog-grid");
let navbar = document.getElementById("nav-bar");
var retrieveData;

var h = 0;
var j = 9;

//-------------------------Grid of Blogs-----------------------------//

function createBlogs() {
    fetch("https://jsonplaceholder.typicode.com/posts/")
        .then((response) => response.json())
        .then((data) => {
            for (i = h; i < j; i++) {
                blogGrid.innerHTML += `<div class="card" id="${data[i].id}">
    <img src="./assets/images/bg-img.jfif" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title" id="blog-title-${i}">${data[i].title}</h5>
        <p class="card-text" id="blog-body-${i}">
           ${data[i].body}
        </p>
        <button class="btn btn-primary read-blog" data-bs-toggle="modal" data-bs-target="#exampleModal">Read Blog</button>
    </div>
    </div>`;

                retrieveData = data;
            }
        });
}

createBlogs();

//-------------MODAL-----------//

document.addEventListener("click", (event) => {
    if (event.target.matches(".read-blog")) {
        //document.getElementById("modal").style.display = "block";

        retrieveData.forEach((blog) => {
            if (parseInt(event.target.parentNode.parentNode.id) === blog.id) {
                //-----------get individual data from the data array-----------//
                document.getElementById("modal__title").innerHTML = blog.title;
                document.getElementById("modal__body").innerHTML = blog.body;
            }
        });
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

// document
//     .getElementById(`page-${(h + 10) / 10}`)
//     .classList.toggle("current-page");