
async function createModal() {
    let templateHTML = `
    <div class="modal-dialog modal-fullscreen">
        <div id="modal-content" class="modal-content modalpost">
        <div id = "modal-header" class="cabezeramodal">
            <div id= "modalUser" class="modalUser"></div>
            <h4 id = "modal-title" class="modal-title"></h4>
            <button id="btnCloseModal" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        </div>
        <div id="modal-body" class="modal-body cuerpomodal">
            <div class="contenidomodal">
            </div>
        </div>
        <div id="comments">
        </div>
        </div>
    </div>`;
    document.getElementById("myModal").insertAdjacentHTML("beforeend", templateHTML);
}

async function dataModal(divPost) {
    var postobj= await getOneItem(`http://localhost:3000/posts/${divPost.data("id")}`)
    let modalUser = divPost[0].querySelector(".card-header")
    let UserInfo = await getOneItem(`http://localhost:3000/users?username=${modalUser.textContent}`)
    document.getElementById("modalUser").innerHTML = `<img class="imguserbig" src="${UserInfo[0].avatar}"><div>${modalUser.textContent} <br>  ${UserInfo[0].email}</div>`;
    let titleDiv = divPost[0].querySelector(".card-title")
    document.getElementById("modal-title").textContent = titleDiv.textContent;

    let bodyDiv = divPost[0].querySelector(".card-text")
    document.getElementsByClassName("contenidomodal")[0].textContent = bodyDiv.textContent;
    let modalIconX = `<div id ="modal-icon" class= "modal-icon">
    <span class="like-dislike like">
    <div class="numerolike"></div>
    <i class="fas fa-thumbs-up like" id="like"></i>
    </span>
    <span class="like-dislike dislike">
    <div class="numerolike"></div>
    <i class="fas fa-thumbs-down dislike" id="dislike"></i>
    </span>
    <i id="edit-post" <i class="fas fa-edit edit-post"></i>
    <i id="delete-post" class="fas fa-trash-alt delete-post"></i>
    </div>`

    document.getElementById("modal-body").insertAdjacentHTML("beforeend", modalIconX);
    document.querySelector(".like>div").textContent=postobj.like
    document.querySelector(".dislike>div").textContent=postobj.dislike
    let deleteP = document.getElementById("delete-post")
    deleteP.addEventListener("click", function(){deletePost(divPost.data("id"))} )
    let editP = document.getElementById("edit-post")
    editP.addEventListener("click", function(){editPost(divPost.data("id"))})
    let commentsByPost = await getAllItems(`http://localhost:3000/comments?postId=${divPost.data("id")}`)
    let dislike= document.getElementById("dislike")
    dislike.addEventListener("click",function(e){likeDislike(e,divPost.data("id"))})
    let like= document.getElementById("like")
    like.addEventListener("click",function(e){likeDislike(e,divPost.data("id"))})
    createCommentsByPost(commentsByPost)
}

async function openModal(){
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    locModal = document.getElementById('myModal')
    locModal.style.display = "block";
    locModal.style.paddingRight = "17px";
    locModal.className="modal fade show";
    document.getElementById("btnCloseModal").addEventListener("click", closeModal)
}

function closeModal() {
    document.getElementsByTagName("body")[0].style.overflowY = "auto";
    locModal.className="modal fade";
    locModal.style.display = "none";
    while(locModal.firstChild) {
        locModal.firstChild.remove();
    }
}