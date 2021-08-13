//--------------------SEARCH ANY BLOGS----------------------//

document
    .getElementById("search__blog__button")
    .addEventListener("click", (event) => {
        event.preventDefault();

        printSearchedBlogs();
        checkBlogGrid();
    });

//----------------------END SEARCH FUNCTION-------------//

function printSearchedBlogs() {
    blogGrid.innerHTML = "";

    retrieveData.forEach((post) => {
        if (post.title.includes(document.getElementById("search__blog").value)) {
            blogGrid.innerHTML += `<div class="card" id="${post.id}" data-id = "${
        post.userId
      }">
              <img src="./assets/images/img-0${Math.floor(
                Math.random() * 8
              )}.jfif" class="card-img-top" alt="..." />
              <div class="card-body">
                  <h5 class="card-title" id="blog-title-${post.id}">${
        post.title
      }</h5>
                  <p class="card-text" id="blog-body-${post.id}">
                     ${post.body}
                  </p>
                  <button class="btn btn-primary read-blog" data-bs-toggle="modal" data-bs-target="#exampleModal">Read Blog</button>
              </div>
              </div>`;
        }
    });
}

function checkBlogGrid() {
    if (blogGrid.innerHTML === "") {
        blogGrid.innerHTML =
            "Blog Not Found, Please make sure you typed the title correctly!";
    }
}