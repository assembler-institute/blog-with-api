async function getAllItems(url){
    const response = await fetch(url)
    const data = await response.json()
    return data.reverse()
}

async function getOneItem(url) {
    const response = await fetch(url)
    return response.json()
}

function showAllPost(allPosts) {
    for (const pos of allPosts) {
        createpost(pos)
    }
}

async function createpost(obj){
    //Variable declaration
    var userbyid= await getOneItem(`http://localhost:3000/users/${obj.userId}`)
    var containerDiv = $("<div></div>")
    var headerDiv = $(`<div>${userbyid.username}</div>`)
    var bodyDiv = $(`<div>${obj.body}</div>`)
    var titleDiv = $("<h5></h5>")
    var pDiv = $("<p></p>")
    var redyBlog=$("#redyblog")
    //Adding classes
    containerDiv.addClass("card text-center postblog")
    headerDiv.addClass("card-header hedermodal")
    bodyDiv.addClass("card-body bodymodal")
    titleDiv.addClass("card-title")
    pDiv.addClass("card-text")

    //Import text
    bodyDiv.append(titleDiv,pDiv)
    containerDiv.append(headerDiv,bodyDiv)
    redyBlog.append(containerDiv)
    containerDiv.on('click', (e) => {
        openModal(containerDiv)
    });
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

async function openModal(e){
    locModal = document.getElementById('myModal')
    locModal.style.display = "block";
    locModal.style.paddingRight = "17px";
    locModal.className="modal fade show";

    let modalUser = e[0].querySelector(".card-header")
    let UserInfo = await getOneItem( `http://localhost:3000/users?username=${modalUser.textContent}`)
    console.log(modalUser)
    setModalUser(`${modalUser.textContent} / ${UserInfo[0].email}`)




    let titleDiv = e[0].querySelector(".card-title")
    console.log(e)
    setTitle(titleDiv.textContent)

    let bodyDiv = e[0].querySelector(".card-text")
    console.log(bodyDiv)
    setBody(bodyDiv.textContent)
    let commentsByPost = await getAllItems(`http://localhost:3000/comments?postId=1`)
    createPostComment(commentsByPost)

}

    function createPostComment(obj){

    for (const comment of obj) {
        var containerComments = $(`<div></div>`)
        var headerComments = $(`<div>${comment.email}</div>`)
        var bodyComments = $(`<div>${comment.body}</div>`)
        headerComments.addClass("card-header hedermodal")
        bodyComments.addClass("card-body bodymodal")
        containerComments.addClass("container-comments comments")
        
        $("#comments").append(containerComments)
        containerComments.append(headerComments, bodyComments)

    }
}


function setComments(comments){
    document.getElementById("comments").textContent = comments
}

