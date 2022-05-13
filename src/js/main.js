let body = document.getElementById('body');
const fetchData = fetch("http://localhost:3000/posts");
const postsContainer = document.getElementById('postsContainer');
const gridContainer = ["","","",""];
let index = 0;

fetchData
.then(response => response.json())
.then(data => {
    const titleContainer = document.getElementById("data");
    const bodyContainer = document.getElementById('body');
    const title = data[0].title;
    const body = data[0].body;
    titleContainer.append(title);
    bodyContainer.append(body);

})

gridContainer.map(function(row) {
    let postsRow = document.createElement("div");
    postsRow.setAttribute("id","postBox" + index++);
    postsRow.classList.add("col-lg-6");

    postsElement.map(function (){
        let readMoreBtn = document.createElement("button");
        readMoreBtn.classList.add("btn btn-primary");

        postsRow.appendChild(readMoreBtn);
    })

    postsContainer.appendChild(postsRow);
})