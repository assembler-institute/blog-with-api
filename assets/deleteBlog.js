function deleteBlog() {
    let postNumber = parseInt(event.target.parentNode.parentNode.dataset.id);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postNumber}`, {
        method: "DELETE",
    });

    document.getElementById(postNumber).remove();
    let newPost = parseInt(blogGrid.lastChild.id);

    let numberArray = [];

    fetch(`https://jsonplaceholder.typicode.com/posts/`)
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
                    blogGrid.innerHTML += `<div class="card" id="${post.id}" data-id = "${
            post.userId
          }">
    <img src="./assets/images/img-0${Math.floor(
      Math.random() * 8
    )}.jfif" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title" id="blog-title-${post.id}">${post.title}</h5>
        <p class="card-text" id="blog-body-${post.id}">
           ${post.body}
        </p>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id = "read-blog">Read Blog</button>
    </div>
    </div>`;
                }
            });
        });
}