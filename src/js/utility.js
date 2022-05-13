function createPost(post) {

    let cardContainer = document.getElementById("card-container");
    let template = document.getElementById("cardTemplate");
    let cardPost = template.cloneNode(true);
    let cardIMG = document.getElementById("cardIMG");
    let cardTitle = document.getElementById("cardTitle");
    let cardText = document.getElementById("cardText");
    let cardComments = document.getElementById("cardComments");
    let modalButton = document.getElementById("modalButton");

    // let modalOpenBtn = document.querySelector("[data-bs-target]")
    // modalOpenBtn.setAttribute('data-bs-target', `#staticBackdrop${post.id}`)
    // console.log(modalOpenBtn)
    cardIMG.src = `https://picsum.photos/200/300?random=${post.id}`;
    cardTitle.innerText = post.title;
    cardText.innerText = post.body;
    cardComments.innerText = post.id;
    modalButton.setAttribute("data-bs-postID", post.id);
    template.hidden = false;

    cardContainer.appendChild(cardPost);
}

function handleModal(allPosts, postId, users) {
    const modalTemplate = document.getElementById('staticBackdrop')
    const cardModal = modalTemplate.cloneNode(true)
    const modalTitle = document.getElementById('staticBackdropLabel')
    const modalUser = document.getElementById('modal-user')
    const modalBody = document.getElementById('modal-body');
    const modalUserImg = document.getElementById("userImg");
    cardModal.id = postId;

    allPosts.forEach(post => {
        if (post.title && post.id == postId) {
            const userByPost = users.filter(user => user.id == post.userId)[0].name
            modalTitle.textContent = post.title
            modalUser.textContent = `By ${userByPost}`
            modalUserImg.src =`https://randomuser.me/api/portraits/men/${post.userId}.jpg`;
            modalBody.textContent = post.body;
        }
    });

}

const handleComments = (allPosts, postId, allComments) => {
    const commentWarpperEl = document.getElementById('comments-wrapper')
    const postComments = allComments.filter(comment => comment.postId == postId)

    postComments.map(comment => {
        console.log(comment)
        const commentCardEl = document.createElement('div')
        commentCardEl.className = 'card card-body mb-3'

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