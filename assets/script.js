let blogGrid = document.getElementById("blog-grid");

for (let i = 1; i < 10; i++) {
    blogGrid.innerHTML += `<div class="card" id="${i}">
    <img src="./assets/images/bg-img.jfif" class="card-img-top" alt="..." />
    <div class="card-body">
        <h5 class="card-title" id="blog-title-${i}">Blog title</h5>
        <p class="card-text" id="blog-body-${i}">
            Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up
            the bulk of the card's content.
        </p>
        <button class="btn btn-primary">Read Blog</button>
    </div>
    </div>`;
}