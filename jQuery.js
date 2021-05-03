let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

//_________ USER NAME ON THE POST__________//
for (let i = 1; i < 11; i++) {
    for (let k = 1; k < 11; k++) {
        var j = (i - 1) * 10 + k;
        ; getUser(i, j);
    };
};

//_________INSERT DIVS IN HTML__________//
for (let id = 1; id < 101; id++) {
    getPost(id);
    if (id > 1) {
        var post = $('<div class="col-md-6" id="postContainer' + id + '"><div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative post-box" id="box' + id + '"> <div class="col p-4 d-flex flex-column position-static"><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '"></p> <div class="post-creator"><strong class="d-inline-block mb-2 text-warning" id="userName' + id + '"></strong></div><div class="button-flex"><button type="button" class="btn btn-primary modalBtn" data-toggle="modal" data-target="#exampleModal" data-btn-id="' + id + '">Read post</button></div></div></div></div>')
        $('#postDiv').append(post);
    };
};

//_________GET POSTS DATA__________//
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
            });
        });
};

//_________CREATE POST__________//
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
    };
};

//_________GET POST USERS__________//
function postUserData(userId) {
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
            $('#modal-name').text(response[0].name);
            $('#modal-email').text(response[0].email);
        });
};

//_________GET USERS__________//
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
            };
        });
};

//_________GET MODAL INFO & RUN MODAL FUNCTIONS__________//
$('.modalBtn').each(function () {
    $(this).off();
    $(this).on('click', function () {
        $('.btn-danger').off();
        var postId = $(this).data('btn-id');

        if (postId > 1) {
            $('#modalBody').text($('#bodyPost' + postId).text());
            $('#exampleModalLabel').text($('#titlePost' + postId).text());
        } else {
            $('#modalBody').text($('#postText').text());
            $('#exampleModalLabel').text($('#postTitle').text());
        };

        $('.edit-modal').hide();
        $('.modal-content').show();
        $('#edit-post').off();
        $('#edit-post').on('click', function () {
            editPost(postId);
        });
        getComments(postId);
        deletePost(postId);
    });
});

//_________ GET POST COMMENTS__________//
function getComments(postId) {
    var settings = {
        "url": "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments/",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        $('.collapse').empty();
        response.forEach(function (data) {
            $('.collapse').append('<div class="card card-body p-5"><p class="data-name">' + data.name + '</p><p class="data-body p-4 bg-light rounded">' + data.body + '<p><p class="data-email">' + data.email + '<img src="img/user.png"  width="20" height="20"></p></div>');
        });
    });
};

//___________EDIT POST_____________//
function editPost(postId) {
    console.log('Post ID: ' + postId);
    $('.edit-modal').hide();
    let newModal = document.querySelector("template#editModal");
    const importNewEvent = document.importNode(newModal.content, true);
    $(".modal-dialog").append(importNewEvent);
    $('#closeModal').off();
    
    $('#buttonEdit').on('click', function () {
        console.log('Post ID: ' + postId);
        if (postId > 1) {
            console.log('Post ID: ' + postId);
            $('#bodyPost' + postId).text($('#newBody').val());
            $('#titlePost' + postId).text($('#newTitle').val());
        } else {
            console.log('Post ID: ' + postId);
            $('#modalBody').text($('#newBody').val());
            $('#exampleModalLabel').text($('#newTitle').val());
        };
        console.log('funciona')
    })

    $('#closeModal').on('click',function () {
        console.log('Hey');
        $('.edit-modal').hide();
    })
};

//____________DELETE POST_____________//
function deletePost(postId) {
    $('.btn-danger').on('click', function () {
        if (postId > 1) {
            console.log('Deleted post: ' + postId);
            $("#postContainer" + postId).remove();
        } else {
            var post = $('#postDiv').children()[0].id;
            var id = post.slice(-1);
            $('#postText').text($('#bodyPost' + id).text());
            $('#postTitle').text($('#titlePost' + id).text());
            $('#postDiv').children()[0].remove();
        };
    });
}
