const postTitle = document.getElementById("post__title");
const postContent = document.getElementById('post__content');

// fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events")
//   .then(response => response.json())
//   .then(function getdata(data) {
//     console.log(data);

//     let x = Math.floor(Math.random() * (99 - 0 + 1));
//     postTitle.textContent = data.events[x].title;

//   })


const editorBtn = document.getElementById('post__edit__btn')
  
editorBtn.addEventListener("click", function (){
  
    const modalOpen = new bootstrap.Modal(document.getElementById("editor__wrapper"));
    console.log(modalOpen);
    modalOpen.show();

  
})

fetch("http://localhost:3000")
.then(res => res.json())
.then(function getPost(data){
  console.log(data);


})