
window.onload = init()
function init(){
    postsFetchFun()
}
function postsFetchFun(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("http://localhost:3000/posts", requestOptions)
        .then(response => response.text())
        .then(result => {let data = JSON.parse(result)
            console.log(data)
            updatePostsList(data)
        })
        .catch(error => console.log('error', error));

}
function updatePostsList(data){
    data.forEach(post => {
        let div1 = document.createElement("div")
        div1.innerHTML =  `<div class="card h-100">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>`
        div1.setAttribute("class", "col")
        div1.setAttribute("id","User-container-"+post.id)
        document.getElementById("container-card").appendChild(div1)
        div1.addEventListener("click",function (){
            console.log(post)
            findUserFetchFun(post)
            //findCommentsFetchFun(post)
        })
    });
}
function findCommentsFetchFun(post){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var urlFetch = "http://localhost:3000/comments?postId="+post.id

    fetch( urlFetch, requestOptions)
    .then(response => response.text())
    .then(result => {let comments = JSON.parse(result)
        console.log(comments)
        createCommentsFun(comments)
    })
    .catch(error => console.log('error', error));

}
function createCommentsFun(comments){
    comments.forEach((comment)=>{
        let commentDiv = document.createElement("div")
        commentDiv.textContent = comment.name
        buttonDiv = document.querySelector(".buttons-container")
        buttonDiv.appendChild(commentDiv)
    })
}
function findUserFetchFun(post){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var urlFetch = "http://localhost:3000/users/"+post.userId

    fetch( urlFetch, requestOptions)
    .then(response => response.text())
    .then(result => {let data = JSON.parse(result)
        console.log(data)
        createModal(post, data)
    })
    .catch(error => console.log('error', error));

}
function createModal(post, data){
    let bigDiv = document.createElement("div")
    bigDiv.classList.add("modalTransparent")
    bigDiv.setAttribute("id","modal")
    $("body").append(bigDiv)

    let smallDiv = document.createElement("div")
    smallDiv.classList.add("modalSmall")
    bigDiv.appendChild(smallDiv)

    let titleDiv = document.createElement("div")
    titleDiv.classList.add("title-container")
    titleDiv.textContent = "Text title: "+ post.title + data.email;
    smallDiv.appendChild(titleDiv)



    // let jQueryDiv = document.createElement("div")
    // jQueryDiv.classList.add("jQuery-container")
    // smallDiv.appendChild(jQueryDiv)

    // let jScriptDiv = document.createElement("div")
    // jScriptDiv.classList.add("javaScript-container")
    // smallDiv.appendChild(jScriptDiv)

    let buttonsDiv = document.createElement("div")
    buttonsDiv.classList.add("buttons-container")
    smallDiv.appendChild(buttonsDiv)

    let button1 = document.createElement("button")
    button1.classList.add("buttons-modal")
    button1.setAttribute("id","show-solution-button")
    button1.textContent = "Show Solution"
    buttonsDiv.appendChild(button1)

    button1.addEventListener("click", function (){
        console.log(post)
        findCommentsFetchFun (post)
    })

    // let button2 = document.createElement("button")
    // button2.classList.add("buttons-modal")
    // button2.setAttribute("id","solution-button")
    // button2.textContent = "Validate"
    // buttonsDiv.appendChild(button2)

    removeModal(bigDiv)

}
function removeModal(child){
    let bigDivClose = document.getElementById("modal")
    bigDivClose.addEventListener("click",(e)=>{
        if(e.target.matches(".modalTransparent")){
            document.body.removeChild(child)
            bigDivClose.removeEventListener;
        }
    })
}