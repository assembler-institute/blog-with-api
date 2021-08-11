// Variables of template
const cards = document.querySelector(".cards");
const template = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

// Variables of modal
let btnClose = document.querySelector(".btn-close");
let exampleModal = document.getElementById("exampleModal");
let editModal = document.getElementById("edit-Modal");

// Variables of alert
const alertSuccess = document.querySelector(".alert-success")
const alertDanger = document.querySelector(".alert-danger")

// Template
fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((data) => {
    //console.log(data.length);
    data.slice(0, 20).forEach((ele) => {
      //console.log(ele);
      // template.querySelector(".card-img-top").setAttribute("src", "../assets/img/levitan.jpg")

      template.querySelector(".btn-info").setAttribute("data-id", `${ele.id}`)
      template.querySelector(".btn-edit").setAttribute("data-id", `${ele.id}`)
      template.querySelector(".card-title").textContent = ele.id + ". " + ele.title;
      // template.querySelector(".card-text").textContent = ele.body;

      let clone = document.importNode(template, true);
      fragment.appendChild(clone);    
    });
    cards.appendChild(fragment);

    const listBtn = document.querySelectorAll(".btn-info");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".post-text");
    const modalUser = document.querySelector(".modal-user");
    const modalEmail = document.querySelector(".modal-email");
    const modalComments = document.querySelector(".card-body-comment");
    const modalCommentName = document.querySelector(".card-body-name");
    const modalCommentEmail = document.querySelector(".card-body-email");

    // Modal to display info
    listBtn.forEach((element) => {
      element.addEventListener("click", event => {
        // console.log(element.dataset.id)
        displayModal(element.dataset.id)
      });
    });

    function displayModal(id) {
      exampleModal.style.display = "block";
      exampleModal.classList.add("show");
      // console.log(id)
      displayModalInfo(id)
    }

    function displayModalInfo(id) {
      fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data[id-1])
          modalUser.textContent = data[id-1].name
          modalEmail.textContent = data[id-1].email
        })

      fetch("http://localhost:3000/posts")
        .then((res) => res.json())
        .then((data) => {
          modalTitle.textContent = data[id-1].title
          modalBody.textContent = data[id-1].body
        })

      fetch("http://localhost:3000/comments")
        .then((res) => res.json())
        .then((data) => {
          modalCommentName.textContent = data[id-1].name
          modalCommentEmail.textContent = data[id-1].email
          modalComments.textContent = data[id-1].body
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
          // console.log(id)
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
      // console.log(formTitle.value)
      fetch("http://localhost:3000/posts/${id}", {
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

// editModalBtn.forEach((element) => {
//   element.addEventListener("click", event => {
//     //console.log(element.dataset.id)
//     displayModalEdit(element.dataset.id)
//   });
// });

// let editModal = document.getElementById("edit-Modal")
// function displayModalEdit(id) {
//   editModal.style.display = "block";
//   editModal.classList.add("show");
//       // console.log(id)
//       //displayModalEdit(id)
// };

// let btnCloseEdit = document.querySelectorAll(".btn-close-edit");
// btnCloseEdit.forEach((element) => {
//   element.addEventListener("click", ()=> {editModal.style.display = "none"})
// });
