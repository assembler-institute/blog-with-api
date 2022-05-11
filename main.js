

const getPosts = async () => {
  const response = await fetch('http://localhost:3000/posts')
  const posts  =  await response.json()
  return posts
}



const createPost = async () => {
  const newPost = {
    "userId": 11,
    "id": 1,
    "title": "this is a test",
    "body": "i am a new post created form the function createPost"
  }
  const settings = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost)
  }
  const response = await fetch('http://localhost:3000/posts', settings)
  
  console.log(response)
}

createPost()