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
    containerDiv.on('click', () => {
        createModal()
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