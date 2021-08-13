function saveEditedBlog() {
    let editedTitle = document.getElementById("edit__title").value;
    let editedBody = document.getElementById("edit__body").value;

    var modalWindow;
    retrieveData.forEach((blog) => {
        users.forEach((user) => {
            if (
                parseInt(event.target.parentNode.parentNode.getAttribute("data-id")) ===
                blog.id
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
        `https://jsonplaceholder.typicode.com/posts/${parseInt(
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