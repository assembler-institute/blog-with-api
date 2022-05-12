const urlPosts = "http://localhost:3000/posts";


const getPosts = () => {
  fetch(urlPosts)
    .then(data => data.json())
    .then(posts => {
      posts.forEach(post => {
        if(post.title)
        createPost(post);
      });
    })
}
function createPost(post) {

  let cardContainer = document.getElementById("card-container");
  let template = document.getElementById("cardTemplate");
  let cardPost = template.cloneNode(true);

  let cardIMG = document.getElementById("cardIMG");
  let cardTitle = document.getElementById("cardTitle");
  let cardText = document.getElementById("cardText");
  let cardComments = document.getElementById("cardComments");

  cardIMG.src = "./src/assets/card03.jpg";
  cardTitle.innerText = post.title;
  cardText.innerText = post.body;
  cardComments.innerText = post.id;
  template.hidden = false;

  cardContainer.append(cardPost);
}

window.onload = getPosts;

/*TESTS FUNCTIONS*/
/*****************/

// const getPosts = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const posts = await response.json()
//   posts.forEach(post => {
//     const h2El = document.createElement('h2')
//     h2El.innerText = post.title

//     document.body.appendChild(h2El)
//   })
// }
// getPosts()

// const createPost = async () => {
//   const newPost = {
//     "userId": 11,
//     "id": 501,
//     "title": "this is a test",
//     "body": "i am a new post created form the function createPost"
//   }
//   const settings = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newPost)
//   }

//   console.log(newPost);
//   const response = fetch('http://localhost:3000/posts', settings)
//   console.log(response)
// }
// createPost();


// function newPost() {
//   const newPost = {
//     "userId": 11,
//     "id": 501,
//     "title": "this is a test",
//     "body": "i am a new post created form the function createPost"
//   }

//   fetch("http://localhost:3000/posts", {
//     method: "POST",
//     body: newPost
//   });
// }

// newPost();