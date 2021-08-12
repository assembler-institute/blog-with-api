function loadComments() {
    let commentSection = `<div class="container-sm" id = "comment__section"></div>`;
    let hideComments = `<button class="btn btn-secondary" id="hide__comments">Hide Comments</button>`;

    modalContent.insertAdjacentHTML("beforeend", commentSection);
    fetch(
            `https://jsonplaceholder.typicode.com/posts/${event.target.parentNode.getAttribute(
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