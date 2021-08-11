document.addEventListener('DOMContentLoaded', (event) => {


    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                createTemplate(post);
            })
        })
});

document.addEventListener("click", (event) => {
    if (event.target.matches('[data-bs-target="#summary-modal"]')) {
        showSummary(event)
    } else if (event.target.matches('[data-delete]')) {
        deletePost(event)
    } else if (event.target.matches('[data-id]')) {
        modalEdit(event)

    }
})

function createTemplate(post) {
    let template = document.getElementById("card-temp").content;
    template.querySelector("figcaption").textContent = post.title
    template.querySelector('[data-set="card-cont"]').setAttribute("data-id", post.id)
    template.getElementById("delete").setAttribute("data-delete", post.id)
    template.querySelector('figure').setAttribute("data-id", post.id)
    template.querySelector('img').setAttribute("data-id", post.id)
    template.querySelector('#edit').setAttribute("data-id", post.id)
    template.querySelector('figcaption').setAttribute("data-id", post.id)

    let clone = document.importNode(template, true);
    document.getElementById("cards-container").appendChild(clone)
}

function deletePost(event) {
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {

                if (post.id === parseInt(event.target.dataset.delete)) {
                    document.getElementById("sure-btn").setAttribute("data-sure", parseInt(event.target.dataset.delete))

                    document.getElementById("sure-btn").addEventListener("click", function() {
                        fetch(`http://localhost:3000/posts/${post.id}`, {
                                method: 'DELETE'
                            })
                            .then(response => response.json())
                            .then(data => {})
                    })
                }
            })
        })
}

function showSummary(event) {
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {

                if (post.id === parseInt(event.target.dataset.id)) {
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
}

//--------------------------------------edit-----------------------------------------------

function modalEdit(event) {
    let userIdPrueba = parseInt(event.target.dataset.id)
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                if (post.id === userIdPrueba) {
                    document.querySelector("#recipient-title").value = post.title
                    document.querySelector("#message-text").value = post.body
                }
            })
        })
    document.querySelector("#send").addEventListener("click", (event) => {
        let newBody = document.querySelector("#recipient-title").value
        let newTitle = document.querySelector("#message-text").value
        fetch(
            `http://localhost:3000/posts/${userIdPrueba}`, {
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