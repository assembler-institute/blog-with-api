// Variables of template
const cards = document.querySelector(".cards");
const template = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

// Variables of modal
const btnClose = document.querySelector(".btn-close");
const exampleModal = document.getElementById("exampleModal");
const editModal = document.getElementById("edit-Modal");

// Variables of alert
const alertSuccess = document.querySelector(".alert-success")
const alertDanger = document.querySelector(".alert-danger")

// Variable scroll content
let listElm = document.querySelector('#infinite-list');
let maximum = 20;
let i = 0;

// Images
const images = ["levitan1.jpg", "levitan2.jpg", "levitan3.jpg", "levitan4.jpg", "levitan5.jpg", "levitan6.jpg", 
"levitan7.jpg", "levitan8.jpg", "levitan9.jpg", "levitan10.jpg", "levitan11.jpg", "levitan12.jpg", 
"levitan13.jpg", "levitan14.jpg", "levitan15.jpg"];


function loadContent() {
  // Template
  fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then(function loadPost (data)  {
    console.log(data[3].userId);
    //console.log(data.length);
    // Detect when scrolled to bottom.
    while (i<maximum) {
      console.log("hola");
      // Choose images randomly
      let random = Math.floor(Math.random() * images.length);
      template.querySelector(".card-img-top").setAttribute("src", `../assets/img/levitan${random+1}.jpg`)
      
      // Set data attributes to button of info modal
      template.querySelector(".btn-info").setAttribute("data-id", `${data[i].id}`)
      template.querySelector(".btn-info").setAttribute("data-userid", `${data[i].userId}`)
      
      // Set data attributes to button of edit modal
      template.querySelector(".btn-edit").setAttribute("data-id", `${data[i].id}`)
      
      // Add content to card
      template.querySelector(".card-title").textContent = data[i].id + ". " + data[i].title;
      
      let clone = document.importNode(template, true);
      fragment.appendChild(clone);    
      i++;
      cards.appendChild(fragment);
    }
    maximum += 20;
  });
  
}
loadContent();

listElm.addEventListener('scroll', function() {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadContent();
  }
});


    const listBtn = document.querySelectorAll(".btn-info");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".post-text");
    const modalUser = document.querySelector(".modal-user");
    const modalEmail = document.querySelector(".modal-email");
    const cardBody = document.querySelector(".card-body");

    // Modal to display info
    listBtn.forEach((element) => {
      element.addEventListener("click", event => {
        displayModal(element.dataset.id,element.dataset.userid)
      });
    });

    function displayModal(id,userId) {
      exampleModal.style.display = "block";
      exampleModal.classList.add("show");

      displayModalInfo(id,userId)
      displayModalComments(id)
    }

    function displayModalInfo(id,userId) {
    

      fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((data) => {
          modalTitle.textContent = data[id-1].title
          modalBody.textContent = data[id-1].body
        })

        
      fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          modalUser.textContent = data[userId-1].name
          modalEmail.textContent = data[userId-1].email
        })
    }

    function displayModalComments(id) {
      fetch(`http://localhost:3000/comments/?postId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          let html = ``;
          data.forEach((element) => {
            console.log(element)
            html += `
            <p class="card-body-name" style="font-weight:bold;">${element.name}</p>
            <p class="card-body-email">${element.email}</p>
            <p class="card-body-comment">${element.body}</p>
            `;
          })
          cardBody.innerHTML = html;
        })
    }

    // Modal to edit info
    let editModalBtn = document.querySelectorAll(".btn-edit");
    let formTitle = document.querySelector(".form-title");
    let formText = document.querySelector(".form-text");

    editModalBtn.forEach((element) => {
      element.addEventListener("click", event => {
        displayModalEdit(element.dataset.id)
      });
    });
    
    function displayModalEdit(id) {
      editModal.style.display = "block";
      editModal.classList.add("show");
      
      displayModalEditInfo(id)
    };

    function displayModalEditInfo(id) {
      fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((data) => {
          formTitle.value = data[id-1].title
          formText.value = data[id-1].body
        })
    }
    
    // Close edit modal
    let btnCloseEdit = document.querySelectorAll(".btn-close-edit");
    btnCloseEdit.forEach((element) => {
      element.addEventListener("click", () => {
        editModal.style.display = "none"})
    });

    // Change data
    let editFormModal = document.querySelector("#edit-form-modal")
    editFormModal.addEventListener("submit", () => {
      fetch("https://jsonplaceholder.typicode.com/posts/${id}", {
        method: "PATCH",
        body: JSON.stringify({
          title: formTitle.value, 
          body: formText.value
        }), 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((res) => res.json())
      .then((data) => {
        alertSuccess.classList.remove("visually-hidden")
      })
      .catch((error) => {
        alertDanger.classList.remove("visually-hidden")
      })
    });

btnClose.addEventListener("click", closeModal);

function closeModal() {
  exampleModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == exampleModal) {
    closeModal();
  }
};


// Create starry night effect
function starryNight() {
  let count = 300;
  let background = document.querySelector(".container");
  let backgroundModal = document.querySelector(".modal")
  let i = 0;

  while (i < count) {
    const star = document.createElement("i");
    
    let x = Math.round(Math.random() * window.innerWidth);
    let y = Math.round(Math.random() * window.innerHeight);

    let duration = Math.random() * 10;
    let size = Math.random() * 2;

    star.style.left = x+'px';
    star.style.top = y+'px';
    star.style.width = 1+size+'px';
    star.style.height = 1+size+'px';

    star.style.animationDuration = 5+duration+'s';
    star.style.animationDelay = duration+'s';

    background.appendChild(star);
    i++;
  }
} 

starryNight()






// //Initially load some items.
// loadMore();