let templateHeader = `
<template id ="template-header">
    <header class="bg-dark">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Summon Demons" aria-label="Search">
        <button class="btn btn-outline-light" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<img src="assets/imgHeader.png" class="img-fluid" alt="image">

        <nav class="navbar navbar-light">
            <div class="container-fluid">
                <a  class="navbar-brand lh-lg text-light text-center m-auto fs-1" href="#">
                Blog with API for exorcists
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
