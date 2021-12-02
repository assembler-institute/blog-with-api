/* Get posts */

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
    .then(response => response.json())
    .then(result => { result.forEach(element => {
        // console.log(element);
        var container = document.querySelector(".col-md-8");
        var button = document.createElement("button");
        button.setAttribute("id", element.id);
        button.classList.add("accordion");
        button.innerHTML = `${element.title}        <i class="bi bi-pencil-square ${element.id}"></i><i class="bi bi-trash"></i>`;
        container.appendChild(button);
        var panel = document.createElement("div");
        panel.classList.add("panel");
        container.appendChild(panel);
        var parraf = document.createElement("p");
        parraf.innerHTML = element.body;
        panel.appendChild(parraf);
        var btnComment = document.createElement("button");
        btnComment.innerHTML = "Leave a comment";
        panel.appendChild(btnComment);

    });})

// var posts = JSON.parse(localStorage.getItem('posts'))

/* Get Users */

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://jsonplaceholder.typicode.com/users", requestOptions)
    .then(responseUsers => responseUsers.json())
    .then(resultUsers => localStorage.setItem("users", JSON.stringify(resultUsers)))
    .catch(error => console.log('error', error));

var users = JSON.parse(localStorage.getItem('users'))

/* Open accordion */
setTimeout(() => {
    var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
              panel.style.display = "none";
            } else {
              panel.style.display = "block";
            }
          });
        }
}, 1000);