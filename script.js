document.addEventListener('DOMContentLoaded', (event) => {
    
    
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())

    .then(data => {
    data.forEach(blog => {
        var template = document.getElementById("card-temp").content;
        let clone = document.importNode(template, true);
        
        template.querySelector("figcaption").textContent = blog.title
        
        document.getElementById("cards-container").appendChild(clone)
        })
})
});
