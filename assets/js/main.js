/* `<div class="row">
<div class="col-lg-4 col-md-6 col-sm-12">
  <div class="card m-auto my-2" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>
<div class="col-lg-4 col-md-6 col-sm-12">
  <div class="card m-auto my-2" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>
<div class="col-lg-4 col-md-6 col-sm-12">
  <div class="card m-auto my-2" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
        content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>

</div>` */

//Get list of posts
fetch("http://localhost:3000/posts")
  .then((response) => response.json())
  .then((data) => renderPosts(data));

function renderPosts(data) {
  let div = document.createElement("div");
  let cont = 0;
  data.forEach((post) => {
    renderPost(post, cont, div);
    cont++;
  });
}

function renderPost(post, cont, div) {
  let main = document.getElementById("app");
  if (cont % 3 === 0) {
    div.className = "row";

    div.innerHTML += `
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card m-auto my-2" style="">
          
          <div class="card-body position-relative">
          <img src="./assets/images/image.jpg" class="card-img-top" alt="...">
            <h5 class="card-title card__letters">${post.title}</h5>
            <!-- <p class="card-text">${post.body}</p>-->
          </div>
        </div>
      </div>
    `;
    main.appendChild(div);
  } else {
    let lastPosition = document.querySelectorAll(".row").length - 1;
    document.querySelectorAll(".row")[lastPosition].innerHTML += `
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card m-auto my-2" style="">
        
        <div class="card-body position-relative">
        <img src="./assets/images/image.jpg" class="card-img-top" alt="...">
          <h5 class="card-title card__letters">${post.title}</h5>
          <!--<p class="card-text">${post.body}</p>-->
        </div>
      </div>
    </div>
  `;
  }
}
