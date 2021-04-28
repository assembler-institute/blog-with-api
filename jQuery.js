let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';


var globalUsers = [];

//____________ FIRST POST _______________//
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
        $('#postText').text(data.body);
        $('#postTitle').text(data.title);
    });
});

//____________ GET USERS _______________//
function getUsers(callback) {

    var settings = {
        "url": urlUsers,
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings)
        .then(function (response) {
            callback(response);
        })

}
getUsers(function (response) {
    for (let i = 0; i < response.length; i++) {
        globalUsers.push(response[i]);
    }
    for (let i = 2; i < 101; i++) {
        getPost(i, createPost);
    }
    console.log(globalUsers);
});

//____________ GET POSTS _______________//
function getPost(id,callback) {
    var settings = {
        "url": urlPosts,
        "method": "GET",
        "data": {
            id: id,
        },
        "timeout": 0,
    };

    $.ajax(settings)
        .then(function (response) {
            response.forEach(data => {
                callback(id,data);
            })
        })
}

//____________ CREATE POST _______________//
function createPost(id,data) {
    var post = $('<div class="col-md-6" data-id="'+id+'"><div class="postBox row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"> <div class="col p-4 d-flex flex-column position-static"> <strong class="d-inline-block mb-2 text-success" id="userName' + id + '">Jose Lara</strong><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '">This is a wider card with supporting text below as a naturallead-in to additional content.</p> <button type="button" class="btn btn-primary modalBtn" data-toggle="modal" data-target="#exampleModal">See the post</button></div></div></div>')
    $('#postDiv').append(post);
    $('#titlePost' + id).text(data.title);
    $('#bodyPost' + id).text(data.body);

    $(".postBox").hover(
        function () {
            $(this).addClass('shadow-lg').css('cursor', 'pointer');
        }, function () {
            $(this).removeClass('shadow-lg');
        });

    for (let i = 0; i < globalUsers.length; i++) {
        if (data.userId == 1) {
            $('#userName').text(globalUsers[0].name);
        }
        if (globalUsers[i].id == data.userId) {
            $('#userName' + id).text(globalUsers[i].name);
        }
    }
}
