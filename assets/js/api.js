

function getPost() {
return fetch('http://localhost:3000/posts')
.then(response => response.json())
.then(data => data)
}

// Nos trae los datos de la API y devuelve el usuario con el id que le pasamos
function getUserinfo(userId) {
    return fetch(`http://localhost:3000/users?id=${userId}`)
    .then (response => response.json())
    .then(userdata => userdata )
}

function getComments(postId) {
    return fetch(`http://localhost:3000/comments?postId=${postId}`)
    .then(response => response.json())
    .then(commentsData => commentsData)
}


export { getPost, getUserinfo, getComments };
