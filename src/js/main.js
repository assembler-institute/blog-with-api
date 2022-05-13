/*IMPORTS*/
import loginUser from "./login.js"
import editComment from "./editComment.js"
import editPost from "./editPosts.js"

/*VARIABLES*/
const postsCont = document.getElementById('main__posts')
const commentsCont = document.getElementById('comments')
const usersCont = document.getElementById('users')
const loginBtn = document.getElementById('loginButton')
const saveComment = document.getElementById('editModal__save')

//Login
loginBtn.addEventListener('click', () => {
    const userName = document.getElementById('login__Username');
    const email = document.getElementById('login__Email');
    loginUser(userName.value, email.value)
})

//Show post comments
postsCont.addEventListener('click', (e) => {

    if(e.target.hasAttribute('data-show-comments')){
        displayComments(e.target.getAttribute('data-show-comments'), e.target.parentNode)
        e.target.disabled = true
    }
    // const postId = e.target.parentNode.getAttribute('data-post-id')
    // displayComments(postId, e.target.parentNode)
})

//SaveComment
saveComment.addEventListener('click', ()=> {
    let newText = document.getElementById('editModal__text').value //puede dar problemas
    const saveAttrb = saveComment.getAttribute('data-edit')
    const id = saveComment.getAttribute('data-id')
    if(saveAttrb === 'post'){
        editPost(id, newText)
    } else if (saveAttrb === 'comment'){
        editComment(id, newText)
    }
    location.reload()
    newText = ''
})

//Delete post comments

const displayPosts = () => {
    fetch('http://localhost:3000/posts', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => 
            data.map(postsData => {

                const post = document.createElement('article')
                post.setAttribute('class', 'posts__article')
                const title = document.createElement('span')
                const body = document.createElement('span')
                const userId = document.createElement('span')
                const editButton = document.createElement('button')
                const deleteButton = document.createElement('button')
                const showComments = document.createElement('button')

                title.classList.add('post__title')
                body.classList.add('post__body')

                editButton.textContent = "EDIT"
                deleteButton.textContent = "DELETE"

                editButton.setAttribute('data-bs-toggle', "modal")
                editButton.setAttribute('data-bs-target', "#editModal")

                editButton.addEventListener('click', () => {
                    const saveComment = document.getElementById('editModal__save')
                    saveComment.setAttribute('data-edit', "post");
                    saveComment.setAttribute('data-id', postsData.id);
                })

                showComments.textContent = "SHOW COMMENTS"
                showComments.setAttribute('data-show-comments', postsData.id)

                post.setAttribute('data-post-id', postsData.id)
                post.setAttribute('data-user-id', postsData.userId)
                title.textContent = `Title: ${postsData.title}`
                body.textContent = `Body: ${postsData.body}`
                userId.textContent = `userNameId: ${postsData.userId}`
                post.append(title, body, showComments)

                if (postsData.userId === parseInt(sessionStorage.getItem("userId"))) {
                    post.append(editButton, deleteButton)
                }
                postsCont.append(post)
            }))
        .catch(err => console.warn(err))
}

displayPosts()

const displayComments = (postId, postContainer) => {
    fetch('http://localhost:3000/comments', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => data.map(commentsData => {

            if (parseInt(postId) === commentsData.postId) {
                const comment = document.createElement('article')
                comment.setAttribute('class', 'comments__article')
                const name = document.createElement('span')
                const body = document.createElement('span');
                
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = "DELETE";
                deleteButton.setAttribute('data-delete-comment', commentsData.id)
                
                const editButton = document.createElement('button');
                editButton.textContent = "EDIT";
                editButton.setAttribute('data-edit-comment', commentsData.id)
                editButton.setAttribute('data-bs-toggle', "modal")
                editButton.setAttribute('data-bs-target', "#editModal")

                editButton.addEventListener('click', () => {
                    const saveComment = document.getElementById('editModal__save')
                    saveComment.setAttribute("data-edit", "comment");
                    saveComment.setAttribute('data-id', commentsData.id);
                })

                comment.setAttribute('data-comment-id', commentsData.id)
                comment.setAttribute('data-post-id', commentsData.postId)
                name.textContent = `userName: ${commentsData.name}`
                body.textContent = `Body: ${commentsData.body}`

                comment.append(name, body)

                if (commentsData.userId === parseInt(sessionStorage.getItem("userId"))) {
                    comment.append(editButton, deleteButton)
                }

                postContainer.append(comment)
            }

        }))
        .catch(err => console.warn(err))
}

const displayUsers = () => {
    fetch('http://localhost:3000/users', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => data.map(usersData => {
            `id email name username`
            const users = document.createElement('article')
            const name = document.createElement('span')
            const userName = document.createElement('span')
            const email = document.createElement('span')
        }))
}

// commentsData
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.warn(err))

// usersData
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.warn(err))
