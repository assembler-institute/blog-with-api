function createModal() {
    let templateHTML = `
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
        <div class="cabezeramodal">
            <div id= "modalUser" class="modalUser"></div>
            <h4 id = "modal-title" class="modal-title"></h4>
            <button id="btnCloseModal" type="button" class="btn-close btn-close-white" aria-label="Close"></button>
        </div>
        <div id="modal-body" class="modal-body cuerpomodal">
        </div>
        
        <div id="comments">
        </div>
        </div>
    </div>`;
    document.getElementById("myModal").insertAdjacentHTML("beforeend", templateHTML);
}

async function dataModal(e) {
    let modalUser = e[0].querySelector(".card-header")
    let UserInfo = await getOneItem(`http://localhost:3000/users?username=${modalUser.textContent}`)
    document.getElementById("modalUser").innerHTML = `<img class="imguserbig" src="${UserInfo[0].avatar}"><div>${modalUser.textContent} <br>  ${UserInfo[0].email}</div>`;
    let titleDiv = e[0].querySelector(".card-title")
    document.getElementById("modal-title").textContent = titleDiv.textContent;

    let bodyDiv = e[0].querySelector(".card-text")
    document.getElementById("modal-body").textContent = bodyDiv.textContent;
    let modalIconX = `<div id ="modal-icon" class= "modal-icon"><i id="delete-post" class="fas fa-times delete-post"></i></div>`
    document.getElementById("modal-body").insertAdjacentHTML("beforeend", modalIconX);
    let deleteP = document.getElementById("delete-post")
    deleteP.addEventListener("click", function(){deletePost(e.data("id"))} )
    let commentsByPost = await getAllItems(`http://localhost:3000/comments?postId=${e.data("id")}`)
    createCommentsByPost(commentsByPost)
}

async function openModal(){
    locModal = document.getElementById('myModal')
    locModal.style.display = "block";
    locModal.style.paddingRight = "17px";
    locModal.className="modal fade show";
    document.getElementById("btnCloseModal").addEventListener("click", closeModal)
}

function closeModal() {
    locModal.className="modal fade";
    locModal.style.display = "none";
    while(locModal.firstChild) {
        locModal.firstChild.remove();
    }
}