//API url path
const commentsPath = 'http://localhost:3000/comments'
const postsPath = 'http://localhost:3000/posts'
const usersPath = 'http://localhost:3000/users'

// Comments
async function createComment(body, postId){
    try {
        fetch(`${commentsPath}`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            userId: parseInt(sessionStorage.getItem("userId")),
            id: "",
            postId: postId,
            name: sessionStorage.getItem("username"),
            body: body
        })
    })
    } catch (error) {
        console.error(error)
    }
}

async function editComment(id, edittedBody){
    try{
        fetch(`${commentsPath}/${id}`, {
            method: 'PATCH',
            headers: {"Content-type": "application/json; charset= UTF-8"},
            body: JSON.stringify({body: edittedBody})
        })
    } catch(error) {
        console.error(error)
    }
}

async function deleteComment(id){
    try{
        fetch(`${commentsPath}/${id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset= UTF-8"},
        });
        
    }catch(error){
        console.error(error)
    }
}

//Posts

async function getPost(id){
    try {
        fetch(`${postsPath}/${id}`,{
            method:'GET'
        })
        const post = await response.json()
        return post
    } catch (error) {
        console.error(error)
    }
}

async function getPosts(){
    try {
        const response = await fetch(`${postsPath}`, {
            method: 'GET'
        })
        const posts = await response.json()
        return posts
    } catch (error) {
        console.error(error)
    }
}

async function getPostsCommentsQty (postId){
    try{
        const response = await fetch(`${commentsPath}/?postId=${postId}`, {
            method: 'GET'
        })
        const posts = await response.json()
        return posts.length
    } catch (error) {
        console.error(error)
    }
}

async function createPost(body){
    try {
        fetch(`${postsPath}`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            userId: sessionStorage.getItem("userId"),
            id: "",
            username: sessionStorage.getItem("username"),
            body: body,
            commentsQty: 0
        })
    })
    } catch (error) {
        console.error(error)
    }
}

async function deletePost(id){
    try{
        fetch(`${postsPath}/${id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset= UTF-8"},
        });
        
    }catch(error){
        console.error(error)
    }
}

async function editPost(id, edittedBody){
    try{
        fetch(`${postsPath}/${id}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json; charset= UTF-8"},
        body: JSON.stringify({body: edittedBody})
        })
    } catch(error) {
        console.error(error)
    }
}

//Users
async function getUser(id){
    try{
        const response = await fetch(`${usersPath}/${id}`, {
            method : 'GET'
        })
        const user = await response.json()
        return user
    } catch(error) {
        console.error(error)
    }
}

async function getUserName(name){
    try{
        const response = await fetch(`${usersPath}/?username=${name}`, {
            method : 'GET'
        })
        const user = await response.json()
        return user
    } catch(error) {
        console.error(error)
    }
}

async function getUsers(){
    try{
        const response = await fetch(`${usersPath}`, {
            method : 'GET'
        })
        const users = await response.json()
        return users
    } catch(error) {
        console.error(error)
    }
}

async function postUser(userId, userName, pokemonImg){
    try {
        await fetch(`${usersPath}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                    id: userId,
                    username: `${userName}`,
                    imgSrc: `${pokemonImg}`
            })
        })
    } catch (err) {
        console.error(err)
    }
}

export {createComment, editComment, deleteComment}
export {getPost, getPosts, createPost, editPost, deletePost, getPostsCommentsQty}
export {getUser, getUserName, getUsers, postUser}