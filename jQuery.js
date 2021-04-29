let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

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
                createPost(id, data);
            })
        })
}

for (let id = 1; id < 101; id++) {
    getPost(id);
    if (id > 1) {
        var post = $('<div class="col-md-6"><div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative post-box" id="box' + id + '"> <div class="col p-4 d-flex flex-column position-static"> <strong class="d-inline-block mb-2 text-warning" id="userName' + id + '">Jose Lara</strong><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '">This is a wider card with supporting text below as a naturallead-in to additional content.</p> <button type="button" class="btn btn-primary modalBtn" data-toggle="modal" data-target="#exampleModal" data-btn-id="' + id + '">See the post</button></div></div></div>')
        $('#postDiv').append(post);
    }
}

function createPost(id, data) {
    if (id > 1) {
        $('#titlePost' + id).text(data.title);
        $('#bodyPost' + id).text(data.body);

        $(".post-box").hover(
            function () {
                $(this).addClass('shadow-lg').css('cursor', 'pointer');
            }, function () {
                $(this).removeClass('shadow-lg');
            });
    } else {
        $('#postText').text(data.body);
        $('#postTitle').text(data.title);
    }
}

$('.modalBtn').each(function () {
    $(this).on('click', function () {
        var postId = $(this).data('btn-id');
        console.log('ID of post: '+postId);
        var postSettings = {
            "url": urlPosts,
            "method": "GET",
            "data": {
                id: postId,
            },
            "timeout": 0,
        };

        $.ajax(postSettings)
            .done(function (response) {
                if (postId > 1) {
                    $('.modal-body').text(response[0].body);
                    $('.modal-title').text(response[0].title);
                } else {
                    $('.modal-body').text(response[0].body);
                    $('.modal-title').text(response[0].title);
                }
                userModalInfo(response[0].userId);
                getComments(response[0].id);
            })
    });
});

function userModalInfo(user) {
    var userSettings = {
        "url": urlUsers,
        "method": "GET",
        "data": {
            id: user,
        },
        "timeout": 0,
    };

    $.ajax(userSettings)
        .then(function (response) {
            $('#modal-name').text(response[0].name);
            $('#modal-email').text(response[0].email);
        })
}

function getUser(userId, postId) {

    var userSettings = {
        "url": urlUsers,
        "method": "GET",
        "data": {
            id: userId,
        },
        "timeout": 0,
    };

    $.ajax(userSettings)
        .then(function (response) {
            if (postId > 1) {
                $('#userName' + postId).text(response[0].name);
            } else {
                $('#userName').text(response[0].name);
            }
        })
}

for (let i = 1; i < 11; i++) {
    for (let k = 1; k < 11; k++) {
        var j = (i - 1) * 10 + k;
        getUser(i, j);
    }
}

function getComments(postId) {
    var settings = {
        "url": "https://jsonplaceholder.typicode.com/posts/"+postId+"/comments/",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
          response.forEach(function (data) {
              console.log(data.body);
            $('.collapse').append('<div class="card card-body">'+data.body+'</div>');
          })
      });
}

/*
for (let i = 1; i < 11; i++) {
    getUser(1, i);
}
for (let i = 10; i < 21; i++) {
    getUser(2, i);
}
for (let i = 20; i < 31; i++) {
    getUser(3, i);
}
for (let i = 30; i < 41; i++) {
    getUser(4, i);
}
for (let i = 40; i < 51; i++) {
    getUser(5, i);
}
for (let i = 50; i < 61; i++) {
    getUser(6, i);
}
for (let i = 60; i < 71; i++) {
    getUser(7, i);
}
for (let i = 70; i < 81; i++) {
    getUser(8, i);
}
for (let i = 80; i < 91; i++) {
    getUser(9, i);
}
for (let i = 90; i < 101; i++) {
    getUser(10, i);
}*/

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

