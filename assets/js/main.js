// Declaring variables
let localHost = "https://jsonplaceholder.typicode.com/"; //"http://localhost:3000"; forced to create local host in mac with npx https://jsonplaceholder.typicode.com/
let postsContainer = $("#cards__container");
let initialPosts = 0;
let limit = 20;
let title;
let body;
let userId;
let id;
let cards;
let post;
let posts;
// Declaring events

// Declaring funtions

// Fetch the data from the API with await response.json() returns a promise resolved to a JSON object

async function getAllPosts() {
    const ALLPOSTS = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?_start=${initialPosts}&_limit=${limit}`
    );
    let data = await ALLPOSTS.json();
    return data;
}
// Let´s inject data to the DOM

async function showAllPosts() {
    const POSTS = await getAllPosts();
    POSTS.forEach((post) => {
        let eachPost =
            $(`<div class="col" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div id="postsmodal" class="card h-100">
                    <img src="assets/img/mjackson.jpg" class="card-img-top" alt="..." />
                    <div class="card-body background-color: var(--bs-white)">
                        <p class="title" data-id="${post.id}" style="color: var(--bs-gray-900);" data-userid="${post.userId}" id="${post.id}" data-body="${post.body}">${post.id}&#160;&#160;${post.title}</p>
                    </div> 
                </div>
            </div)`);
        postsContainer.append(eachPost);
    });
}
showAllPosts();

// $(window).scroll(function() {
//     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
//         limit++;
//         showAllPosts();
//     }
// });

$("#loadmore").on("click", function() {
    initialPosts += 20;
    showAllPosts();
});

$(document).on("click", function(element) {
    if (element.target.matches(".title")) {
        let getElements = {
            url: `https://jsonplaceholder.typicode.com/users/${element.target.dataset.userid}`, // Get each content using the userid
            method: "GET",
        };
        $.ajax(getElements).done(function(ALLPOSTS) {
            post = element.target.id;
            $("#username").text(ALLPOSTS.username);
            $("#emailuser").text(ALLPOSTS.email);
            $("#bodypost").text(element.target.dataset.body);
            let titlePost = $(`[data-id="${element.target.id}"]`).text();
            $(".modal-title").text(titlePost);
        });
        $("#btn__showcomments").on("click", function() {
            $(this).addClass("d-none");

            let getComments = {
                url: `https://jsonplaceholder.typicode.com/posts/${element.target.id}/comments`,
                method: "GET",
            };

            $.ajax(getComments).done(function(reviews) {
                const displaycmmts = $(".modal-content");
                reviews.forEach((review) => {
                    let eachComment = $(`<div class="modal-body2">
                                                        <strong class="fs-4">${review.name}</strong>
                                                        <span class="mt-2">${review.body}</span>
                                                        <span class="text-muted mt-3">${review.email}</span>
                                                        </div>`);
                    displaycmmts.append(eachComment);

                    $("#exampleModal").on("hide.bs.modal", function() {
                        $("#btn__showcomments").removeClass("d-none");
                        $(".modal-body2").remove();
                        $("#load-comments").off();
                    });
                });
            });
        });
    }
});

function deletePost() {
    $("#btn__deletepost").on("click", function() {
        let deleteButton = {
            url: `https://jsonplaceholder.typicode.com/posts/${post}`,
            method: "DELETE",
            timeout: 0,
        };
        $.ajax(deleteButton).done(function() {
            const div = $(`div[id="${post}"]`);
            div.remove();
            $("#exampleModal").modal("hide");
            $("#modaldelete").modal("show");
            $("#close-btn").on("click", function() {
                $("#modaldelete").modal("hide");
            });
        });
    });
}
deletePost();