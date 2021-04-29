let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';


var globalUsers = [];
var globalData = [];

function getPost(id) {
    var settings = {
        "url": urlPosts,
        "method": "GET",
        "data": {
            id: id,
        },
        "timeout": 0,
    };

    $.ajax(settings)
        .done(function (response) {
            response.forEach(data => {
                createPost(id,data);
            })
        })
}

for (let id = 1; id < 101; id++) {
    getPost(id);
}

function createPost(id,data) {
    if(id > 1){
        var post = $('<div class="col-md-6"><div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative post-box" data-id="'+id+'"> <div class="col p-4 d-flex flex-column position-static"> <strong class="d-inline-block mb-2 text-success" id="userName' + id + '">Jose Lara</strong><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '">This is a wider card with supporting text below as a naturallead-in to additional content.</p> <button type="button" class="btn btn-primary modalBtn" data-toggle="modal" data-target="#exampleModal">See the post</button></div></div></div>')
        $('#postDiv').append(post);
        $('#titlePost' + id).text(data.title);
        $('#bodyPost' + id).text(data.body);

        $(".post-box").hover(
            function () {
                $(this).addClass('shadow-lg').css('cursor', 'pointer');
            }, function () {
                $(this).removeClass('shadow-lg');
            });
    }else {
        $('#postText').text(data.body);
        $('#postTitle').text(data.title);
    }
    openModal();
    globalData.push(data.body);
}

function openModal() {
    $('.modalBtn').each(function(){
        $(this).on('click', function () {
            $('.post-box').each(function () {
                var postId = $(this).data('id');
            })
            var settings = {
                "url": urlPosts,
                "method": "GET",
                "data": {
                    id: postId,
                },
                "timeout": 0,
            };
        
            $.ajax(settings)
                .done(function (response) {
                    response.forEach(data => {
                        $('.modal-body').text(data.body);
                        $('.modal-title').text(data.title);
                    })
                })
        });
    });
}





/*
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
            globalData.push(response);
            response.forEach(data => {
                callback(id,data);
            })
        })
}

//____________ CREATE POST _______________//
function createPost(id,data) {
    var post = $('<div class="col-md-6 post" data-id="'+id+'"><div class="postBox row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"> <div class="col p-4 d-flex flex-column position-static"> <strong class="d-inline-block mb-2 text-success" id="userName' + id + '">Jose Lara</strong><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '">This is a wider card with supporting text below as a naturallead-in to additional content.</p> <button type="button" class="btn btn-primary modalBtn" id="btnModal'+id+'" data-toggle="modal" data-target="#exampleModal">See the post</button></div></div></div>')
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
}*/

