var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

var numId=1

//Get Tittles
//data[0].title
window.onload= getPosts()



function  getPosts(){
 fetch("https://jsonplaceholder.typicode.com/posts?userId="+numId)
  .then(response => response.json())
  .then(data => {
    data.forEach(function (element,i){
      
      $(".titlePost").eq(i).text(element.title);
    })
    
    $(".titlePost").on("click",infoModal);
    $(".titlePost").attr("data-bs-toggle", "modal")
    $(".titlePost").attr("href", "#exampleModalToggle")
  })
}

async function infoModal(e){
    var target=e.target.textContent
    var user;
    var comments;
    //GET POST
    await fetch("https://jsonplaceholder.typicode.com/posts?title="+target)
    .then(response=>response.json())
    .then(data=>{
      return target=data[0]
    })
     //GET USER
    await fetch("https://jsonplaceholder.typicode.com/users?id="+target.userId)
    .then(response=>response.json())
    .then(data=>{
      return user=data[0]
    })
    //GET COMMENTS
    await fetch("https://jsonplaceholder.typicode.com/comments?postId="+target.id)
  .then(response=>response.json())
  .then(data=>{
    console.log(data.length);
    return comments=data.length;
  })
    //DISPLAY INFO
    $("#modalPost-title").text(target.title);
    $("#username").text(user.username);
    $("#email").text(user.email);
    $("#description").text(target.body);
    $("#comments").text(comments+" Comments")
    $(".loadComments").eq(0).on("click",loadComments);
}

function loadComments(){

}
async function getComments(num=1){
  
}
