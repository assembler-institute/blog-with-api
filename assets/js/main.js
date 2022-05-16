import {getPost} from "./api"

function displayPost() {
  getPost().then(dataPost => {
    console.log(dataPost)
  })
}
displayPost();





/* 

fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));


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
.catch(error => console.log('ERROR')); */