function createPost(body){

    try {
        fetch('http://localhost:3000/posts', {
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

export default createPost