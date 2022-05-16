import { getPost, getUserinfo, getComments } from "./api.js"

const BlogPosts = document.getElementById('blog__posts');
const modalPostTitle = document.getElementById('post__title');
const modalPostBody = document.getElementById('post__body');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const loadCommentsBtn = document.getElementById('btnLoadComments');
const commentsList = document.getElementById('commentsList');


//Esto permite que con click cambiemos el contenido del modal



function displayPost() {
  getPost().then(dataPost => {
    for(let i = 0; i < 20; i++) {
   // console.log(dataPost[i]);
   let dataId = dataPost[i].id;
   let dataTitle = dataPost[i].title;
   let dataBody = dataPost[i].body;

   let userId = dataPost[i].userId;

    let postData = postStructure ( dataId, dataTitle, dataBody, userId );
    //console.log(postData);
    BlogPosts.append(postData);

    }
  })
}

// crear el plantilla del post html

function postStructure(id, title, body, userId){

let postContainer=document.createElement('article');
postContainer.classList.add('post__container', 'border', 'border-dark');

let postTitle= document.createElement('h3');
postTitle.classList.add('post__title','mx-4');


let postContent = document.createElement('div');
postContent.classList.add('d-flex');

let postText = document.createElement('p');
postText.classList.add('post__content', 'mx-4');

let postRemoveBtn = document.createElement('button');
postRemoveBtn.classList.add('post__remove__btn', 'btn-outline-secondary', 'my-auto', 'mx-2', 'rounded');
postRemoveBtn.setAttribute('type', 'button');
postRemoveBtn.setAttribute('data-id', id);
postRemoveBtn.textContent = '❌';

let postEditBtn = document.createElement('button');
postEditBtn.classList.add( 'post__edit__btn', 'my-auto', 'mx-2', 'rounded', 'btn-outline-success');
postEditBtn.setAttribute('type', 'button');
postEditBtn.setAttribute('data-id', id);
postEditBtn.textContent = '✏️';

let postInfoButn = document.createElement('button');
postInfoButn.classList.add( 'post__edit__btn', 'my-auto', 'mx-2', 'rounded', 'btn-outline-warning');
postInfoButn.setAttribute('type', 'button');
postInfoButn.setAttribute('data-id', id);

// Esto permite que se abra el modal por Boostrap 👇🏻
postInfoButn.setAttribute('data-bs-toggle', 'modal');
postInfoButn.setAttribute('data-bs-target', "#modal__wrapp");

postRemoveBtn.addEventListener('click', ()=>{
 // 1- crear una fetch DELETE en api.js
  // 2- llamar a displayPost()
});

postInfoButn.textContent = 'ℹ️';

postInfoButn.addEventListener('click', (e) =>{
  console.log(id)

  clearComments();
  
  modalPostTitle.textContent = title;
  modalPostBody.textContent = body;
  
  let userData = getUserinfo(userId);
  userData.then(data =>{
    userName.textContent = data[0].username;
    userEmail.textContent = data[0].email;

  })
  //Asigna el postid como atributo del boton cada vez que se abre el modal
  loadCommentsBtn.setAttribute('data-postid', id)

});


//Cambia los elementos del modal con los datos del post
postTitle.textContent = title;
postText.textContent = body;


postContent.append(postText, postInfoButn, postRemoveBtn, postEditBtn,);
postContainer.append(postTitle, postContent);

return postContainer;

}




//Eliminamos comentarios del modal
function clearComments(){
  while(commentsList.firstChild){
    
    commentsList.removeChild(commentsList.lastChild)
  }
}

// Conseguimos los comentarios de cada usuario 
loadCommentsBtn.addEventListener("click", (e)=>{
  let postId = e.target.getAttribute("data-postid");
  
  
  //obtenemos el response de traer los comentarios usando el fetch
  let  allComments = getComments(postId)
  
  //eliminamos los comentarios anteriores
  clearComments();

  // crear lista de comentarios añadiendo el titulo y el body en cada uno de ellos
  
  allComments.then(data=>{
    data.forEach(comment =>{
      console.log(comment)
      //creamos los elementos del DOM
      let commentContainerLi = document.createElement('li')
      let commentTitle = document.createElement('p')
      let commentBody = document.createElement('p')
      
      //asignamos el titulo y el body de cada comentario
      commentTitle.textContent = comment.name;
      commentBody.textContent = comment.body;
      //añadimos los elementos de titulo y body al contenedor li
      commentContainerLi.append(commentTitle, commentBody )
      //añadimos el contenedor li a la lista de comentarios ul
      commentsList.append(commentContainerLi)
    })
  })
})

displayPost();

//Iterar a travs de data



/* fetch('https://jsonplaceholder.typicode.com/users/')
.then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));


fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));
 */
