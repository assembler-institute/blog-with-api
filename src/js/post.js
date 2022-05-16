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

const postStatusCard = params => {
    const comments = document.createElement('div')
    const commentsCounter = document.createElement('p')
    const commentsBtn = document.createElement('button')

    commentsCounter.textContent = params.commentQty
    
    comments.classList.add('post__comments-status')
    commentsCounter.classList.add('post__comments-counter')
    commentsBtn.classList.add('article__button--showComments')
    commentsBtn.setAttribute('data-show-comments', params.postId)

    comments.append(commentsBtn, commentsCounter)
    
    return comments
}

const modifyCard = params => {
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
        saveComment.setAttribute('data-id', params.postId);
    })
    deleteBtn.addEventListener('click', ()=>{
        const deleteComment = document.getElementById('deleteModalBtn')
        deleteComment.setAttribute('data-delete', "post");
        deleteComment.setAttribute('data-id', params.postId);
    })

    modifyCont.append(editBtn, deleteBtn)

    return modifyCont
}

function createPostCard (params){
    const content = document.createElement('div')
    const header = document.createElement('div')
    const text = document.createElement('p')
    const avatar = avatarCard({src:"./src/img/150.gif", alt:"Mewtwo", name:"Mewtwo"})
    const postDescription = postStatusCard({postId: 1, commentQty: 14})
    const modify = modifyCard({postId: 1})

    text.textContent = "Buenos días amigos míos, he venido aquí para colonizar la tierra"

    // content.setAttribute('data-post-id', params.postId)
    // content.setAttribute('data-user-id', params.userId)
    content.setAttribute('data-post-id', 1)
    content.setAttribute('data-user-id', 1)

    text.classList.add('post__text')
    header.classList.add('post__header')

    header.append(avatar, modify)
    content.append(header,text,postDescription)

    return content
}

export {createPostCard}

