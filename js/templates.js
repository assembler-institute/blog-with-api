let templateHeader = `
<template id ="template-header">
    <header class="bg-dark">
        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <a  class="navbar-brand lh-lg text-light text-center m-auto fs-1" href="#">
                TITLE
                </a>
            </div>
        </nav>
    </header>
    <main>
        <div class="container-fluid">
            <div id ="grid" class="row row-cols-1">
            </div>
        </div>
    </main>
</template>`;

let templateCard = `
<template id = "template-card">
    <div class="col-sm-4">
        <div class="card mt-3 mb-3" data-bs-target="#staticBackdrop" style="height: 16rem;">
            <div data-post class="card-body d-flex flex-column justify-content-between">
                <h5 class="card-title">Card title</h5>
                <button data-show type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                   + More Info
                </button>
            </div>
        </div>
    </div>
</template>`;

export { templateHeader, templateCard };
