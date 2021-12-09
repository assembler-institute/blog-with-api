/* Get posts */

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
let btnSubmit;

fetch("http://localhost:3000/posts", requestOptions)
    .then(response => response.json())
    .then(result => {
        var containerChild = document.createElement('div')
        containerChild.classList.add('postsContainer')
        result.forEach(element => {
            //console.log(element);
            var containerFather = document.querySelector(".col-md-8");
            containerFather.appendChild(containerChild)
            var button = document.createElement("button");
            button.setAttribute("id", element.id);
            button.classList.add("accordion");
            button.innerHTML = `${element.title} <i class="bi bi-pencil-square ${element.id}" id='editPost${element.id}'></i><i class="bi bi-trash"></i>`;
            containerChild.appendChild(button);
            var panel = document.createElement("div");
            panel.classList.add("panel");
            panel.classList.add('comment' + element.id)
            containerChild.appendChild(panel);
            var parraf = document.createElement("p");
            parraf.innerHTML = element.body;
            panel.appendChild(parraf);
            var btnComment = document.createElement("button");
            btnComment.innerHTML = "Leave a comment";
            panel.appendChild(btnComment);
            btnComment.addEventListener("click", function () {
                newComment(element.id)
            });
            var btnEditPost = document.getElementById('editPost' + element.id);
            btnEditPost.addEventListener('click', function () {
                editPost(element.userId, element.body, element.title)

            })
            var btnShowComment = document.createElement("button");
            btnShowComment.innerHTML = "Check all the comments!";
            panel.appendChild(btnShowComment);
            btnShowComment.addEventListener('click', () => {
                getComments(element.id)
            })
        });
        accordionDisplay()
    })

// var posts = JSON.parse(localStorage.getItem('posts'))

/* Get Users Info*/

function getUserInfo(userId) {
    let name;
    let username;
    fetch("http://localhost:3000/users?id=" + userId, requestOptions)
        .then(responseUsers => responseUsers.json())
        .then(resultUsers => {
            name = resultUsers.name
            username = resultUsers.username
        })
        .catch(error => console.log('error', error));
    return {
        name,
        username
    };
}




/* Open accordion */
function accordionDisplay() {
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
    }, 0);
}

function getComments(id) {
    console.log(id);
    if (document.querySelector('.containerComments' + id)) {
        document.querySelector('.containerComments' + id).remove()
    } else {
        fetch("http://localhost:3000/comments?postId=" + id, requestOptions)
            .then(response => response.json())
            .then(result => {
                let father = document.querySelector('.comment' + id);
                let container = document.createElement('div')
                container.classList.add('containerComments' + id);
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

function newComment(id) {
    var eventDiv = document.createElement("div")
    eventDiv.setAttribute("id", "Mymodal");
    eventDiv.className = "modal";
    document.body.appendChild(eventDiv);
    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    eventDiv.appendChild(modalContent);
    eventDiv.style.display = "block";
    const html = `<span class="close" id="closeModal">&times;</span>
        <form>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input type="title" class="form-control" id="exampleFormControlInput2" placeholder="title example..">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit" id = "submitComment">Submit form</button>
            </div>
        </form>`

    modalContent.innerHTML = html;
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("submitComment").addEventListener("click", function () {
        submitForm(id)
    })
}

function submitForm(id) {
    event.preventDefault();
    var formValues = {
        "postId": id,
        "name": "",
        "body": ""
    }
    formValues.name = document.getElementById("exampleFormControlInput2").value
    formValues.body = document.getElementById("exampleFormControlTextarea1").value

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(formValues);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/comments?postId=" + id, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    closeModal();
    getComments(id)
}


function closeModal() {
    var eventDiv = document.getElementById("Mymodal");
    eventDiv.remove();
}

/* FILTER POSTS */

let usersCollection = document.querySelectorAll('.one')
console.log(usersCollection);

setTimeout(() => {
    for (const iterator of usersCollection) {
        iterator.addEventListener('click', () => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            fetch("https://jsonplaceholder.typicode.com/posts?userId=" + iterator.id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    var containerFather = document.querySelector(".col-md-8");
                    var containerDelete = document.querySelector('.postsContainer')
                    containerDelete.remove()
                    var containerChild = document.createElement('div')
                    containerChild.classList.add('postsContainer')
                    result.forEach(element => {
                        // console.log(element);
                        containerFather.appendChild(containerChild)
                        var button = document.createElement("button");
                        button.setAttribute("id", element.id);
                        button.classList.add("accordion");
                        button.innerHTML = `${element.title} <i class="bi bi-pencil-square ${element.id}"></i><i class="bi bi-trash"></i>`;
                        containerChild.appendChild(button);
                        var panel = document.createElement("div");
                        panel.classList.add("panel");
                        panel.classList.add('comment' + element.id)
                        containerChild.appendChild(panel);
                        var parraf = document.createElement("p");
                        parraf.innerHTML = element.body;
                        panel.appendChild(parraf);
                        var btnComment = document.createElement("button");
                        btnComment.innerHTML = "Leave a comment";
                        panel.appendChild(btnComment);
                        btnComment.addEventListener("click", function () {
                            newComment(element.id)
                        });
                        var btnShowComment = document.createElement("button");
                        btnShowComment.innerHTML = "Check all the comments!";
                        panel.appendChild(btnShowComment);
                        btnShowComment.addEventListener('click', () => {
                            getComments(element.id)
                        })
                    });
                    accordionDisplay();
                })
                .catch(error => console.log('error', error));
        })
    }
}, 0);

/* CREATE MODAL */

function editPost(id, body, title) {
    console.log('a');
    var fatherModal = document.querySelector('.modal');
    const html = `<div class="modal-content">
            <span class = "close"
            id = "closeModal"> </span>
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-md-4">
                <label for="validationCustom01" class="form-label">First name</label>
                <input type="text" class="form-control" id="validationCustom01" value="" required>
                <div class="valid-feedback">
                </div>
              </div>
              <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Last name</label>
                <input type="text" class="form-control" id="validationCustom02" value="" required>
                <div class="valid-feedback">
                </div>
              </div>
              <div class="col-md-4">
                <label for="validationCustomUsername" class="form-label">Username</label>
                <div class="input-group has-validation">
                  <span class="input-group-text" id="inputGroupPrepend">@</span>
                  <input type="text" class="form-control" id="validationCustomUsername"
                    aria-describedby="inputGroupPrepend" required>
                  <div class="invalid-feedback">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">Title</label>
                <input type="text" class="form-control" id="validationCustom03" required>
                <div class="invalid-feedback">
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">Body</label>
                <input type="text" class="form-control" id="validationCustom03" required>
                <div class="invalid-feedback">
                </div>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
                  <label class="form-check-label" for="invalidCheck">
                    Agree to terms and conditions
                  </label>
                  <div class="invalid-feedback">
                    You must agree before submitting.
                  </div>
                </div>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" type="submit" id='submitEdit'>Submit form</button>
              </div>
            </form>
          </div>`
    fatherModal.innerHTML = html;
    fatherModal.style.display = 'block';
    document.getElementById("closeModal").addEventListener("click", closeModal);
    document.getElementById("submitEdit").addEventListener("click", function () {
        submitPostEdit()
    })
}