import loginUser from "./login.js"

loginUser()

const postsCont = document.getElementById('posts')
const commentsCont = document.getElementById('comments')
const usersCont = document.getElementById('users')

//Show post comments
postsCont.addEventListener('click', (e) => {
    const postId = e.target.parentNode.getAttribute('data-post-id')
    displayComments(postId, e.target.parentNode)
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
                const editButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                editButton.textContent = "EDIT";
                deleteButton.textContent = "DELETE"

                post.setAttribute('data-post-id', postsData.id)
                post.setAttribute('data-user-id', postsData.userId)
                title.textContent = `Title: ${postsData.title}`
                body.textContent = `Body: ${postsData.body}`
                userId.textContent = `userNameId: ${postsData.userId}`
                post.append(title, body)

                if (postsData.userId === parseInt(localStorage.getItem("idUser"))) {
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
                
                const editButton = document.createElement('button');
                const deleteButton = document.createElement('button');

                editButton.textContent = "EDIT";
                deleteButton.textContent = "DELETE";

                comment.setAttribute('data-comment-id', commentsData.id)
                comment.setAttribute('data-post-id', commentsData.postId)
                name.textContent = `userName: ${commentsData.name}`
                body.textContent = `Body: ${commentsData.body}`

                comment.append(name, body)

                if (commentsData.userId === parseInt(localStorage.getItem("idUser"))) {
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