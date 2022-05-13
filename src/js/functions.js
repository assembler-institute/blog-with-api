//Global variables
let usersData;
let postsComments;

function getData() {
    let url = "http://localhost:3000/";
    const fetchedComments = fetch(`${url}comments`);
    const fetchedPosts = fetch(`${url}posts`);
    const fetchedUsers = fetch(`${url}users`);

    fetchedPosts
        .then((response) => response.json())
        .then((data) => {
            printPostTitle(data);
        });
    fetchedComments
        .then((response) => response.json())
        .then((data) => {
            getComments(data);
        });
    fetchedUsers
        .then((response) => response.json())
        .then((data) => {
            getUsers(data);
        });
}

function getUsers(users) {
    usersData = users;
}

function getComments(comments) {
    postsComments = comments;
}

function printPostTitle(postData) {
    //Get the container from html
    const postsTitlesContainer = document.getElementById("postsTitlesContainer");
    //Create a list for the titles & append it to the container
    const listContainer = document.createElement("ul");
    listContainer.className = "list-group";
    postsTitlesContainer.append(listContainer);
    //Iterate each post in posts.json
    postData.map((post) => {
        let titleContainer = document.createElement("li");
        titleContainer.className = "list-group-item";
        titleContainer.textContent = post.title;
        titleContainer.dataset.postId = post.id;
        titleContainer.dataset.user = post.userId;
        listContainer.append(titleContainer);
    });

    displayModal(postData);
}

function displayModal(postData) {
    let userData = document.querySelectorAll("[data-user]");
    userData.forEach((user) => {
        user.setAttribute("data-bs-toggle", "modal");
        user.setAttribute("data-bs-target", "#staticBackdrop");

        user.addEventListener("click", () => {
            addTitle(user, postData);
            addUsers(user);
            addComments(user);
        });
    });
}

function addTitle(user, postData) {
    let modalTitle = document.getElementById("staticBackdropLabel");
    let modalBody = document.getElementById("bodyContent");
    let postId = user.dataset.postId;
    modalTitle.textContent = user.textContent;
    modalBody.textContent = postData[postId - 1].body;
}

function addUsers(user) {
    let userId = user.dataset.user;
    let userName = document.getElementById("userName");
    let email = document.createElement("p");
    userName.textContent = `${usersData[userId - 1].name}`;
    email.textContent = usersData[userId - 1].email;
    userName.append(email);
}

function addComments(user) {
    let commentContainer = document.getElementById("commentContainer");
    commentContainer.textContent="";
    // let idComment = postsComments.
    // console.log(postsComments);
    // let postId= user.dataset.postId;
    // let name = document.createElement("p");
    // let coment = document.createElement("p");
    // name.textContent= postsComments;

    postsComments.map((comment) => {


        if (comment.postId == user.dataset.postId) {
            let commentWrapper = document.createElement("div");
            commentWrapper.className = "commentWrapper";
            

            let commentName = document.createElement("p");
            let commentBody = document.createElement("p");
            let email = document.createElement("p");
            commentName.textContent= comment.name;
            commentBody.textContent= comment.body;
            email.textContent= comment.email;
            commentContainer.append(commentWrapper);
            commentWrapper.append(commentName, commentBody, email);
            console.log(commentName);
        }

    });
}

export {
    getData
};