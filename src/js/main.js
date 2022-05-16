const postContainer = document.querySelector("#postContainer");
const postArray = ["", "", "", "", "", "", "", "", "", ""];
let url = "http://localhost:3000"

// Get the API data
fetch(url + "/posts")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let observer = new IntersectionObserver((posts) => {
            posts.map(posts => {
                if (posts.isIntersecting) {
                    makePost();
                }
            })
            console.log(posts);
            console.log(postArray);
        }, {
            rootMargin: "0px 0px 0px 0px",
            threshold: 1.0
        });
        const makePost = () => {
            postArray.map(function (blank, index) {

                let postDiv = document.createElement("div");
                postDiv.setAttribute("id", index);
                postDiv.classList.add("posts", "col", "card");

                const postData = data[postDiv.id];

                let postImg = document.createElement("img");
                postImg.setAttribute("src", "https://images2.alphacoders.com/941/thumb-1920-941898.jpg");
                postImg.classList.add("card-img-top");
                postDiv.appendChild(postImg);


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
        }
        makePost();

        let lastPost = document.getElementById("lastDiv");
        console.log(lastPost);
        observer.observe(lastPost);
    })