var start=0
var limit=9

document.addEventListener('DOMContentLoaded', (event) => {

    fetch(`http://localhost:3000/posts?_start=${start}&_limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                createTemplate(post);
            })
        })
});

export function createTemplate(post) {
    let template = document.getElementById("card-temp").content;
    template.querySelector("figcaption").textContent = post.title
    template.querySelector('[data-set="card-cont"]').setAttribute("data-id", post.id)
    template.getElementById("delete").setAttribute("data-delete", post.id)
    template.querySelector('figure').setAttribute("data-id", post.id)
    template.querySelector('img').setAttribute("data-id", post.id)
    template.querySelector('#edit').setAttribute("data-id", post.id)
    template.querySelector('figcaption').setAttribute("data-edit", post.id)
    let clone = document.importNode(template, true);
    document.getElementById("cards-container").appendChild(clone)
}

document.getElementById("next-btn").addEventListener("click", function(){
    if(start < 99){
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
    if(start != 0){
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
        start= page*9
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