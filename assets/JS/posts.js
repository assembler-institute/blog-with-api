/* Get posts */

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};


fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
    .then(response => response.json())
    .then(result => localStorage.setItem("posts", JSON.stringify(result)))

var posts = JSON.parse(localStorage.getItem('posts'))

/* Get Users */

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://jsonplaceholder.typicode.com/users", requestOptions)
    .then(responseUsers => responseUsers.json())
    .then(resultUsers => localStorage.setItem("users", JSON.stringify(resultUsers)))
    .catch(error => console.log('error', error));

var users = JSON.parse(localStorage.getItem('users'))