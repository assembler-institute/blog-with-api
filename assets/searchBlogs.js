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