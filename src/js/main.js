/*IMPORTS*/
import loginUser from "./login.js"
import {createComment, editComment, deleteComments_Post} from './api-communication.js'
import {getPosts, createPost, editPost, deletePost_Comments} from './api-communication.js'
import {getUser, getUsers} from './api-communication.js'
import {createPostCard} from './post.js'

/*VARIABLES*/
const postsCont = document.getElementById('main__posts')
const commentsCont = document.getElementById('comments')
const usersCont = document.getElementById('users')
const loginBtn = document.getElementById('loginButton')
const saveComment = document.getElementById('editModal__save')
const deleteComment = document.getElementById('deleteModalBtn');
const createPostButton = document.getElementById('createPostButton');

window.onload = function (){
    displayPosts()
}

//Create Post
createPostButton.addEventListener('click', ()=>{
    const textPost = document.getElementById('create-post__text').value;
    createPost(textPost)
})

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

deleteComment.addEventListener('click', ()=> {
    const deleteAttrb = deleteComment.getAttribute('data-delete')
    const id = deleteComment.getAttribute('data-id')
    if(deleteAttrb === 'post'){
        deletePost_Comments(id)
    } else if (deleteAttrb === 'comment'){
        deleteComment_Post(id)
    }
    location.reload()
})

async function displayPosts() {
    const postList = await getPosts()
    postList.map(post => postsCont.append(createPostCard(post)))
}

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