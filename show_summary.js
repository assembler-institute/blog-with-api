export function showSummary(event) {
    let userIdInfo = parseInt(event.target.dataset.id)
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
    document.querySelector("#comments").addEventListener("click", () => {
        fetch(`http://localhost:3000/comments/${userIdInfo}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(post => {
                    document.getElementById("titleComments").innerText = user.username
                    document.getElementById("bodyComments").innerText = user.email
                })
            });
    });
}