let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

console.log($('.container')[0]);

var settings = {
    "url": urlPosts,
    "method": "GET",
    "data": {
        id: 1,
    },
    "timeout": 0,
};

$.ajax(settings).done(function (response) {
    response.forEach(data => {
        $('#postTitle').text(data.title);
    });
});

function getPost(id, url) {
    var settings = {
        "url": url,
        "method": "GET",
        "data": {
            id: id,
        },
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        response.forEach(data => {
            $('#titlePost' + id).text(data.title);
            $('#bodyPost' + id).text(data.body);
        });
    });
}

function createPosts(id) {
    var post = $('<div class="col-md-6"><div class="postBox row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"> <div class="col p-4 d-flex flex-column position-static"> <strong class="d-inline-block mb-2 text-success">Jose Lara</strong><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '">This is a wider card with supporting text below as a naturallead-in to additional content.</p><a href="#" class="stretched-link">Continue reading</a></div></div></div>')
    $('#postDiv').append(post);
    getPost(id, 'https://jsonplaceholder.typicode.com/posts/');
}
for (let i = 1; i < 99; i++) {
    createPosts(i);
}

function getComments(id) {
    var settings = {
        "url": 'https://jsonplaceholder.typicode.com/posts/' + id + '/comments',
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        response.forEach(data => {
            console.log(data);
        });
    });
}
//____________ STYLES _______________//
$(".postBox").hover(
    function () {
        $(this).addClass('shadow-lg').css('cursor', 'pointer');
    }, function () {
        $(this).removeClass('shadow-lg');
    });