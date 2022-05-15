//API url path
const comments = 'http://localhost:3000/comments'
const posts = 'http://localhost:3000/posts'
const users = 'http://localhost:3000/users'

// Comments
function createComment(body, postId){
    try {
        fetch(`${comments}`, {
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

function editComment(id, edittedBody){
    try{
        fetch(`${comments}/${id}`, {
            method: 'PATCH',
            headers: {"Content-type": "application/json; charset= UTF-8"},
            body: JSON.stringify({body: edittedBody})
        })
    } catch(error) {
        console.error(error)
    }
}

function deleteComments_Post(id){
    try{
        fetch(`${commentsUrl}/${id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset= UTF-8"},
        });
        
    }catch(error){
        console.error(error)
    }
}
//Posts
function createPost(body){
    try {
        fetch(`${posts}`, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            userId: sessionStorage.getItem("userId"),
            id: "",
            username: sessionStorage.getItem("username"),
            body: body
        })
    })
    } catch (error) {
        console.error(error)
    }
}

function deletePost_Comments(id){
    try{
        fetch(`${posts}/${id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset= UTF-8"},
        });
        
    }catch(error){
        console.error(error)
    }
}


function editPost(id, edittedBody){
    try{
        fetch(`${posts}/${id}`, {
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
        const response = await fetch(`${url}/${id}`, {
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
        const response = await fetch(`${users}`, {
            method : 'GET'
        })
        const users = await response.json()
        return users
    } catch(error) {
        console.error(error)
    }
}

export {createComment, editComment, deleteComments_Post}
export {createPost, editPost, deletePost_Comments}
export {getUser, getUsers}