const information= {
    title:"",
    id:"",
    userId:"",
    body:"",
    name:"",
    email:"",
    // commentName:"",
    // commentBody:"",
    // commentEmail:""
}
// var probando

fetch("http://localhost:3000/posts")
.then((request)=>{
return request.json()
})
.then((info)=>{
    info.forEach(element => {
        const { title, body, id } = element
        const titleP = document.createElement("p")
        titleP.textContent= `${title}`
        titleP.setAttribute("class", "title")
        const bodyP= document.createElement("p")
        bodyP.textContent=`${body}` 
        bodyP.setAttribute("class", "body")
        const divPost= document.createElement("div")
        divPost.setAttribute("id", `${id}`)
        // divPost.setAttribute("id", "contentPost")
        divPost.appendChild(titleP)
        divPost.appendChild(bodyP)
        document.getElementById("contentBlog").appendChild(divPost)
        divPost.addEventListener("click", ()=>{
            infoPosts= info.filter(post=> {if(post.id == divPost.id) {
                return post}})
                // console.log(infoPosts)
                information.title= infoPosts[0].title
                information.id= infoPosts[0].id
                information.userId= infoPosts[0].userId
                information.body=infoPosts[0].body
                fetchUsersInfo(information.userId)
                comments(information.userId)
                // $("#myModal").modal('show');
                setTimeout(() => {
                    llamada()
                }, 400);
        })
    });
})

function llamada(){
    // beginmodal()
    $("#myModal").modal('show'); 
}
function beginmodal(){
    content=` <div id="myModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="title">Modal Title</h5>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
              <div class="modal-body" id="createInfo">
                <div id="bodyFetch"></div>
                <div id="userName"></div>
                <div id="email"></div>
                </div>
                <div class="modal-body" id="comments">
                </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary">Save</button>
                  <button type="button" class="btn btn-success" id="comentClick">Comentarios</button>
                </div>
              </div>
            </div>
          </div>
        </div>` 
    document.getElementById("modalview").innerHTML= content
    document.getElementById("title").innerHTML= information.title
    document.getElementById("email").innerHTML= information.email
    document.getElementById("userName").innerHTML= information.name
    document.getElementById("bodyFetch").innerHTML=information.body
    // document.getElementById("comentClick").addEventListener("click", ()=>{
       
    // })
}

function fetchUsersInfo(idposts){
fetch("http://localhost:3000/users")
.then((request)=>{
return request.json()
})
.then((info)=>{
    var infoUsers= info.filter((userFetch)=>{
        if(userFetch.id == idposts)
        return userFetch
    })
    information.name= infoUsers[0].name
    information.email=infoUsers[0].email
})
}

function comments (postId){
    fetch("http://localhost:3000/comments")
    .then((request)=>{
    return request.json()
    })
    .then((response)=>{
       var postComment= response.filter((element)=>{
        //    console.log(element)
            if(element.postId == postId)
            return element
        })
        beginmodal()
        postComment.forEach(element=>{
            const{name, email, body}= element
            let divComment = document.createElement("div")
            divComment.setAttribute("class", "infoName")
            divComment.innerHTML= name
            console.log(divComment)
            document.getElementById("comments").appendChild(divComment)
            let divCommentEmail = document.createElement("div")
            divCommentEmail.setAttribute("class", "infoEmail")
            divCommentEmail.innerHTML= email
            // console.log(divComment)
            document.getElementById("comments").appendChild(divCommentEmail)
            let divCommentBody = document.createElement("div")
            divCommentBody.setAttribute("class", "infoBody")
            divCommentBody.innerHTML= body
            // console.log(divComment)
            document.getElementById("comments").appendChild(divCommentBody)


        })
    //    information.commentName= postComment[0].name
    //     information.commentBody= postComment[0].body
    //     information.commentEmail= postComment[0].email 
        // console.log(postComment)
    })
    }
