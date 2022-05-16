function createPost(post, users) {

    let cardContainer = document.getElementById("card-container");
    let template = document.getElementById("cardTemplate");
    let cardPost = template.cloneNode(true);
    let cardIMG = document.getElementById("cardIMG");
    let cardTitle = document.getElementById("cardTitle");
    let cardComments = document.getElementById("cardComments");
    let modalButton = document.getElementById("modalButton");

    cardIMG.src = `https://picsum.photos/200/300?1random=${post.id}`;
    cardTitle.innerText = post.title;
    cardComments.innerText = users.filter(user => user.id == post.userId)[0].name;
    modalButton.setAttribute("data-bs-postID", post.id);
    template.hidden = false;

    cardContainer.appendChild(cardPost);
}

function handleModal(allPosts, postId, users) {
    const modalTemplate = document.getElementById('staticBackdrop')
    const cardModal = modalTemplate.cloneNode(true)
    const modalTitle = document.getElementById('staticBackdropLabel')
    const modalUserName = document.getElementById('modal-user-name')
    const modalUserEmail = document.getElementById('modal-user-email')
    const modalBody = document.getElementById('modal-body');
    const modalUserImg = document.getElementById("userImg");
    cardModal.id = postId;

    allPosts.map(post => {
        if (post.title && post.id == postId) {
            const userByPost = users.filter(user => user.id == post.userId)[0]
            modalTitle.textContent = post.title
            modalUserName.textContent = `A post  by ${userByPost.name}`
            modalUserEmail.textContent = userByPost.email
            modalUserImg.src = `https://randomuser.me/api/portraits/men/${post.userId}.jpg`;
            modalBody.textContent = post.body;
        }
    });
}

const handleComments = (postId, allComments) => {
    const commentWarpperEl = document.getElementById('comments-wrapper')
    const postComments = allComments.filter(comment => comment.postId == postId)
    commentWarpperEl.innerHTML = "";

    postComments.map(comment => {
        const commentCardEl = document.createElement('div')
        commentCardEl.className = 'card card-body mb-3'

        const newCommentId = document.createElement('p')
        newCommentId.textContent = comment.postId
        commentCardEl.appendChild(newCommentId)

        const newCommentEl = document.createElement('p')
        newCommentEl.textContent = comment.body
        commentCardEl.appendChild(newCommentEl)

        const commentUser = document.createElement('p')
        commentUser.className = 'fw-bolder font-italic fs-6 text'
        commentUser.textContent = `Written by ${comment.name}`
        commentCardEl.appendChild(commentUser)

        commentWarpperEl.appendChild(commentCardEl)
    })
}

export {
    createPost,
    handleModal,
    handleComments
};