const fetchData = fetch("http://localhost:3000/posts");
const postsContainer = document.getElementById('postsContainer');
const imgTest = "data:image/png;base64,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";

const gridContainer = [
    [[""]],[[""]],
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
    postsRow.classList.add("col-lg-6");

    row.map(function (content) {
        let postContent = document.createElement("div");
        let imgContainer = document.createElement("img");
        postContent.setAttribute("id","postContent");
        postContent.classList.add("card","mb-4","card-body");
        imgContainer.src = imgTest;
        imgContainer.classList.add("card-img-top");


        content.map(function () {
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
            readMoreBtn.textContent = "Read more →"

            postContent.appendChild(titlePost);
            postContent.appendChild(bodyPost);
            postContent.appendChild(readMoreBtn);
        })

        postsRow.appendChild(imgContainer);
        postsRow.appendChild(postContent);
    });


    postsContainer.appendChild(postsRow);
})

})