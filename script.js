tListener('DOMContentLoaded', (event) => {


    fetch("http://localhost:3000/posts")
        .then(response => response.json())

    .then(data => {
        data.forEach(post => {
            let template = document.getElementById("card-temp").content;
            template.querySelector("figcaption").textContent = post.title
            template.querySelector('figure').setAttribute("data-id", post.id)
            template.querySelector('img').setAttribute("data-id", post.id)
            template.querySelector('figcaption').setAttribute("data-id", post.id)
            template.querySelector('#edit').setAttribute("data-id", post.id)
            let clone = document.importNode(template, true);
            document.getElementById("cards-container").appendChild(clone)

            function prueba1(post) {
                idPrueba = post.id
            }

        })
    })
});

document.addEventListener("click", (event) => {
        if (event.target.matches('[data-bs-target="#summary-modal"]')) {
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
    })
    //--------------------------------------edit-----------------------------------------------



document.addEventListener("click", (event) => {
    if (event.target.matches('[data-bs-target="#edit-modal"]')) {
        fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(data => {
                data.forEach(post => {
                    if (post.id === parseInt(event.target.dataset.id)) {
                        document.querySelector("#recipient-title").value = post.title
                        document.querySelector("#message-text").value = post.body
                    }
                })
            })
    }
})

document.querySelector("#send").addEventListener("click", (event) => {
    let newBody = document.querySelector("#recipient-title").value
    let newTitle = document.querySelector("#message-text").value
    let prueba = document.querySelector("#data-id")
    console.log(prueba)
        //.setAttribute("data-editIndex", parseInt(event.target.dataset.dataId))
    fetch(
        `http://localhost:3000/posts/${dataId}`, {
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