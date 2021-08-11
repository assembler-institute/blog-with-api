var recievedData;
var idPersona
document.addEventListener('DOMContentLoaded', (event) => {


    fetch("http://localhost:3000/posts")
        .then(response => response.json())

        .then(data => {
        data.forEach(post => {
            let template = document.getElementById("card-temp").content;
            template.querySelector("figcaption").textContent = post.title
            template.querySelector('figure').setAttribute("data-id", post.id)
            template.querySelector('img').setAttribute("data-id", post.id)
            template.querySelector('figcaption').setAttribute("data-id", post.id)
            let clone = document.importNode(template, true);
            document.getElementById("cards-container").appendChild(clone)
        
    })
})
});

document.addEventListener("click", (event)=>{
    if (event.target.matches('[data-bs-toggle="modal"]')){
        fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
        
                if(post.id === parseInt(event.target.dataset.id)){
                    document.getElementById("post-title").innerText= post.title
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
