/*IMPORTS*/
import loginUser from "./login.js"
import {createComment, editComment, deleteComment} from './api-communication.js'
import {getPosts, createPost, editPost, deletePost} from './api-communication.js'
import {createPostCard} from './post.js'

/*VARIABLES*/
const postsCont = document.getElementById('main__posts')
const commentsCont = document.getElementById('comments')
const usersCont = document.getElementById('users')
const loginBtn = document.getElementById('loginButton')
const saveComment = document.getElementById('editModal__save')
const deleteCommentBtn = document.getElementById('deleteModalBtn');
const createPostButton = document.getElementById('createPostButton');

window.onload = async function (){
    if (!sessionStorage.getItem('userId')){
        defaultUser()
    }
    await displayPosts()
    getUserLoginImg()
}

//Default user
const defaultUser = () => {
    sessionStorage.setItem('username', "pikachu")
    sessionStorage.setItem('userId', 25)
    sessionStorage.setItem('avatarimg', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png")
}

//Load userInfo from sessionStorage
const getUserLoginImg = () =>{
    const userDiv = document.getElementById('dropdownMenuLink')
    const createPostAvatar = document.getElementById('createPostAvatar')
    userDiv.textContent = sessionStorage.getItem('username')
    createPostAvatar.src = sessionStorage.getItem('avatarimg')
}

//Create Post
createPostButton.addEventListener('click', async () => {
    const textPost = document.getElementById('create-post__text').value;
    const response = await createPost(textPost)
    location.reload()
})

//Login
loginBtn.addEventListener('click', () => {
    const userName = document.getElementById('login__Username');
    loginUser(userName.value)
})

//Show post comments
postsCont.addEventListener('click', (e) => {
    if(e.target.hasAttribute('data-show-comments')){
        displayComments(e.target.getAttribute('data-show-comments'), e.target.parentNode)
        e.target.disabled = true
    } 
})

//SaveComment
saveComment.addEventListener('click', async () => {
    let newText = document.getElementById('editModal__text').value
    const saveAttrb = saveComment.getAttribute('data-edit')
    const id = saveComment.getAttribute('data-id')

    if(saveAttrb === 'post'){
        await editPost(id, newText)
    } else if (saveAttrb === 'comment'){
        await editComment(id, newText)
    }

    location.reload()
    newText = ''
})

deleteCommentBtn.addEventListener('click', async ()=> {
    const deleteAttrb = deleteCommentBtn.getAttribute('data-delete')
    const id = deleteCommentBtn.getAttribute('data-id')
    if(deleteAttrb === 'post'){
        await deletePost(id)
    } else if (deleteAttrb === 'comment'){
        await deleteComment(id)
    }
    location.reload()
})

async function displayPosts() {
    const postList = await getPosts()
    postList.map(post => {
        postsCont.append(createPostCard(post))
})
}

const displayComments = async (postId, postContainer) => {
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

                deleteButton.addEventListener('click', ()=>{
                    const deleteComment = document.getElementById('deleteModalBtn')
                    deleteComment.setAttribute('data-delete', "comment");
                    deleteComment.setAttribute('data-id', commentsData.id);
                })

                comment.setAttribute('data-comment-id', commentsData.id)
                comment.setAttribute('data-post-id', commentsData.postId)

                name.classList.add('article__span--username');
                body.classList.add('article__span--comment');
                name.textContent = `@${commentsData.name}`
                body.textContent = commentsData.body

                comment.append(name, body)

                if (commentsData.userId === parseInt(sessionStorage.getItem("userId"))) {
                    comment.append(editButton, deleteButton)
                }

                postContainer.append(comment)
            }

        }))
        .catch(err => console.warn(err))
}