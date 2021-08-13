export function showSummary(event) {
    document.getElementById("insert-comments").classList.add("d-none")
    let userIdInfo = parseInt(event.target.dataset.id)
    document.querySelector("#insert-comments").innerHTML=""
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {

                if (post.id === userIdInfo) {
                    document.getElementById("post-title").innerText = post.title
                    document.getElementById("post-body").innerText = post.body

                    fetch(`http://localhost:3000/users/${post.userId}`)
                        .then(response => response.json())
                        .then(user => {
                            document.getElementById("username").innerText = user.username
                            document.getElementById("email").innerText = user.email
                        })
                }
            })
        })
        fetch(`http://localhost:3000/posts/${userIdInfo}/comments/`)
            .then(response => response.json())
            .then(ArrayObject => {
                ArrayObject.forEach(comment => {
                    let commentBlock = `<span>
                                                <p><strong>${comment.name}</strong></p>
                                                <p>${comment.body}</p>
                                                </span>`
                    document.querySelector("#insert-comments").innerHTML += commentBlock
                })     
    })
}

document.getElementById("comments-button").addEventListener("click", function(){
    document.getElementById("insert-comments").classList.remove("d-none")
})
