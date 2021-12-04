//import { printImage } from "./photos"

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
var arrayPosts=[]
var numId=1
//Get Tittles
//data[0].title
window.onload= function(){
  getPosts(1)
  Activatepagination()
}

function Activatepagination(){
  $(".page-item").on("click",changePage)
}

function changePage(e){
  //Check if numId is higher or lower than 10-1, comeback to 1
  if(numId>10 || numId<1){
    numId=1;
    //remove previous button disabled
  }else if(numId>1){
    $(".page-item").eq(0).removeClass("disabled")
    $(".page-item").eq(0).css("cursor","pointer")
  }
  if(e.target.textContent=="Previous"){
    numId--;
    getPosts()
  }else if(e.target.textContent=="Next"){
    numId++;
    getPosts();
  }else{
    numId=e.target.textContent;
    getPosts();
  }
  $(".page-item").removeClass("active");
  $(".page-item").eq(numId).addClass("active")
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

async function infoModal(e,nextPrev){
    resetModal();
    var target;
    var test;
    if(e!=undefined){
      test=$(e.target).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
      target=e.target.textContent
    }else{
      console.log(nextPrev.textContent);
      target=nextPrev.textContent
      console.log(target);
      test=$(nextPrev).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    }
    
    var user;
    var comments;
    
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
    $(".fa-arrow-right,.fa-arrow-left").on("click",previousPost)
    //DISPLAY INFO
    $("#photoTitle").attr("src",test)

    $("#modalPost-title").text(target.title);
    $("#username").text(user.username);
    $("#email").text(user.email);
    $("#description").text(target.body);
    $(".loadComments").eq(0).one("click",function(){
      loadComments(target.id)
      
    });
}

function previousPost(){
  var numRandom=Math.floor(Math.random()*10);
  var randomPost=($(".divPostDetail").eq(numRandom).children(".titlePost")[0])
  infoModal(undefined,randomPost)
  $(".fa-arrow-right,.fa-arrow-left").off("click",previousPost)
}
function nextPost(){

}

async function loadComments(id){
  await fetch("http://localhost:3000/comments?postId="+id)
  .then(response=>response.json())
  .then(data=>{
    
    data.forEach(function(element,idx){
        
          $("#commentSection").append(`
          <div class="row commentsContainer">
          <div class="row titleComment">${element.title}</div>
            <div class="col">
              <img src="../assets/img/prevpost.jpg" class="photoComment">
            </div>
            <div class="bodyComment col">${element.body}</div>
            <div class="personalInfoComment row">
              <div class="col">${element.name}</div>
              <div class="col">${element.email}</div>
            </div>
          </div>
          `);

    })
  })
}

function resetModal(){
  $(".commentsContainer").empty();
    
}
