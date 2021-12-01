let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

/**things to do user name - divs in html bootstrap + post dataGET & get users */

/*user*/
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
                createPost(id, data);
            });
        });
};






















