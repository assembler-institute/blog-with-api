/* const fetchApi = fetch("http://localhost:3000/posts/1");

console.log(fetchApi);

fetchApi
    .then(response => response.json())
    .then(data => {
        const title = data.title;

        const titleElement = document.createElement("h2");

        titleElement.textContent = title;

        const printTitle = document.getElementById("title");

        printTitle.append(titleElement);
    }) */

let from = 0;
let limit = 10;
let mainUrl = "http://localhost:3000/"; //https://jsonplaceholder.typicode.com/
let section;
let id;
let userId;
let postId;
let title;
let body;

$(function () {
    loadPosts();
});

function loadPosts() {
    section = "posts/";
    var allPosts = {
        url: `${mainUrl}${section}/?_start=${from}&_limit=${limit}`,
        method: "GET",
        timeout: 0,
    };

    $.ajax(allPosts).done(function (response) {
        $(response).each(function (i, e) {
            createPostWithTitle(e.title, e.id, e.userId);
        });
        $(".post").each(function (i, e) {
            $(this).on("click", function () {
                cleanPostBodyUserEmail();
                userId = $(this).attr("user-id");
                postId = $(this).attr("post-id");
                $("#modal-for-posts").attr("post-id", postId);
                $("#modal-for-posts").attr("user-id", userId);
                loadBodyOfPost(postId);
                loadUserAndEmail(userId);
                loadCommentsOfPost(postId);
            });
        });
    });
}