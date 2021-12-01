const informacion= {
    title:"",
    id:"",
    userId:"",
    body:""
}
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
                console.log(informacion)
            // console.log(infoPosts[0].userId)
            modal()
        })
    }); 
})

function modal() {

    let modalMain = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalCenterTitle" aria-hidden="true">`
    modalMain += `<div class="modal-dialog modal-dialog-centered" role="document">`
    modalMain += `<div class="modal-content">`
    modalMain += `<div class="modal-header">`
    modalMain += `<h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>`
    modalMain += `<button type="button" class="close" data-dismiss="modal" aria-label="Close">`
    modalMain += `<div class="modal-header">`
    modalMain += `<span aria-hidden="true">&times;</span>`
    modalMain += `</button></div>`
    modalMain += `<div class="modal-body">`
    modalMain += `</div>`
    modalMain += `<div class="modal-footer">`
    modalMain += `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modalMain += `<button type="button" class="btn btn-primary">Save changes</button>`
    modalMain += `</div></div></div></div>` 
    document.querySelector(".main-modal").appendChild(modalMain)

}