var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

let arrayPost=[];
//Get Tittles
//data[0].title
window.onload= printTitle();


async function printTitle(){
  arrayPost = await getPosts();
    for(var i in arrayPost)
    {
      $(".titlePost").eq(i).text(arrayPost[i].title);
      $(".divPostDetail").attr("data-bs-toggle", "modal")
      $(".divPostDetail").attr("href", "#exampleModalToggle")
    }
}

async function  getPosts(){
  await fetch('../data/posts.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(function (element){
      arrayPost.push(element);
    })
  })
  return arrayPost;
}