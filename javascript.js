const informacion= {
    title:"",
    id:"",
    userId:"",
    body:"",
    name:"",
    email:"",
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
                informacion.title= infoPosts[0].title
                informacion.id= infoPosts[0].id
                informacion.userId= infoPosts[0].userId
                informacion.body=infoPosts[0].body
                idaa(informacion.userId)
                console.log(informacion)
                // $("#myModal").modal('show');
                setTimeout(() => {
                    llamada()
                }, 200);
        })
    }); 
})

function llamada(){
    beginmodal()
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
              <div class="modal-body" id="probando">
                <div id="email"></div>
                </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  <button type="button" class="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>` 
    document.getElementById("modalview").innerHTML= content
    document.getElementById("title").innerHTML= informacion.title
    document.getElementById("email").innerHTML= informacion.email
}

function idaa(idaaa){
fetch("http://localhost:3000/users")
.then((request)=>{
return request.json()
})
.then((info)=>{
    var probando= info.filter((elemento)=>{
        if(elemento.id == idaaa)
        return elemento
    })
    informacion.name= probando[0].name
    informacion.email=probando[0].email
})
}