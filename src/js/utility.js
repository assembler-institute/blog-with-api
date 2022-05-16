function createPost(post, users) {

    let cardContainer = document.getElementById("card-container");
    let template = document.getElementById("cardTemplate");
    let cardPost = template.cloneNode(true);
    let cardIMG = document.getElementById("cardIMG");
    let cardTitle = document.getElementById("cardTitle");
    let cardComments = document.getElementById("cardComments");
    let modalButton = document.getElementById("modalButton");
    let editBtn = document.getElementById("editBtn");
    let deleteBtn = document.getElementById("deleteBtn");

    cardIMG.src = `https://picsum.photos/200/300?1random=${post.id}`;
    cardTitle.innerText = post.title;
    cardComments.innerText = users.filter(user => user.id == post.userId)[0].name;
    modalButton.setAttribute("data-bs-postID", post.id);
    editBtn.setAttribute("data-bs-postID", post.id);
    deleteBtn.setAttribute("data-bs-postID", post.id);
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

const handleEdit = (postId, allPosts) => {
    const post = allPosts.find(element => element.id == postId);

    const editTitle = document.getElementById("editTitle");
    const editBody = document.getElementById("editBody");
    const editPostID = document.getElementById("editPostID");

    editTitle.value = post.title;
    editBody.value = post.body;
    editPostID.value = post.id;
}

const handleSubmit = async () => {
    const editPostID = document.getElementById("editPostID");
    const formSubmit = document.getElementById("editForm");
    let title = formSubmit.editTitle.value;
    let body = formSubmit.editBody.value;
    const id = editPostID.value;
    const url = `http://localhost:3000/posts/${id}`;

    const updatePost = {
        "title": title,
        "body": body
    }
    fetch(url, {
        method: "PATCH",
        body: JSON.stringify(updatePost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}

const handleDelete = async (postId, allPosts) => {
    const post = allPosts.find(element => element.id == postId);
    const submitDelete = document.getElementById("submitDelete");
    submitDelete.addEventListener("click", () => {

        console.log(post);
        console.log(post.id);

        const url = `http://localhost:3000/posts/${post.id}`;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    })
}

export {
    createPost,
    handleModal,
    handleComments,
    handleEdit,
    handleSubmit,
    handleDelete
};