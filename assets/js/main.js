/!* LOCALHOST JSON */
 
 const localUsers = "http://localhost:3000/users";
 const localPosts = "http://localhost:3000/posts";
 const localComments= "http://localhost:3000/comments";


let theUsers = async() => {
  let response = await fetch(localUsers)
  let users = await response.json()
  return users
}

let thePosts = async() =>{
let response = await fetch(localPosts)
let posts = await response.json()
return posts
}

let theComments= async() =>{
  let response = await fetch(localComments)
  let comments = await response.json()
  return comments
  }








/!*  PLACEHOLDER API JSON */


fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));


fetch('https://jsonplaceholder.typicode.com/posts',{
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





fetch('https://jsonplaceholder.typicode.com/users/')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));

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




fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
  .then(response => response.json())
  .then(data => console.log(data))
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));



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