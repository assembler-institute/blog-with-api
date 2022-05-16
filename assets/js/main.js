import {getPost} from "./api"

function displayPost() {
  getPost().then(dataPost => {
    console.log(dataPost)
  })
}
displayPost();





/* 

// fetch('https://jsonplaceholder.typicode.com/posts/')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     postContent1.textContent = data[1].body

    
//     })
//   .then(response => console.log('Success:', JSON.stringify(response)))
  
  


fetch('https://jsonplaceholder.typicode.com/users/')
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


/*   Probando cosas , un listado y luego comprimo con parse */
/*   let baul = '{"students": [' +
    '{"name": "Javier" , "age": 19 , "year": 1},' +
    '{"name": "Pepe", "age": 56, "year": 1},' +
		'{"name": "Adria", "age": 20, "year": 1},' +
    '{"name": "Raro", "age": 4, "year": 3},' +
    '{"name": "King", "age": 18, "year": 1}]}';


    /* Convertir el JSON a string */
/* let data = JSON.stringify(baul);
console.log(baul);
 */ 
/* fetch('https://jsonplaceholder.typicode.com/posts',{
  method:'POST',
 headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'name': 'Javier',
    'userId': "One",
    'id':'1',
    'title':'New project',
    'body':'Things to storage'
  })
}).then(res =>{
  return res.json()
})
.then(data => console.log(data))
.catch(error => console.log('ERROR'));







fetch('https://jsonplaceholder.typicode.com/users',{
  method:'POST',
 headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'id': "2",
    'username':'Javier',
    'email':'dogsouldev@gmail.com',
  })
}).then(res =>{
  return res.json()
})
.then(data => console.log(data))
.catch(error => console.log('ERROR'));




// fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .then(response => console.log('Success:', JSON.stringify(response)))
//   .catch(error => console.error('Error:', error));



fetch('https://jsonplaceholder.typicode.com/posts/1/comments',{
  method:'POST',
 headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    'postId': "2",
    'id':'Javier',
    'name':'Adding new things',
    'email':'dogsouldev@gmail.com',
    'body':'this is the body of the comment',
  })
}).then(res =>{
  return res.json()
})
.then(data => console.log(data))
.catch(error => console.log('ERROR'));



/!*  Event Modal */

const addPostBtn = document.getElementById('add__post');
const viewPostContentBtns = document.querySelector('#post__edit__btn');




addPostBtn.addEventListener('click', openEditor)

function openEditor(){
 
const editorOpen = new bootstrap.Modal(document.getElementById("editor__wrapper"));

editorOpen.show();
}

viewPostContentBtns.addEventListener('click', openModalPost)

function openModalPost(){
  
const modalPost = new bootstrap.Modal(document.getElementById("modal__wrapp"));

modalPost.show();

}
