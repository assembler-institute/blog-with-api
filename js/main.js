var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

let arrayPosts=[];
let arrayComments=[];
let arrayUsers=[];

//Get Tittles
//data[0].title
window.onload= printTitle()


async function printTitle(){
    arrayPosts = await getPosts();
    for(var i in arrayPosts)
    {
        $(".titlePost").eq(i).text(arrayPosts[i].title);
        $(".titlePost").eq(i).on("click",infoModal);
    }
    $(".titlePost").attr("data-bs-toggle", "modal")
    $(".titlePost").attr("href", "#exampleModalToggle")
}

async function  getPosts(){
  await fetch('../data/posts.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(function (element){
      arrayPosts.push(element);
    })
  })
  return arrayPosts;
}

async function getUsers(){
  await fetch("../data/users.json")
    .then(response=>response.json())
    .then(data=>{
      data.forEach(function(element){
        arrayUsers,push(element)
      })
    })
    return arrayUsers;
}

async function getComments(){
  await fetch("../data/comments.json")
  .then(response=>response.json())
  .then(data =>{
    data.forEach(function(){
      arrayComments.push(element);
    })
  })
  return arrayComments;
}

async function infoModal(e){
    var target=e.target.textContent
    var user;
    //GET POST
    await fetch('../data/posts.json')
    .then(response => response.json())
    .then(data => {
        return target=data.find(element=>element.title==target)
    })
    console.log(target);
    //GET USER
    await fetch("../data/users.json")
    .then(response=>response.json())
    .then(data=>{
        return user=data.find(element=>element.id==target.userId)
    })
    $("#modalPost-title").text(target.title);
    $("#username").text(user.username);
    $("#email").text(user.email);
    $("#description").text(target.body);
    $(".loadComments").eq(0).on("click",loadComments);
}

function loadComments(){

}
