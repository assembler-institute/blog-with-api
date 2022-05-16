import { getPost } from "./api.js"


function displayPost() {
  getPost().then(dataPost => {
    console.log(dataPost)
  })
}
// displayPost();


  

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
