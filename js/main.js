//import { printImage } from "./photos"

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
var arrayPosts=[]
var numId=1
//Get Tittles
//data[0].title
window.onload= getPosts()


function  getPosts(){
 fetch("https://jsonplaceholder.typicode.com/posts?userId="+numId)
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

async function infoModal(e){
    resetModal();
    var test=$(e.target).parent().parent().css("background-image").replace(/^url\(['"](.+)['"]\)/, '$1');
    var target=e.target.textContent
    var user;
    var comments;
    //GET POST
    target=arrayPosts.find(element=>element.title==target)
    // await fetch("https://jsonplaceholder.typicode.com/posts?title="+target)
    // .then(response=>response.json())
    // .then(data=>{
    //   return target=data[0]
    // })
     //GET USER
    await fetch("https://jsonplaceholder.typicode.com/users?id="+target.userId)
    .then(response=>response.json())
    .then(data=>{
      return user=data[0]
    })
    //GET COMMENTS
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

async function loadComments(id){
  await fetch("https://jsonplaceholder.typicode.com/comments?postId="+id)
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
