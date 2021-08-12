export function modalEdit(event) {
    let userIdEdit = parseInt(event.target.dataset.id)
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                if (post.id === userIdEdit) {
                    document.querySelector("#recipient-title").value = post.title
                    document.querySelector("#message-text").value = post.body
                }
            })
        })
    document.querySelector("#send").addEventListener("click", () => {
        let newBody = document.querySelector("#recipient-title").value
        let newTitle = document.querySelector("#message-text").value
        fetch(
            `http://localhost:3000/posts/${userIdEdit}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({
                    title: newBody,
                    body: newTitle,
                }),
            })
    })
}