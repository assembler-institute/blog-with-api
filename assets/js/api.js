

function getPost() {
return fetch('http://localhost:3000/posts')
.then(response => response.json())
.then(data => console.log(data))
}

getPost();

export { getPost };