fetch('http://localhost:3000/posts/2', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "title": 'This is the title'
  })
}).then(res => console.log(res))