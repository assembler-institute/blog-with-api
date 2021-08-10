var recievedData;

document.addEventListener('DOMContentLoaded', (event) => {


    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())

    .then(data => {
        let index = 0
        data.forEach(blog => {
            var template = document.getElementById("card-temp").content;
            let clone = document.importNode(template, true);
            document.getElementById("cards-container").appendChild(clone)
            $figcaption = template.querySelector("figcaption")
            $figcaption.textContent = blog.title
            $figcaption.id = `${index}`
            index++

        })
        recievedData = data;
    })
});