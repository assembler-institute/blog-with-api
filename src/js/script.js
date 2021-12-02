var allPosts
var allusers

fetch("https://jsonplaceholder.typicode.com/users").then(response=>response.json())
.then(data=>{
    allusers=sortPosts(data)
})

fetch("https://jsonplaceholder.typicode.com/posts").then(response=>response.json())
.then(data=>{
    allPosts=sortPosts(data)
    for (const pos of allPosts) {
        createpost(pos)
    }
})



function getUserInfo(id) {
    return allusers.filter(user => user.id == id);
}


function createpost(obj){
    //Variable declaration
    var containerDiv = $("<div></div>")
    var headerDiv = $("<div></div>")
    var bodyDiv = $("<div></div>")
    var titleDiv = $("<h5></h5>")
    var pDiv = $("<p></p>")
    var redyBlog=$("#redyblog")
    // //Adding classes
    containerDiv.addClass("card text-center postblog")
    headerDiv.addClass("card-header hedermodal")
    bodyDiv.addClass("card-body bodymodal")
    titleDiv.addClass("card-title")
    pDiv.addClass("card-text")
    //Taking text
    var userbyid=getUserInfo(obj.userId)
    headerDiv.text(userbyid[0].username)
    titleDiv.text(obj.title)
    pDiv.text(obj.body)
    //Import text
    bodyDiv.append(titleDiv,pDiv)
    containerDiv.append(headerDiv,bodyDiv)
    redyBlog.append(containerDiv)
}

 function sortPosts(arr){
    return arr.reverse()
}

function getComments(id) {
    return posts.filter(comment => comment.postId == id);
}
