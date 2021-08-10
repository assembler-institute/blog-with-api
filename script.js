document.addEventListener('DOMContentLoaded', (event) => {
    
    
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())

    .then(data => {
    data.forEach(blog => {
        let template = document.getElementById("card-temp").content;
        template.querySelector("figcaption").textContent = blog.title
        template.querySelector('figure').setAttribute("data-id", blog.id)
        template.querySelector('img').setAttribute("data-id", blog.id)
        template.querySelector('figcaption').setAttribute("data-id", blog.id)
        let clone = document.importNode(template, true);
        document.getElementById("cards-container").appendChild(clone)
        
    })
})
});

// document.getElementById("edit-modal").addEventListener("show.bs.modal", function (event) {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(response => response.json())
//     .then(data => {
//         data.forEach(post => {
            
//             if(post.id === event.target.id){

                
//             document.getElementById("post-title").setAttribute("value",)}
            
//         });
        
        
//     })
// })

document.addEventListener("click", (event)=>{
    if (event.target.matches('[data-bs-toggle="modal"]')){
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
        
                if(post.id === parseInt(event.target.dataset.id) ){
                    document.getElementById("post-title").setAttribute("value", post.title)
                }
            })
        })
    }
})