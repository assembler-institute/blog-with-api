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
let postElement;
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
            $(`<div class="col rounded" id="${post.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div id="postsmodal" class="card h-100">
                    <img src="assets/img/${post.id}.jpg" class=" card-img-top" alt="..."/>
                    <div class="card-body background-color: var(--bs-white)">
                        <p class="title fs-7" data-id="${post.id}" style="color: var(--bs-gray-900);" data-userid="${post.userId}" id="${post.id}" data-body="${post.body}">${post.id}&#160;&#160;${post.title}</p>
                    </div> 
                </div>
            </div)`);
        postsContainer.append(eachPost);
    });
}
showAllPosts();

// This is the first option to display posts on scroll down with the function scrollTop()

// $(window).scroll(function() {
//     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
//         limit++;
//         showAllPosts();
//     }
// });

// This is the function we use to load more posts once the button "load more" is clicked.

$("#loadmore").on("click", function() {
    initialPosts += 20;
    showAllPosts();
});

// This is a function that allows both see the whole post content and the reviews.

$(document).on("click", function(element) {
    if (element.target.matches(".title")) {
        let getElements = {
            url: `https://jsonplaceholder.typicode.com/users/${element.target.dataset.userid}`, // Get each content using the userid
            method: "GET",
        };
        $.ajax(getElements).done(function(ALLPOSTS) {
            postElement = element.target.id;
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

// This is the function to delete the posts

function deletePost() {
    $("#btn__deletepost").on("click", function() {
        let deleteButton = {
            url: `https://jsonplaceholder.typicode.com/posts/${postElement}`,
            method: "DELETE",
            timeout: 0,
        };
        $.ajax(deleteButton).done(function() {
            const deleteMe = $(`[id="${postElement}"]`);
            deleteMe.remove();
            $("#modaldelete").modal("show");
            $("#close-btn").on("click", function() {
                $("#modaldelete").modal("hide");
            });
        })
    })
}
deletePost();

// This is the function to edit the posts with the save button.

function editPost() {
    $("#editModalBtn").on("click", function() {
        var editPost = {
            url: `https://jsonplaceholder.typicode.com/posts/${postElement}`,
            method: "PATCH",
            timeout: 0,
            data: {
                title: $("#edittitle").val(),
                body: $("#bodyContent").val(),
            },
        };

        $.ajax(editPost).done(function() {
            $("input").val("");
            $("#editModal").modal("show");
            $("#confirmModalBtn").on("click", function() {
                $("#editModal").modal("hide");
            });
        });
    });
}
editPost();