function createComment(body, postId){
    try {
        fetch(`http://localhost:3000/comments`, {
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

export default createComment