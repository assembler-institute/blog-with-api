let url = "http://localhost:3000/";

const commentsData = fetch(`${url}comments`);
const postsData = fetch(`${url}posts`);
const usersData = fetch(`${url}users`);

window.onload = () => {
    postsData
        .then((response) => response.json())
        .then((data) => {
            printPostTitle(data);
        });
};

function printPostTitle(postTitle) {
    //Get the container from html
    const postsTitlesContainer = document.getElementById("postsTitlesContainer");
    //Create a list for the titles & append it to the container
    const listContainer = document.createElement("ul");
    listContainer.className = "list-group";
    postsTitlesContainer.append(listContainer);
    //Iterate each post in posts.json
    postTitle.map((post) => {
        let titleContainer = document.createElement("li");
        titleContainer.className = "list-group-item";
        titleContainer.textContent = post.title;
        titleContainer.dataset.postId = post.id;
        titleContainer.dataset.user = post.userId;
        listContainer.append(titleContainer);
    });

    getUserId(postTitle);
}

function getUserId(postTitle) {
    let title = document.querySelectorAll("[data-user]");

    title.forEach((e) => {
        e.setAttribute("data-bs-toggle", "modal");
        e.setAttribute("data-bs-target", "#staticBackdrop");

        e.addEventListener("click", () => {
            let modalTitle = document.getElementById("staticBackdropLabel");
            let modalBody = document.getElementById("bodyContent");
            let postId = e.dataset.postId;

            modalTitle.textContent = e.textContent;
            modalBody.textContent = postTitle[postId - 1].body;

        });
    });

}

function showModal(data) {
    const firstModal = document.getElementById("postDialog");
    firstModal.textContent = data;
    firstModal.showModal();
}