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
   
    let commentsContainer = document.getElementById("collapseTwo");
    commentsContainer.textContent = "";

    postsComments.map((comment) => {

        if (comment.postId == user.dataset.postId) {
            let accordionItem = document.createElement("div");
            let accordionHeader = document.createElement("h2");
            let accordionButton = document.createElement("button");
            accordionItem.className = "accordion-item";
            accordionHeader.className = "accordion-header";
            accordionButton.className = "accordion-button collapsed";
            accordionButton.setAttribute("data-bs-toggle", "collapse");
            accordionButton.setAttribute("data-bs-target", "#flush-collapseThree");
            accordionButton.setAttribute("aria-expanded", "false");
            accordionButton.setAttribute("aria-controls", "flush-collapseThree")
            accordionButton.textContent = comment.name;

            let commentBodyContainer = document.createElement("div");
            commentBodyContainer.className = "accordion-collapse collapse";
            commentBodyContainer.id = "flush-collapseThree";
            commentBodyContainer.setAttribute("aria-labelledby", "flush-headingThree");
            commentBodyContainer.setAttribute("data-bs-parent", "#accordionFlushExample");
            let commentBodyWrapper = document.createElement("div");
            commentBodyWrapper.className = "accordion-body";

            
            
            commentsContainer.append(accordionItem);
            accordionItem.append(accordionHeader);
            accordionHeader.append(accordionButton);
            
            commentBodyContainer.append(commentBodyWrapper);
            commentBodyContainer.textContent = comment.body;
        

        }

    });
}





export {
    getData
};