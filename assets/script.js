var btnDeletePost = undefined;
arrayIdsDelete = [];

window.onload = init();
var start;
var totalPost = 0;


function init() {
    start = 0;
    postsFetchFun(start);
}
const buttonNext = document.getElementById("carousel-control-next-a");
const buttonPrev = document.getElementById("carousel-control-prev-a");
buttonNext.addEventListener("click", nextPost);
buttonPrev.addEventListener("click", prevPost);

function nextPost() {
    start += 6;
    postsFetchFun(start);
}

function prevPost() {
    start -= 6;
    postsFetchFun(start);
}

function postsFetchFun(start) {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    var limit = 6;
    if (start < 0) {
        start = totalPost - 6;
    }
    if (start > totalPost) {
        start = 0;
    }
    var urlPosts =
        "http://localhost:3000/posts?_start=" + start + "&_limit=" + limit + "";
    fetch(urlPosts, requestOptions)
        .then((response) => {
            totalPost = response.headers.get("X-Total-Count");
            return response.text();
        })
        .then((result) => {
            let data = JSON.parse(result);
            updatePostsList(data);
        })
        .catch((error) => console.log("error", error));
}
var img = document.createElement("img");
img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";

var src = document.getElementById("header");
// src.appendChild(img);

function updatePostsList(data) {
    let parent = document.getElementById("container-card-a");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    data.forEach((post) => {
        if (arrayIdsDelete.includes(post.id + "")) {
            return;
        }
        let div1 = document.createElement("div");
        div1.innerHTML =
            `<div class="card h-100" id="card${post.id}">
                            <div class="card-body">
                            <img src="assets/img/user-icon.png" id="imgUser">
                              <div class="card-body">
                            <div id="showDescriptionModal${post.id}">
                            <h5 class="card-title" id="title${post.id}">` +
            post.title +
            `</h5>
                            <p class="card-text" id="body${post.id}">` +
            post.body +
            `</p>
                            </div>
                            <button id="editPost${post.id}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" data-edit="${post.id}"><img id="btnIcons" src="assets/img/pen.png"></button>
                            <button id="btnDeletePost${post.id}" class="btn btn-danger icon-bin" data-delete="${post.id}">
                            <img id="btnIcons" src="assets/img/cross-delete-or-close-circular-button-interface-symbol.png"></button>
                            </div>
                            </div>`;
        div1.setAttribute("class", "col");
        div1.setAttribute("id", "User-container-" + post.id);
        div1.setAttribute("data-bs-toggle", "modal");
        div1.setAttribute("data-bs-target", "#staticBackdrop");
        parent.appendChild(div1);

        btnDeletePost = document.getElementById("btnDeletePost" + post.id);
        btnDeletePost.addEventListener("click", function (e) {
            console.log(12);
            deletePost(this.id);
        });
        var editPost = document.getElementById("editPost" + post.id);
        editPost.addEventListener("click", function () {
            console.log(12);
            editPostModal(this.id);
        })

        //div1.addEventListener("click",function (){
        //console.log(post)
        //findUserFetchFun(post)
        //findCommentsFetchFun(post)
        //})
        modalEvent = document.getElementById("showDescriptionModal" + post.id);
        modalEvent.addEventListener("click", function () {
            myModal = document.getElementById("staticBackdropLabel");
            console.log(myModal);
            findUserFetchFun(post);
        });
    });
}

function findUserFetchFun(post) {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    var urlFetch = "http://localhost:3000/users/" + post.userId;
    fetch(urlFetch, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            let data = JSON.parse(result);
            console.log(data);
            //createModal(post, data)
            modalContent(post, data);
        })
        .catch((error) => console.log("error", error));
}

function modalContent(post, data) {
    document.getElementById("staticBackdropLabel").textContent = post.title;
    document.getElementById("staticBackdropLabel").textContent += " " + data.name;
    document.getElementById("staticBackdropLabel").textContent +=
        " " + data.email;
    document.getElementById("modal-content").textContent = post.body;

    button1 = document.getElementById("comments-button");
    button1.addEventListener("click", function () {
        findCommentsFetchFun(post);
    });
}

function findCommentsFetchFun(post) {
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    var urlFetch = "http://localhost:3000/comments?postId=" + post.id;
    fetch(urlFetch, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            let comments = JSON.parse(result);
            createCommentsFun(comments);
        })
        .catch((error) => console.log("error", error));
}

function createCommentsFun(comments) {
    let commentsContainer;
    buttonDiv = document.querySelector(".modal-body");
    if (document.getElementById("modal-comments-a")) {
        buttonDiv.removeChild(buttonDiv.lastChild);
    }
    commentsContainer = document.createElement("div");
    commentsContainer.setAttribute("id", "modal-comments-a");
    commentsContainer.setAttribute("class", "modal-body");
    buttonDiv.appendChild(commentsContainer);

    comments.forEach((comment) => {
        let commentDiv = document.createElement("div");
        commentDiv.innerHTML =
            `
        <div class="card">
            <div class="card-header">
                ` +
            comment.name +
            `
            </div>
            <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>` +
            comment.body +
            `</p>
                    <footer class="blockquote-footer">` +
            "Anonimous" +
            `<cite title="Source Title">` +
            comment.email +
            `</cite></footer>
                </blockquote>
            </div>
        </div>`;
        commentsContainer.appendChild(commentDiv);
    });
}

function deletePost(id) {
    var numericId = id.substring(13);
    var urlFetch = "http://localhost:3000/posts/" + numericId;
    fetch(urlFetch, {
            method: "DELETE"
        })
        .catch((error) => console.log("error", error));
    // var card = document.getElementById("card" + numericId);
    // card.remove();

    // arrayIdsDelete.push(numericId);
    // console.log(arrayIdsDelete);

    // btnDeletePost1
    console.log("el id es " + id);
    console.log("el id numerico es " + numericId);
    // document.querySelector(post.title)
    // fetch("http://localhost:3000/post/", {
    //     method: "DELETE",

    // })
}

function editPostModal(id) {
    var numericId = id.substring(8);
    console.log(id)
    var title = document.getElementById("title" + numericId);
    var body = document.getElementById("body" + numericId);
    var modalTitle = document.getElementById("exampleFormControlInput1");
    var modalBody = document.getElementById("exampleFormControlTextarea1");
    var btnSaveEdit = document.getElementById("btnSaveEdit");
    btnSaveEdit.value = numericId;
    modalTitle.value = title.innerHTML;
    modalBody.value = body.innerHTML;

}

btnSaveEdit.addEventListener("click", function () {
    var modalTitle = document.getElementById("exampleFormControlInput1");
    var modalBody = document.getElementById("exampleFormControlTextarea1");
    var urlFetch = "http://localhost:3000/posts/" + this.value;
    fetch(urlFetch, {
        method: "PATCH",
        body: JSON.stringify({
            title: modalTitle.value,
            body: modalBody.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
})

// let photo = card[index].queryselector("img").src =`https://picsum.photos/id/${index+10+index}/300`
// let arrayImg=[
//     {img: "assets/img/user-icon.png", text: "example 1"},
//     {img: "assets/img/user1(1).jpg", text: "Example 2"},
//     {img: "assets/img/user1(2).jpg", text: "Example 3"},
// ];
// arrayImg.addEventListener("load", function randomPhoto(){
//     var i = Math.floor(Math.random()*imagenes.length);
//     document.getElementById("photo").innerHTML = "<img src='' alt=''>";
//     });