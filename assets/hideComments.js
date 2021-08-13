function hideComments() {
    let readButton = `<button type="button" class="btn btn-secondary" id="open__comments">Read Comments</button>`;
    document.getElementById("comment__section").remove();

    document.getElementById("hide__comments").remove();

    document
        .getElementById("edit-blog")
        .insertAdjacentHTML("beforebegin", readButton);
}