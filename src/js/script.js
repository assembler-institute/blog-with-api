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
    for (const post of allPosts) {
        createListPosts(post)
    }
}


async function newPost(e) {
    const obj = {
        userId: 1,
        avatar: "./src/img/avatar1.png",
        title: document.getElementById("createTitlePost").value,
        body: document.getElementById("createBodyPost").value,
    };
    if(e.key === 'Enter') {
        console.log();
        await fetch("http://localhost:3000/posts", {
            method: "POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        });
    }
}

 function deletePost(e){
    // let modalDelete=document.getElementById("exampleModal")
    $('#exampleModal').css({"display":"block"}); // abrir
    let close= document.querySelector("#closedelete")
    let delet= document.querySelector("#postdelete")
    close.addEventListener("click",closemodaldelete)
    delet.addEventListener("click",async function(){
        await fetch(`http://localhost:3000/posts/${e}`,{method:"DELETE"})
        closemodaldelete()
    })
    
}
function closemodaldelete(){
    $('#exampleModal').css({"display":"none"});
}
async function createListPosts(obj){
    //Variable declaration
    var userbyid= await getOneItem(`http://localhost:3000/users/${obj.userId}`)
    var containerDiv = $("<div></div>")
    var headerDiv = $(`<div><img class="imguser" src=${userbyid.avatar}>${userbyid.username}<div></div></div>`)
    var bodyDiv = $(`<div></div>`)
    var titleDiv = $(`<h5>${obj.title}</h5>`)
    var pDiv = $(`<p>${obj.body}</p>`)
    var redyBlog=$("#redyblog")

    //Adding classes
    containerDiv.data("id", obj.id);
    // console.log(containerDiv.data("id"));
    containerDiv.addClass("card text-center postblog")
    headerDiv.addClass("card-header hedermodal headerpost")
    bodyDiv.addClass("card-body bodymodal")
    titleDiv.addClass("card-title")
    pDiv.addClass("card-text")

    //Import text
    redyBlog.append(containerDiv)
    containerDiv.append(headerDiv,bodyDiv)
    bodyDiv.append(titleDiv,pDiv)
    containerDiv.on('click', async () => {
        await createModal()
        dataModal(containerDiv)
        openModal()
    });
}

function createCommentsByPost(obj){
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

function editPost(id){
    let modalHeader = document.getElementById("modal-header")
    let modalContent = document.getElementById("modal-content")
    // Taking tags from header and Body

    let oldTitle = document.querySelector("#modal-title")
    let oldBody = document.getElementsByClassName("contenidomodal")[0]

    // Create new tags to change different format
    let newTitle = document.createElement("textarea")
    newTitle.classList.add("form-control", "form-control-sm", "textareatitulo")
    newTitle.textContent = oldTitle.textContent
    newTitle.setAttribute("id", "editTitle")

    let newBody = document.createElement("textarea")
    newBody.classList.add("textareacuerpo")
    newBody.textContent = oldBody.textContent
    newBody.setAttribute("id", "editBody")
    modalHeader.replaceChild(newTitle, oldTitle);
    modalContent.replaceChild(newBody, oldBody.parentElement);

    // Pressing Enter button to send new value
    newBody.addEventListener("keypress", async (e) => {if (e.key === 'Enter') {

        let obj = {title: newTitle.value, body: newBody.value}

        await updatePost(id, obj)
        oldTitle.textContent = obj.title

    }} )
}

async function likeDislike(e,id){
    var postobj= await getOneItem(`http://localhost:3000/posts/${id}`)
    var parent =e.srcElement.parentElement;
    var lik=parent.querySelector(".numerolike")
    if(e.srcElement.id=="like"){
        console.log(postobj);
        postobj.like++
        updatePost(id,postobj)
        lik.textContent=postobj.like
    }
    else if(e.srcElement.id=="dislike"){
        postobj.dislike++
        updatePost(id,postobj)
        lik.textContent=postobj.dislike
    }
}

async function updatePost (id, obj){
    return fetch(`http://localhost:3000/posts/${id}`,{method:"PATCH", headers:{'Content-Type': 'application/json'} , body:JSON.stringify(obj)})

}

async function searchByTitlePosts(e) {
    e.preventDefault();
    const titlePost = document.getElementById("titleSearchPosts").value;
    const response = await getAllItems(`http://localhost:3000/posts?title_like=${titlePost}`);
    clearListsPosts();
    showAllPost(response);
}

function clearListsPosts() {
    const redyblog = document.getElementById("redyblog");

    while (redyblog.children.length != 1) {
        redyblog.removeChild(redyblog.lastChild);
    }
}
