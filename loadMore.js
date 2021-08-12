let rowPost = document.querySelector(".row");


btnMore.addEventListener('click', loadMorePosts);

function loadMorePosts() {
    let cloneRow = rowPost.cloneNode(true);
    divCont.appendChild(cloneRow);
    console.log(cloneRow)
    ids();
}

