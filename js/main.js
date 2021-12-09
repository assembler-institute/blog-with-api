//import { printImage } from "./photos"

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
var arrayPosts=[]
var numId=1
var target,postSelected;
//Get Tittles
//data[0].title
window.onload= function(){
  getPosts()
  makePagination()
  printImage()
  //delete modal
  $('#exampleModalToggle3').on('shown.bs.modal', function () {
    $("#deleteButton").one("click",deletePost)
  })
  //post modal
  $('#exampleModalToggle').on('shown.bs.modal', function () {
    $(".fa-arrow-right,.fa-arrow-left").on("click",previousPost)
    $("#openEditModal").on("click",editPost)
    $("#deleteButton").off("click",deletePost)
  })
  $('#exampleModalToggle').on('hide.bs.modal', function () {
    resetModal()
  })

}

function  getPosts(){
 fetch("http://localhost:3000/posts?userId="+numId)
  .then(response => response.json())
  .then(data => {
    data.forEach(function (element,i){
      arrayPosts.push(element)
      $(".titlePost").eq(i).text(element.title);
    })
    $(".titlePost").on("click",infoModal);
    $(".titlePost").attr("data-bs-toggle", "modal")
    $(".titlePost").attr("href", "#exampleModalToggle")
    
  })
}

async function deletePost(){
  //spawn card to display error or success
  $("body").append(`<div id="statusMessage"></div>`)
//fetch with delete method
  await fetch("https://jsonplaceholder.typicode.com/posts/"+target.id,{
    method:"DELETE",
  })
  .then(response=>response.json())
  //error msg
  .catch(error=>{
    $("#statusMessage").append(`
                    <div class="alert alert-danger" role="alert">
                      <p id="msg">Your post cannot be deleted</p>!
                  </div>
    `)
  })
  //success msg
  .then(data=>{
    $("#statusMessage").append(`
              <div class="alert alert-success" role="alert">
                <p id="msg">Your post was deleted</p>
              </div>
`)
    //delete post selected
    
    return $(postSelected).parent().parent().hide();
  })
  //hide the message with animation
  setTimeout(function(){
    $("#statusMessage").fadeOut()
    $("#statusMessage").remove()
  },3000)
}

async function infoModal(e,nextPrev){
    
    var user,postImg,comments;
    if(e!=undefined){
      postSelected=e.target
      postImg=$(e.target).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
      target=e.target.textContent
    }else{
      postSelected=nextPrev
      target=nextPrev.textContent
      postImg=$(nextPrev).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }

    //GET POST
    target=arrayPosts.find(element=>element.title==target)
     //GET USER
    await fetch("http://localhost:3000/users?id="+target.userId)
    .then(response=>response.json())
    .then(data=>{
      return user=data[0]
    })
    //GET COMMENTS

    //NEXT POST AND PREV LISTENERS
    
    //DISPLAY INFO
    $(".loadComments").eq(0).one("click", loadComments)
    $("#photoTitle").attr("src",postImg)
    $("#modalPost-title").text(target.title);
    $("#username").text(user.username);
    $("#email").text(user.email);
    $("#description").text(target.body);
}

function previousPost(){
  var numRandom=Math.floor(Math.random()*10);
  var randomPost=($(".divPostDetail").eq(numRandom).children(".titlePost")[0])
  $(".commentsContainer").remove();
  $(".loadComments").off("click", loadComments);
  infoModal(undefined,randomPost)
}

async function loadComments(){
  await fetch("http://localhost:3000/comments?postId="+target.id)
  .then(response=>response.json())
  .then(data=>{

    data.forEach(function(element,idx){

          $("#commentSection").append(`
          <div class="row commentsContainer">
            <div class="titleComment row">
              <div >${element.name}</div>
              <div>${element.email}</div>
            </div>
            <div class="col-2">
              <img src="../assets/img/prevpost.jpg" class="photoComment">
            </div>
            <div class="bodyComment col-10">${element.body}</div>
            <hr>
          </div>
          `);

    })
  })
}

function resetModal(){
  $(".commentsContainer").remove();
  //TURN OFF LISTENER TO DELETE
  //TURN OFF LOAD COMMENTS
  $(".loadComments").off("click", loadComments);
  //TURN OFF PREVIOUS AND NEXT POST
  $(".fa-arrow-right,.fa-arrow-left").off("click",previousPost);
  //turn off edit
  $("#openEditModal").off("click",editPost)
}



//function to edit the post
function editPost(){
    $("#titleEditPost").val(target.title ); //input title
    $("#bodyEditPost").val(target.body) //input body

  $("#aceptEditBtn").on("click", aceptEdit)
}

async function aceptEdit(){
  console.log("acept")

    await fetch("http://localhost:3000/posts/"+target.id,
    {
      method: "PATCH",
      body: JSON.stringify({
        title: $("#titleEditPost").val(),
        body:$("#bodyEditPost").val()
      }),
      headers:{
        "Accept":"*/*",
        "Access-Control-Allow-Origin":"*",
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(data =>{
      $("#modalPost-title").text(data.title)
      $("#description").text(data.body)
    })


}
