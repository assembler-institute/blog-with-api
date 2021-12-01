
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
        divPost.addEventListener("click", (e)=>{
            const infoPosts= info.filter(post=> {console.log(divPost.id); if(post.id == divPost.id) {
                return post}})
            console.log(infoPosts)
        })
    });

    // addeventListener
    //  
    // console.log(info.map(probando=> {if(probando.userId === 1) return probando}))
})
