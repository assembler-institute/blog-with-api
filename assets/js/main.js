// Declaring variables
let localHost = "https://jsonplaceholder.typicode.com/"; //"http://localhost:3000"; forced to create local host in mac with npx https://jsonplaceholder.typicode.com/
let postsContainer = $("#cards__container");
let initialPosts = 1;
let limit = 20;
let title;
let body;
let userId;
let id;
let cards;
let postid;
let posts;
// Declaring events

// Declaring funtions

// Fetch the data from the API with await response.json() returns a promise resolved to a JSON object

async function getAllPosts() {
    const RESPONSE = await fetch(
        `https://jsonplaceholder.typicode.com/posts/?_page=${initialPosts}&_limit=${limit}`
    );
    const DATA = await RESPONSE.json();
    return DATA;
}

// Let´s inject data to the DOM

async function showAllPosts() {
    const POSTS = await getAllPosts();
    POSTS.forEach((post) => {
        let eachPost = $(`<div class="col">
                <div class="card h-100">
                    <img src="assets/img/mjackson.jpg" class="card-img-top" alt="..." />
                    <div class="card-body bg-dark">
                        <p data-id="${post.id}" class="card-title text-white" id="${post.id}" data-body="${post.body}" data-bs-toggle="modal" data-bs-target="#exampleModal" data-userid="${post.userId}">${post.id}&#160;&#160;${post.title}</p>
                        </div>
                        </div>
                        </div>)`);
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
    limit++;
    showAllPosts();
});

$(document).on("click", function(element) {
    if (element.target.matches(".card")) {
        let getElements = {
            url: `https://jsonplaceholder.typicode.com/users/${element.target.dataset.userid}`,
            method: "GET",
        };
        $.ajax(getElements).document(function(response) {
            post = element.target.id;
            // console.log(post);
            $("#bodypost").text(element.target.dataset.body);
            $("#username").text(response.username);
            $("#emailuser").text(response.email);
            let titlePost = $(`[data-id="${element.target.id}"]`).text();
            $(".modal-title").text(titlePost);
        });
    }
});