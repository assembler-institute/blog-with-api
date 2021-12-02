
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let result1;

  fetch("http://localhost:3000/posts", requestOptions)
    .then(response => response.text())
    .then(result => {result1 = JSON.parse(result)
        console.log(result1)
        updatePostsList(result1)
    })
    .catch(error => console.log('error', error));

    var myModal = document.getElementById('btn btn-primary');
    
    myModal.addEventListener('click', function () {
      function updatePostsList(result1)
    })

function updatePostsList(result1){
    result1.forEach(item => {
        let div1 = document.createElement("div")
        div1.innerHTML =  `<div class="title1">
                            `+ item.title +`
                            </div>
                            <div class="body1">
                            `+ item.body +`
                            </div>`
        div1.setAttribute("class","User-container")
        div1.setAttribute("id","User-container-"+item.id)
        document.body.appendChild(div1)
    });
}


