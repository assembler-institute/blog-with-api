var allPosts
var allusers
var commentsByPost
getAllUsers()
getAllPost()



function getAllPost(){
fetch("http://localhost:3000/posts").then(response=>response.json())
.then(data=>{
    allPosts=sortPosts(data)
    for (const pos of allPosts) {
        createpost(pos)
    }
})
}

function getAllUsers(){
    fetch("http://localhost:3000/users").then(response=>response.json())
.then(data=>{
    allusers=sortPosts(data)
})
}


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
    containerDiv.on('click', (e) => {
    openModal(containerDiv)
    });
}

function sortPosts(arr){
    return arr.reverse()
}

function getComments(id) {
    commentsByPost = []
    let result
    fetch(`http://localhost:3000/comments?postId=${id}`)
    .then(response=>response.json())
    .then(data=>{
    commentsByPost = data.reverse()
    console.log(data)
    })
}

    //return posts.filter(comment => comment.postId == id);

function setModalUser(user){
    document.getElementById("modalUser").textContent = user
}

function setTitle(title){
    document.getElementById("modal-title").textContent = title
}

function setBody(body){
    document.getElementById("modal-body").textContent = body
}

function getUserInfoByName(name) {
    return allusers.filter(user => user.username == name);
}

async function openModal(e){
    locModal.style.display = "block";
    locModal.style.paddingRight = "17px";
    locModal.className="modal fade show";
    console.log(commentsByPost)
    await getComments(1)
    console.log(commentsByPost)
    let modalUser = e[0].querySelector(".card-header")
    let UserInfo = getUserInfoByName(modalUser.textContent)
    setModalUser(`${modalUser.textContent} / ${UserInfo[0].email}`)


    let titleDiv = e[0].querySelector(".card-title")
    setTitle(titleDiv.textContent)

    let bodyDiv = e[0].querySelector(".card-text")
    setBody(bodyDiv.textContent)

}