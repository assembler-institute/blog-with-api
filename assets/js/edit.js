document.addEventListener("click", function (e) {
    if (e.target.matches("[data-edit]")) editPost(e,e.target.dataset.edit);
  });
  
  
  function editPost(e,post){
      e.preventDefault();
    let title = document.querySelector('#edit-title').value;
    let body = document.querySelector('#edit-body').value;

    console.log(title,body);
    fetch(`http://localhost:3000/posts/${post}`,{
      method: 'PATCH',
      body : {"title": title,"body": body}
    })
      .then((response) => response.json())
      .then((post) => {console.log(post)})
      .catch((err) => console.log(err));
  }