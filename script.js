document.addEventListener('DOMContentLoaded', (event) => {

    for (i = 0; i < 10; i++) {

        var template = document.getElementById("card-temp").content;
        let clone = document.importNode(template, true);

        document.getElementById("cards-container").appendChild(clone)

    }
});
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())

.then(data => {
    data.forEach(blog => {
        let p = document.createElement("p")
        p.textContent = blog.title
        console.log(p);
        let items = document.querySelector("#titleBlog")
    });
})