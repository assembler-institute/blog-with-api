let start=0
let limit=9

document.addEventListener('DOMContentLoaded', (event) => {

    fetch(`http://localhost:3000/posts?_start=${start}&_limit=${limit}`)
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


//--------------------------------------edit-----------------------------------------------

function modalEdit(event) {
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
// ------------------------------------PAGING
document.getElementById("next-btn").addEventListener("click", function(){
    if(start<99){
    document.getElementById("cards-container").innerHTML=""
    fetch(`http://localhost:3000/posts?_start=${start+=9}&_limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                createTemplate(post);
            })
        })
    }
})

document.getElementById("prev-btn").addEventListener("click", function(){
    if(start!=0){
    document.getElementById("cards-container").innerHTML=""
    fetch(`http://localhost:3000/posts?_start=${start-=9}&_limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                createTemplate(post);
            })
        })
    }
})

document.addEventListener("click",function(event){
    if(event.target.matches('[data-page]')){
        let page = parseInt(event.target.getAttribute("data-page"))
        start=9*page
        console.log(start)
        document.getElementById("cards-container").innerHTML=""
        fetch(`http://localhost:3000/posts?_start=${start}&_limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                createTemplate(post);
            })
        })
    }
})