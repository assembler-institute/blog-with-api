/* Get posts */

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            // console.log(element);
            var container = document.querySelector(".col-md-8");
            var button = document.createElement("button");
            button.setAttribute("id", element.id);
            button.classList.add("accordion");
            button.innerHTML = `${element.title}        <i class="bi bi-pencil-square ${element.id}"></i><i class="bi bi-trash"></i>`;
            container.appendChild(button);
            var panel = document.createElement("div");
            panel.classList.add("panel");
            panel.classList.add('comment' + element.id)
            container.appendChild(panel);
            var parraf = document.createElement("p");
            parraf.innerHTML = element.body;
            panel.appendChild(parraf);
            var btnComment = document.createElement("button");
            btnComment.innerHTML = "Leave a comment";
            panel.appendChild(btnComment);
            var btnShowComment = document.createElement("button");
            btnShowComment.innerHTML = "Check all the comments!";
            panel.appendChild(btnShowComment);
            btnShowComment.addEventListener('click', () => {
                getComments(element.id)
            })
        });
    })

// var posts = JSON.parse(localStorage.getItem('posts'))

/* Get Users */

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

function getComments(id) {
    console.log(id);
    if (document.querySelector('.containerComments')) {
        document.querySelector('.containerComments').remove()
    } else {
        fetch("https://jsonplaceholder.typicode.com/posts/" + id + "/comments", requestOptions)
            .then(response => response.json())
            .then(result => {
                let father = document.querySelector('.comment' + id);
                let container = document.createElement('div')
                container.classList.add('containerComments');
                father.appendChild(container)
                result.forEach(element => {
                    let title = document.createElement('div')
                    title.classList.add('titleComment')
                    let description = document.createElement('p');
                    description.classList.add('bodyComment')
                    title.innerText = element.name;
                    description.innerText = element.body;
                    container.append(title)
                    title.append(description)
                })
            })
    }
}