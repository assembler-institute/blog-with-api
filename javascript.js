var ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

//! Variables donde pondre cada una de los if
var first= document.createElement("div")
first.setAttribute("id", "contentFull")
var second= document.createElement("div")
second.setAttribute("id", "contentFull")
var third= document.createElement("div")
third.setAttribute("id", "contentFull")
var fourth= document.createElement("div")
fourth.setAttribute("id", "contentFull")
var five= document.createElement("div")
five.setAttribute("id", "contentFull")
var six= document.createElement("div")
six.setAttribute("id", "contentFull")
var seven= document.createElement("div")
seven.setAttribute("id", "contentFull")
var eight= document.createElement("div")
eight.setAttribute("id", "contentFull")
var nine= document.createElement("div")
nine.setAttribute("id", "contentFull")
var ten= document.createElement("div")
ten.setAttribute("id", "contentFull")

const information= {
    title:"",
    id:"",
    userId:"",
    body:"",
    name:"",
    email:"",
}
// var probando
function pr(){
fetch("http://localhost:3000/posts")
.then((request)=>{
return request.json()
})
.then((info)=>{
    info.forEach(element => {
        const { title, body, id} = element
        const numtoletters= convert_tens_hundreds(id)
        // const creatButton=document.createElement("button")
        // creatButton.setAttribute("class", `btn btn-primary btn-lg`)
        // creatButton.setAttribute("id", id)
        // creatButton.setAttribute("value", "click")
        // creatButton.innerHTML="Show Info"
        // creatButton.addEventListener("click", ()=>{
        //     console.log("kjasndkjasn")
        // })
        loadPage(title, numtoletters, body, id)
        if(id <= 10){
          first.innerHTML += contentFUll
          // document.getElementById("contentFull").innerHTML += contentFUll
        }else if(id > 10 && id <= 20){
          second.innerHTML += contentFUll
          // console.log(second)
        } else if(id > 20 && id <=30){
        third.innerHTML += contentFUll
        }else if(id >30 && id <= 40){
          fourth.innerHTML += contentFUll
        }else if(id >40 && id <= 50){
          five.innerHTML += contentFUll
        }else if(id >50 && id <= 60){
          six.innerHTML += contentFUll
        }else if(id > 60 && id<= 70){
          seven.innerHTML += contentFUll
        }else if (id > 70 && id<= 80){
          eight.innerHTML+= contentFUll
        }else if(id >80 && id <= 90){
          nine.innerHTML += contentFUll
        }else if(id >90 && id <=100){
          ten.innerHTML+= contentFUll
        }
        // document.getElementById(numtoletters).appendChild(creatButton)
        // p= document.querySelector(".prueba")
        // p.addEventListener("click", ()=>{
        //     console.log("kajsndkjns")
        // })
        // $(`#${id}`).on("click", ()=>{
        //   console.log("toco el id")
        // })
        // setInterval(() => {
          
        // }, 00);
        setTimeout(() => {
          $(`#${id}`).on("click", ()=>{
            console.log($(`#${id}`)[0].id)
            infoPosts= info.filter(post=> {if(post.id == $(`#${id}`)[0].id) {
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
          })
          // console.log(document.querySelector(`.${id}`))
          // $(`.${id}`).on("click", ()=>{
          //   console.log("entro?")
          // })
        }, 00);
    });
})
}
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


function loadPage(title,id, body, idbutton){
    contentFUll=`
    <div class="card">
      <div class="card-header">
        <h5 class="mb-0">
          <button class="btn  btn-link " data-toggle="collapse" data-target="#${id}" aria-expanded="true" aria-controls="collapseOne">
          ${title}
          </button>
        </h5>
      </div>
      <div id="${id}" class="collapse hide pli" aria-labelledby="headingOne" data-parent="#contentFull">
        <div class="card-body lp">
        <h5>${body}</h5>
        <button type="button" class=" prueba btn btn-info" id="${idbutton}">More</button>
        </div>
      </div>`
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

  // var tt= document.getElementById("contentFull").children
  // setTimeout(() => {
  //     console.log(tt.length)
      
  // }, 1000);
// console.log(document.getElementById("contentFull").children)


function chargeInf(data){
  pr()
  document.getElementById("dataContent").appendChild(data)
}

function changeData(other){
  // return false
  other.innerHTML=""
  $("#contentFull").remove()
  chargeInf(other)
}
// document.getElementById("secondbtn").addEventListener("click", ()=>{
//   second.innerHTML=""
//   $("#contentFull").remove()
//   chargeInf(second)
// })
// document.getElementById("thirdbtn").addEventListener("click", ()=>{
//   third.innerHTML=""
//   $("#contentFull").remove()
//   chargeInf(third)
// })
// document.getElementById("onebtn").addEventListener("click", ()=>{
//   first.innerHTML=""
//   $("#contentFull").remove()
//   chargeInf(first)
// })
function buttons(){
  contentbtnfunc= `<button type="button" class="btn btn-outline-info" onclick="changeData(first)">1</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(second)" >2</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(third)">3</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(fourth)">4</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(five)">5</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(six)">6</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(seven)">7</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(eight)">8</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(nine)">9</button>
  <button type="button" class="btn btn-outline-info" onclick="changeData(ten)">10</button>`
  document.getElementById("centerbtn").innerHTML = contentbtnfunc
}
window.onload = function(){
  // All code comes here 
  chargeInf(first)
  buttons()
}