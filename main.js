let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

/**things to do user name - divs in html bootstrap + post dataGET & get users */

/*user*/
function getUserid(userId, postId) {
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
            if (postId > 0) {
                $('#userName' + postId).text(response[0].name);
            } else {
                $('#userName').text(response[0].name);
            };
        });
};

/*username id hay 10*/
for (let x = 1; x < 11; x++) {
    for (let y = 1; y < 11; y++) {
        var z = (x - 1) * 10 + y;
         getUserid(x, z);
    };
};

/*data*/
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
                //createPost(id, data);
            });
        });
};

/*divs html dinamico 100users */
for (let id = 1; id < 101; id++) {
    getPost(id);
    if (id > 0) {
        var post = $('<div class="col-md-6" id="postContainer' + id + '"><div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative post-box" id="box' + id + '"> <div class="col p-4 d-flex flex-column position-static"><h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3><p class="card-text mb-auto bodyPost" id="bodyPost' + id + '"></p> <div class="post-creator"><strong class="d-inline-block mb-2 text-warning" id="userName' + id + '"></strong></div><div class="button-flex"><button type="button" class="btn btn-primary modalBtn" data-toggle="modal" data-target="#exampleModal" data-btn-id="' + id + '">Read post</button></div></div></div></div>')
        $('#postDiv').append(post);
    };
    if(id==100){
        getPostContent(urlPosts);
    }
};

/*read post hacerlo modal*/
function getPostContent(urlPosts){
    $.ajax({
        url: urlPosts,
        success:function(response){
            $.each(response,function(index,value){
                var titlePost=document.getElementById("titlePost"+(index+1));
                var bodyPost=document.getElementById("bodyPost"+(index+1));
                titlePost.innerHTML=value.title;
                bodyPost.innerHTML=value.body;
            })
        }
    });
}














