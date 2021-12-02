
window.onload = init()
function init(){
    var start = 0;
    postsFetchFun()
}
const buttonNext = document.getElementsByClassName("carousel-control-next")
const buttonPrev = document.getElementsByClassName("carousel-control-prev")
buttonNext.addEventListener("click", nextPost)
buttonPrev.addEventListener("click", prevPost)

function nextPost(){
    start += 6
    postsFetchFun(start)

}
function prevPost(){
    start -= 6
    postsFetchFun(start)
    
}
function postsFetchFun(start){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    var limit = 6;
    var urlPosts = "http://localhost:3000/posts?_start=" + start + "&_limit=" + limit + ""
    fetch(urlPosts, requestOptions)
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
        div1.innerHTML =  `<div class="title1">
                            `+ post.title +`
                            </div>
                            <div class="body1">
                            `+ post.body +`
                            </div>`
        div1.setAttribute("class","User-container")
        div1.setAttribute("id","User-container-"+post.id)
        document.body.appendChild(div1)
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