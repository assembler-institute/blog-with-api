const postContainer = document.querySelector("#postContainer");
const postArray = ["", "", "", "", "", "", "", "", "", ""];

// Get the API data
fetch("http://localhost:3000/posts", {
        method: "GET",
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        postArray.map(function (blank, index, array) {

            console.log(blank);
            console.log(index);
            console.log(array);

            let postDiv = document.createElement("div");
            postDiv.setAttribute("id", index);
            postDiv.classList.add("col", "card");

            const postData = data[postDiv.id];
            /* console.log(postData); */

            let postTitle = document.createElement("h5");
            postTitle.classList.add("card-title");
            postTitle.textContent = postData["title"];
            postDiv.appendChild(postTitle);


            let postBody = document.createElement("p");
            postBody.classList.add("card-text");
            postBody.textContent = postData["body"];
            postDiv.appendChild(postBody);


            let postBtn = document.createElement("button");
            postBtn.textContent = "Open post"
            postBtn.classList.add("btn", "btn-primary");
            postDiv.appendChild(postBtn);



            postContainer.appendChild(postDiv);
        });
    })