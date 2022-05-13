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
        // Select the title/body form the html
        /* let postTitle = document.querySelectorAll("#postTitle")
        let postBody = document.querySelectorAll("#postBody")
        for (let i = 0; i < 10; i++) {
            const titleApi = data[i];
            postTitle[i].textContent = titleApi["title"]
            postBody[i].textContent = titleApi["body"]
        } */
        let index = 0;
        postArray.map(function () {

            let postDiv = document.createElement("div");
            let postTitle = document.createElement("div");
            let postBody = document.createElement("div");

            postDiv.setAttribute("id", index++);
            postDiv.classList.add("col");

            const postData = data[postDiv.id];
            console.log(postData);

            postTitle.textContent = postData["title"];
            postDiv.appendChild(postTitle);

            postBody.textContent = postData["body"];
            postDiv.appendChild(postBody);

            postContainer.appendChild(postDiv);
        });
    })