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
        })
    }); 
})
