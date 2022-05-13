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
    cardModal.id = postId;

    allPosts.forEach(post => {
        if (post.title && post.id == postId) {
            const userByPost = users.filter(user => user.id == post.userId)[0].name
            // console.log(userByPost)
            modalTitle.textContent = `A post  by ${userByPost}`
            // console.log(post);
        }
    });

}

export {
    createPost,
    handleModal
};