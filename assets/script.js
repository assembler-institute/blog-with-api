var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let result1
  fetch("http://localhost:3000/posts", requestOptions)
    .then(response => response.text())
    .then(result => {result1 = JSON.parse(result)
        console.log(result1)
    })
    .catch(error => console.log('error', error));



