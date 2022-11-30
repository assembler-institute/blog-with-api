function editBlog() {
    let title = document.getElementById("modal__title").textContent;
    let body = document.getElementById("modal__body");
    let header = document.getElementById("modal__header");
    let footer = document.getElementById("modal__footer");
    let authorDetails = document.getElementById("author__details");
    let comments = document.getElementById("comment__section");

    header.innerHTML = `<h5>Title:</h5>
    
<textarea cols="60"   id="edit__title">${title}
</textarea>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">`;

    body.innerHTML = `<h5>Blog:</h5> <textarea rows="10" cols="60" id="edit__body">${body.textContent}</textarea > `;
    footer.innerHTML = `<div class="modal-footer"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button><button type="button" data-bs-dismiss="modal" class="btn btn-warning" id="delete-blog">Delete</button>
    <button type="button" class="btn btn-primary" id="save-blog">Save Changes</button>`;

    authorDetails.remove();

    if (comments !== null) {
        comments.remove();
    }
}