let templateHeader = `
<template id ="template-header">
    <header class="bg-dark  ">
        <nav class="navbar navbar-light">
            <div class="container">
                <a  class="navbar-brand lh-lg text-light text-center m-auto fs-1" href="#">
                TITLE
                </a>
            </div>
        </nav>
    </header>
    <main>
        <div class="container">
            <div id ="grid" class="row row-cols-3">
            </div>
        </div>
    </main>
</template>`;

let templateCard = `
<template id = "template-card">
    <div class="col">
        <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="username-post"> PRUEBA </p>
                <p class="email-post"> PRUEBA </p>
                <button data-show type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Launch demo modal
                </button>
            </div>
        </div>
    </div>
</template>`;

export { templateHeader, templateCard };
