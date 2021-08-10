// Declaring variables
let localHost = "https://jsonplaceholder.typicode.com/"; //"http://localhost:3000"; //forced to create local host in mac with npx https://jsonplaceholder.typicode.com/
let initialPosts = 0;
let limit = 4;
let title;
let body;
let userId;
let id;
let cards;
let postid;
// Declaring events

// Declaring funtions

$(() => loadPosts());

$("#navbar").on("click", function() {
    $("#cards__container").empty();
    initialPosts = 0;
    limit = 4;
    loadPosts();
});

$("#loadmore").on("click", function() {
    initialPosts = limit + 1;
    limit += 4;
});

$("#titlepost").onload(
    "https://jsonplaceholder.typicode.com/posts",
    function() {
        $("#titlepost").append(data.title);
        alert(data.title);
    }
);

function title() {
    $.get(
        "https://jsonplaceholder.typicode.com/posts",
        function(data) {
            $("#titlepost").append(data.title);
            console.log(data.title);
        },
        "json"
    );
}
title();

// function loadPosts() {
//     cards = "posts/";
//     let posts = {
//         url: `${localhost}${cards}/?_start=${initialPosts}&_limit=${limit}`,
//         method: "GET",
//         timeout: 0,
//     };

//     $.ajax(posts).done(function(response) {
//                 $(response).each(function(index, element) {
//                     create(element.title, element.id, element.userId)
//                 });
//                 $("#cards__container").each(function(index, element) {
//                         $(this).on("click", function() {
//                             userId = $(this).attr("user-id");
//                             postno = $(this).attr("post-id");
//                             $("#cards__container").attr("user-id", userId);
//                             $("#cards__container").attr("post-id", postno);
//                             loadbody();
//                             loadUser(userId);
//                             // Need to input here the rest of the functions
//                         })
//                     }
//                 })

// function loadUser(userId) {
//     cards = "users/";
//     let users = {
//         url: `${localhost}${cards}${userId}`,
//         method: "GET",
//         timeout: 0,
//     };
//     $.ajax(users).load(function(response) {
//         $("#username").html(response.username);
//         $("#emailuser").html(response.email);
//     });
// }