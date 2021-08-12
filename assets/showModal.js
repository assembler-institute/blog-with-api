function showModal() {
    retrieveData.forEach((blog) => {
        users.forEach((user) => {
            if (
                parseInt(event.target.parentNode.parentNode.id) === blog.id &&
                parseInt(event.target.parentNode.parentNode.getAttribute("data-id")) ===
                user.id
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