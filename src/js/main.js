const fetchData = fetch("http://localhost:3000/posts");
const postsContainer = document.getElementById('postsContainer');


const gridContainer = [
    [[""]],[[""]],
    [[""]],[[""]],
    [[""]],[[""]]];

let index = 0;

fetchData // Get data from Json server
.then(response => response.json())
.then(data => {
    displayPosts(gridContainer, data); 

})

function displayPosts(container,data) {
    let index = 0;
    container.map(function(row) {
        let postsRow = document.createElement("div");
        postsRow.setAttribute("id","postBox");
        postsRow.classList.add("col-lg-6");
    
        row.map(function (content) {
            let postContent = document.createElement("div");
            let imgContainer = document.createElement("img");
            postContent.setAttribute("id","postContent");
            postContent.classList.add("card","mb-4","card-body");
            imgContainer.src =  data[index].img;
            imgContainer.classList.add("card-img-top");
    
    
            content.map(function () {
                let readMoreBtn = document.createElement("button");
                let titlePost = document.createElement("div")
                let bodyPost = document.createElement("div")
    
                titlePost.setAttribute("id","titlePost");
                titlePost.classList.add("card-title");
                titlePost.textContent = data[index].title;
    
                bodyPost.setAttribute("id","bodyPost");
                bodyPost.classList.add("card-text");
                bodyPost.textContent = data[index].body;
    
                readMoreBtn.classList.add("btn","btn-primary");
                readMoreBtn.textContent = "Read more →"
    
                postContent.appendChild(titlePost);
                postContent.appendChild(bodyPost);
                postContent.appendChild(readMoreBtn);
                index++;
            })
    
            postsRow.appendChild(imgContainer);
            postsRow.appendChild(postContent);
        });
    
    
        postsContainer.appendChild(postsRow);
    })
}


