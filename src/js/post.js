const avatarCard = params => {
    const avatar = document.createElement('div')
    const avatarImage = document.createElement('img')
    const avatarName = document.createElement('p')

    avatar.classList.add('avatar')
    avatarImage.classList.add('avatar__image')
    avatarName.classList.add('avatar__user')
    
    avatarImage.src = `${params.src}`
    avatarImage.alt = `${params.alt}`
    avatarName.textContent = `@${params.name}`

    avatar.append(avatarImage, avatarName)

    return avatar
}

const postStatusCard = (postId, commentQty) => {
    const comments = document.createElement('div')
    const commentsCounter = document.createElement('p')
    const commentsBtn = document.createElement('button')
    const createCommentBtn = document.createElement('p')

    createCommentBtn.setAttribute('data-create-comment', postId)
    createCommentBtn.classList.add('post__comment-create')

    //this next lines are going to be refactored
    createCommentBtn.addEventListener('click', ()=>{
        const idPost = createCommentButton.getAttribute('data-create-comment');
        const textPost = document.getElementById('create-post__text').value;
        createComment(textPost, parseInt(idPost))
        location.reload();
    })
    commentsCounter.textContent = commentQty
    
    comments.classList.add('post__comments-status')
    commentsCounter.classList.add('post__comments-counter')
    commentsBtn.classList.add('article__button--showComments')
    commentsBtn.setAttribute('data-show-comments', postId)

    comments.append(commentsBtn, commentsCounter, createCommentBtn)
    
    return comments
}

const modifyCard = postId => {
    const modifyCont = document.createElement('div')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    modifyCont.classList.add('post__modify-cont')
    editBtn.classList.add('post__edit-btn')
    editBtn.setAttribute('data-bs-toggle', "modal")
    editBtn.setAttribute('data-bs-target', "#editModal")
    deleteBtn.classList.add('post__delete-btn')
    deleteBtn.setAttribute('data-bs-toggle', "modal")
    deleteBtn.setAttribute('data-bs-target', "#deleteModal")
    editBtn.addEventListener('click', () => {
        const saveComment = document.getElementById('editModal__save')
        saveComment.setAttribute('data-edit', "post");
        saveComment.setAttribute('data-id', postId);
    })
    deleteBtn.addEventListener('click', ()=>{
        const deleteComment = document.getElementById('deleteModalBtn')
        deleteComment.setAttribute('data-delete', "post");
        deleteComment.setAttribute('data-id', postId);
    })

    modifyCont.append(editBtn, deleteBtn)

    return modifyCont
}

//params is post information {userId, id, username, body}
function createPostCard (params){
    const content = document.createElement('div')
    const header = document.createElement('div')
    const text = document.createElement('p')
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${params.userId}.png`
    const avatar = avatarCard({src: imgSrc, alt: params.username, name: params.username})
    const postDescription = postStatusCard(params.id, params.commentsQty)
    const modify = modifyCard(params.id)
    const activeUserId = sessionStorage.getItem('userId')

    text.textContent = params.body

    content.setAttribute('data-post-id', params.id)
    content.setAttribute('data-user-id', params.userId)

    text.classList.add('post__text')
    header.classList.add('post__header')

    if (params.userId === activeUserId){
        header.append(avatar, modify)
    } else {
        header.append(avatar)
    }
    
    content.append(header,text,postDescription)

    return content
}

export {createPostCard}

