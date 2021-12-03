var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];



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
        const { title, body, id} = element
        const numtoletters= convert_tens_hundreds(id)
        const creatButton=document.createElement("button")
        creatButton.setAttribute("class", "prueba btn btn-primary btn-lg")
        creatButton.setAttribute("id", id)
        // creatButton.setAttribute("value", "click")
        creatButton.innerHTML="Show Info"
        // creatButton.addEventListener("click", ()=>{
        //     console.log("kjasndkjasn")
        // })
        loadPage(title, numtoletters, body, id)
        document.getElementById(numtoletters).appendChild(creatButton)
        // p= document.querySelector(".prueba")
        // p.addEventListener("click", ()=>{
        //     console.log("kajsndkjns")
        // })
        ostia= $(".prueba")
        $(ostia).on("click", (e)=>{
            console.log(e.target.id)
            infoPosts= info.filter(post=> {if(post.id == e.target.id) {
                        return post}})
            // console.log($(ostia))
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
            console.log(infoPosts)
            // console.log("toco este")
        })
        // $(`${id}`).on("click", ()=>{
        //     console.log("janskdjnas")
        // })
        // creatButton.addEventListener("click", ()=>{
        //     console.log("kajsndkjns")
        // })
        // document.getElementsByClassName("prueba").addEventListener("click", ()=>{
        //     console.log("akjsndkjsndjkn")
        // })
    
        // var ppp= document.getElementById(id)
        // ppp.addEventListener("click", ()=>{
        //     console.log("funcionaaaaostiaaputaa")
            
        // })
        // creatButton.addEventListener("click", ()=>{
        //     console.log("kjasnkjdnakjsdn")
        // })
        // creatButton.forEach(element => {
            //     element.addEventListener("click", ()=>{
                //         console.log("kjasndkjn")
                //     })
                // });
                // creatButton.setAttribute("value", "click")
                // creatButton.innerHTML= "pepe"
        // poresto.appendChild(creatButton)
        // console.log(document.getElementsByClassName("card-body"))
        // poresto=document.getElementsByClassName("card-body")
        // const probando= document.getElementById(id)
        // probando.addEventListener("click", (e)=>{
        //     console.log("kjasndkjan")
        // })
        // creatButton.addEventListener("click", (e)=>{ 
        //     e.prebentDefault()
        //     console.log("akjsndkjasn")
        // })
        // // console.log(document.getElementById(id))
        // $({id}).on("click", ()=>{
        //     console.log("jaksdn")
        // })

        // document.getElementById(p).appendChild(divPost)
        // console.log(document.getElementById(id))
        // document.querySelector(".card-body").appendChild(divPost)
        // console.log(document.querySelector(".card-body"))

        // document.querySelector(".prueba").addEventListener("click", ()=>{
        //     console.log("probsabdhabsd")
        // })
        // $(".prueba").on("click", ()=>{
        //     console.log($(".prueba"))
        // })
        // $({id}).on("click", ()=>{
        //     console.log("akjsdna")
        // })
        // document.getElementById(id).addEventListener("click", ()=>{
        //     console.log("estas clicando")
        // })
        // document.querySelectorAll("title").textContent="jaskdn"
        // $(".title").text(title);
        // const titleP = document.createElement("p")
        // titleP.textContent= `${title}`
        // $(".title").html(titleP)
        // console.log(title)
        // document.querySelector(".mb-0").textContent="jasdb"
        // document.querySelectorAll("title")
        // $("#contentFull").append(contentFUll);
        // document.getElementById("contentFull").innerHTML += contentFUll
        // document.getElementById
        // titleP.setAttribute("class", "title")
        // const bodyP= document.createElement("p")
        // bodyP.textContent=`${body}` 
        // bodyP.setAttribute("class", "body")
        // const divPost= document.createElement("div")
        // divPost.setAttribute("id", `${id}`)
        // // divPost.setAttribute("class", "d-block p-2 bg-primary text-white")
        // divPost.appendChild(titleP)
        // divPost.appendChild(bodyP)
        // document.getElementById("contentBlog").appendChild(divPost)
        // divPost.addEventListener("click", ()=>{
        //     infoPosts= info.filter(post=> {if(post.id == divPost.id) {
        //         return post}})
        //         // console.log(infoPosts)
        //         information.title= infoPosts[0].title
        //         information.id= infoPosts[0].id
        //         information.userId= infoPosts[0].userId
        //         information.body=infoPosts[0].body
        //         fetchUsersInfo(information.userId)
        //         comments(information.userId)
        //         // $("#myModal").modal('show');
        //         setTimeout(() => {
        //             llamada()
        //         }, 400);
        // })
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


function loadPage(title,id, body){
    contentFUll=`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#${id}" aria-expanded="true" aria-controls="collapseOne">
          ${title}
          <h5 class="title"></h5>
          </button>
        </h5>
      </div>
      <div id="${id}" class="collapse hide pli" aria-labelledby="headingOne" data-parent="#contentFull">
        <div class="card-body">
        ${body}
        </div>
      </div>`
      document.getElementById("contentFull").innerHTML += contentFUll
    //   document.getElementById("${Fullid}").addEventListener("click", ()=>{
    //       console.log("aknmsd faksmdf")
    //   })
    // $(".prueba").on("click", ()=>{
    //     console.log("akjsdnaskj")
    // })
    // document.getElementById(${Fullid}).addEventListener
    // document.getElementById("contentFull").innerHTML= contentFUll

}

function convert_tens_hundreds(num) {
    if (num < 10) return ones[num];
    else if (num >= 10 && num < 20) return teens[num - 10];
    else if(num == 100){ return ones[Math.floor(num / 100)] + "hundred" + convert_tens_hundreds(num % 100);}
    else {
      return tens[Math.floor(num / 10)] + "" + ones[num % 10];
    }
  }

  var tt= document.getElementById("contentFull").children
  setTimeout(() => {
      console.log(tt.length)
      
  }, 1000);
// console.log(document.getElementById("contentFull").children)