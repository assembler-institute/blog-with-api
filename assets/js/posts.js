let page = 1;
//Get list of posts
fetch(`http://localhost:3000/posts?_page=${page}&_limit=9`)
  .then((response) => response.json())
  .then((data) => renderPosts(data));

//function that calls the render posts functions
function renderPosts(data) {
  let div = document.createElement("div");
  let cont = 0;
  data.forEach((post) => {
    renderPost(post, cont, div);
    cont++;
  });
}

//Render posts
function renderPost(post, cont, div) {
  let main = document.getElementById("app");
  if (cont % 3 === 0) {
    div.className = "row";

    div.innerHTML += `
      <div class="col-lg-4 col-md-6 col-sm-12">
        <div class="card m-auto my-2" style="">
          
          <div class="card-body position-relative" data-id="${post.id}">
          <img src="./assets/images/image.jpg" class="card-img-top" alt="..." data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${post.id}">
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
        
        <div class="card-body position-relative" data-id="${post.id}">
        <img src="./assets/images/image.jpg" class="card-img-top" alt="..." data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${post.id}">
          <h5 class="card-title card__letters">${post.title}</h5>
          <!--<p class="card-text">${post.body}</p>-->
        </div>
      </div>
    </div>
  `;
  }
}

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop >= scrollHeight) {
    showMorePosts();
  }
});

async function showMorePosts() {
  page++;
  const postResponse = await fetch(`http://localhost:3000/posts?_page=${page}&_limit=3`);
  const postData = await postResponse.json();
  renderPosts(postData);
}
