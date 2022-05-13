const fetchData = fetch("http://localhost:3000/posts");
const postsContainer = document.getElementById('postsContainer');

const gridContainer = [
    [[""]],[[""]],
    [[""]],[[""]]];

let index = 0;

fetchData
.then(response => response.json())
.then(data => {
    const titleContainer = document.getElementById("data");
    const bodyContainer = document.getElementById('body');
    const title = data[1].title;
    const body = data[1].body;

    titleContainer.append(title);
    bodyContainer.append(body);



gridContainer.map(function(row) {
    let postsRow = document.createElement("div");
    postsRow.setAttribute("id","postBox");
    postsRow.classList.add("col-lg-6","mb-4");

    row.map(function () {
        let readMoreBtn = document.createElement("button");
        let titlePost = document.createElement("div")
        let bodyPost = document.createElement("div")

        titlePost.setAttribute("id","titlePost");
        titlePost.classList.add("card-title");
        titlePost.textContent = title;

        bodyPost.setAttribute("id","bodyPost");
        bodyPost.classList.add("card-text");
        bodyPost.textContent = body;

        readMoreBtn.classList.add("btn","btn-primary");
        readMoreBtn.textContent = "read more"

        postsRow.appendChild(titlePost);
        postsRow.appendChild(bodyPost);
        postsRow.appendChild(readMoreBtn);
    })

    postsContainer.appendChild(postsRow);
})

})