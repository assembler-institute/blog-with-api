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
  getPosts()
  printImage()
  Activatepagination()
}
//listeners to pagination
function Activatepagination(){
  $(".page-item").on("click",changePage)
  //if buttons are disabled, turn of event listener
  $(".page-item").on("disabled",function(){
    $(".page-item").off("click",changePage)
  })
}
//when press pagination buttons, activate this function
function changePage(e){
  const item=$(".page-item");
  const button=e.target.textContent
  
  //sum or rest the numId while press paginate buttons
  // && Check if numId is higher or lower than 10-1, comeback to 1
  if(numId==button){
    return;
  }
  if(button>=1 && button<=10){
    item.eq(0).css("cursor","pointer");
    numId=button;
    getPosts();
    printImage()
    }
   
//if press previous, or next, check if can change of page
  if(button=="Previous" && numId>1){
    numId--;
    item.eq(11).removeClass("disabled")
    getPosts()
    printImage()
  }else if(button=="Next" && numId<10){
    numId++;
    item.eq(0).removeClass("disabled")
    getPosts();
    printImage()
    
  }
//put disabled buttons
  if(numId==1){
    item.eq(0).addClass("disabled")
    
  }else if(numId==10){
    item.eq(11).addClass("disabled")
  }
  //remove the disabled for prev and next button
  if(numId<10 && numId>1){
    item.eq(11).removeClass("disabled")
    item.eq(0).removeClass("disabled");
  }

//active page
  item.removeClass("active");
  item.eq(numId).addClass("active");
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
    var target,user,test,comments;
    if(e!=undefined){
      test=$(e.target).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
      target=e.target.textContent
    }else{
      target=nextPrev.textContent
      test=$(nextPrev).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
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
