
 /*  Una funcion que nos devuelve los datos solicitados al Fetch */

/* const fetchData = () => {
return fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?source=InciWeb')
.then(response => response.json())
.then(data => (data))
// .then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
} */

/* const showData = () => {
let dataEvents = fetchData()
.then(fetchData => response.json())
  dataEvents.then(data =>{
    console.log(data)
  })
}

showData() */




/*SUPUESTO POST
/* const data = { username: 'example' };

fetch('https://eonet.gsfc.nasa.gov/api/v2.1/events?source=InciWeb', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
}); */
const postContent1 = document.getElementById('post__content1');

fetch('https://jsonplaceholder.typicode.com/posts/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    postContent1.textContent = data[1].body

    
    })
  .then(response => console.log('Success:', JSON.stringify(response)))
  
  

// fetch('https://jsonplaceholder.typicode.com/posts',{
//   method:'POST',
//  headers:{
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     'name': 'Javier',
//     'userId': "One",
//     'id':'1',
//     'title':'New project',
//     'body':'Things to storage'
//   })
// }).then(res =>{
//   return res.json()
// })
// .then(data => console.log(data))
// .catch(error => console.log('ERROR'))





// fetch('https://jsonplaceholder.typicode.com/users/')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .then(response => console.log('Success:', JSON.stringify(response)))
//   .catch(error => console.error('Error:', error));

// fetch('https://jsonplaceholder.typicode.com/users',{
//   method:'POST',
//  headers:{
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     'id': "2",
//     'username':'Javier',
//     'email':'dogsouldev@gmail.com',
//   })
// }).then(res =>{
//   return res.json()
// })
// .then(data => console.log(data))
// .catch(error => console.log('ERROR'))




// fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .then(response => console.log('Success:', JSON.stringify(response)))
//   .catch(error => console.error('Error:', error));



// fetch('https://jsonplaceholder.typicode.com/posts/1/comments',{
//   method:'POST',
//  headers:{
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     'postId': "2",
//     'id':'Javier',
//     'name':'Adding new things',
//     'email':'dogsouldev@gmail.com',
//     'body':'this is the body of the comment',
//   })
// }).then(res =>{
//   return res.json()
// })
// .then(data => console.log(data))
// .catch(error => console.log('ERROR'))

/* 
https://jsonplaceholder.typicode.com/posts/?_start=${initialPosts}&_limit=${limit

let initialPosts = 0;
let limit = 20;

 */


/* 

fetch("https://jsonplaceholder.typicode.com/users/2", {
  method: "DELETE"
})




fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify({ name: "Kyle" })
})





fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify({ name: "Kyle" }),
  headers: { "Content-Type": "application/json" }
})




fetch("https://jsonplaceholder.typicode.com/users", { 
  mode: "same-origin"
}).catch(e => console.error(e))




fetch("https://jsonplaceholder.typicode.com/users", { 
  credentials: "include"
})





const controller = new AbortController()

fetch("https://jsonplaceholder.typicode.com/users", { 
  signal: controller.signal
}).catch(e => console.error(e.name)) // AbortError

controller.abort()





fetch("https://jsonplaceholder.typicode.com/users/-1")
  .then(res => {
    console.log(res.ok) // false
    console.log(res.status) // 404
  })







  fetch("https://jsonplaceholder.typicode.com/users/-1")
  .then(res => {
    if (res.ok) return res.json()
    return Promise.reject(res)
  })
  .then(data => console.log(data))
  .catch(res => console.error(res.status)) // 404







  function jsonFetch(url, { body, headers, ...options } = {}) {
    return fetch(url, {
      headers: { "Content-Type": "application/json", ...headers }
      body: JSON.stringify(body)
      ...options
    })
    .then(res => {
      if (res.ok) return res.json()
      return Promise.reject(res)
    })
    .then(res => res.json())
  } */

