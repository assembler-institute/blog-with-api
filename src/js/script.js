var allPosts
fetch("https://jsonplaceholder.typicode.com/posts").then(response=>response.json())
.then(data=>{
    allPosts=data
})
setTimeout(()=>console.log(allPosts),1000)


function sortPosts(arr){
    return arr.reverse()
}
function getUserInfo(id) {
    return users.filter(user => user.id == id);
}

function getComments(id) {
    return posts.filter(comment => comment.postId == id);
}
