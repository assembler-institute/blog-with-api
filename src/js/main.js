fetch("http://localhost:3000/posts", {
        method: "GET",
    })
    .then(function (res) {
        return res.json();
    })
    .then(function (json) {
        let postTitle = document.querySelectorAll("#postTitle")
        let postBody = document.querySelectorAll("#postBody")
        for (let i = 0; i < postTitle.length; i++) {
            const titleApi = json[i];
            postTitle[i].textContent = titleApi["title"]
            postBody[i].textContent = titleApi["body"]
        }
    })