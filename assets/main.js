// Variables of template
const cards = document.querySelector(".cards");
const template = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

// Variables of modal
const btnClose = document.querySelector(".btn-close");
const exampleModal = document.getElementById("exampleModal");
const editModal = document.getElementById("edit-Modal");

// Variables of alert
const alertSuccess = document.querySelector(".alert-success");
const alertDanger = document.querySelector(".alert-danger");

// Variable of scrolling content
const listElm = document.querySelector("#infinite-list");
let maximum = 20;
let i = 0;

// Images
const images = [
  "levitan1.jpg",
  "levitan2.jpg",
  "levitan3.jpg",
  "levitan4.jpg",
  "levitan5.jpg",
  "levitan6.jpg",
  "levitan7.jpg",
  "levitan8.jpg",
  "levitan9.jpg",
  "levitan10.jpg",
  "levitan11.jpg",
  "levitan12.jpg",
  "levitan13.jpg",
  "levitan14.jpg",
  "levitan15.jpg",
];

function loadContent() {
  /**********  Load post cards  **********/
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((data) => {
      while (i < maximum) {
        // Choose images randomly
        let random = Math.floor(Math.random() * images.length);
        template
          .querySelector(".card-img-top")
          .setAttribute("src", `../assets/img/levitan${random + 1}.jpg`);

        // Set data attributes to button of info modal
        template
          .querySelector(".btn-delete")
          .setAttribute("data-id", `${data[i].id}`);
        template
          .querySelector(".btn-read")
          .setAttribute("data-id", `${data[i].id}`);
        template
          .querySelector(".btn-read")
          .setAttribute("data-userid", `${data[i].userId}`);

        // Set data attributes to button of edit modal
        template
          .querySelector(".btn-edit")
          .setAttribute("data-id", `${data[i].id}`);

        // Add content to card
        template.querySelector(".card-title").textContent =
          data[i].id + ". " + data[i].title;

        let clone = document.importNode(template, true);
        fragment.appendChild(clone);
        i++;
      }
      cards.appendChild(fragment);
      maximum += 20;

      /**********  Add functionality to buttons   **********/

      // Variables of modal
      const btnDelete = document.querySelectorAll(".btn-delete");
      const listBtn = document.querySelectorAll(".btn-read");
      const modalTitle = document.querySelector(".modal-title");
      const modalBody = document.querySelector(".post-text");
      const modalUser = document.querySelector(".modal-user");
      const modalEmail = document.querySelector(".modal-email");
      const cardBody = document.querySelector(".card-body");
      const editModalBtn = document.querySelectorAll(".btn-edit");
      const formTitle = document.querySelector(".form-title");
      const formText = document.querySelector(".form-text");

      // Display content of modal
      listBtn.forEach((element) => {
        element.addEventListener("click", (event) => {
          displayModal(element.dataset.id, element.dataset.userid);
        });
      });

      function displayModal(id, userId) {
        exampleModal.style.display = "block";
        exampleModal.classList.add("show");

        displayModalInfo(id, userId);
        displayModalComments(id);
      }

      // Display main info of modal including title, body, user and email
      function displayModalInfo(id, userId) {
        fetch("http://localhost:3000/posts")
          .then((res) => res.json())
          .then((data) => {
            modalTitle.textContent = data[id - 1].title;
            modalBody.textContent = data[id - 1].body;
          });

        fetch("http://localhost:3000/users")
          .then((res) => res.json())
          .then((data) => {
            modalUser.textContent = data[userId - 1].name;
            modalEmail.textContent = data[userId - 1].email;
          });
      }

      // Display all comments of each post
      function displayModalComments(id) {
        fetch(`http://localhost:3000/comments/?postId=${id}`)
          .then((res) => res.json())
          .then((data) => {
            let html = ``;
            data.forEach((element) => {
              html += `
            <p class="card-body-name" style="font-weight:bold;">${element.name}</p>
            <p class="card-body-email">${element.email}</p>
            <p class="card-body-comment">${element.body}</p>
            `;
            });
            cardBody.innerHTML = html;
          });
      }

      // Edit content of modal
      editModalBtn.forEach((element) => {
        element.addEventListener("click", (event) => {
          displayModalEdit(element.dataset.id);
        });
      });

      function displayModalEdit(id) {
        editModal.style.display = "block";
        editModal.classList.add("show");

        displayModalEditInfo(id);
      }

      function displayModalEditInfo(id) {
        fetch("http://localhost:3000/posts")
          .then((res) => res.json())
          .then((data) => {
            formTitle.value = data[id - 1].title;
            formText.value = data[id - 1].body;
          });
      }

      // Close edit modal
      let btnCloseEdit = document.querySelectorAll(".btn-close-edit");
      btnCloseEdit.forEach((element) => {
        element.addEventListener("click", () => {
          editModal.style.display = "none";
        });
      });

      // Update info of post
      let editFormModal = document.querySelector("#edit-form-modal");
      editFormModal.addEventListener("submit", () => {
        fetch("https://jsonplaceholder.typicode.com/posts?id=${id}", {
          method: "PATCH",
          body: JSON.stringify({
            title: formTitle.value,
            body: formText.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Success");
          })
          .catch((error) => {
            alert("Error");
          });
      });

      // Delete post
      btnDelete.forEach((element) => {
        element.addEventListener("click", () => {
          let m = element.dataset.id;
          fetch("https://jsonplaceholder.typicode.com/posts?id=${m}", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: null,
          })
            .then((res) => res.json())
            .then((data) => {
              alertSuccess.classList.remove("visually-hidden");
            })
            .catch((error) => {
              alertDanger.classList.remove("visually-hidden");
            });
        });
      });
    });
}

loadContent();

listElm.addEventListener("scroll", function () {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadContent();
  }
});

// Close Modal
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
  let count = 400;
  let background = document.querySelector(".post-container");
  let i = 0;

  while (i < count) {
    const star = document.createElement("i");

    let x = Math.round(Math.random() * window.innerWidth);
    let y = Math.round(Math.random() * window.innerHeight);

    let duration = Math.random() * 10;
    let size = Math.random() * 2;

    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";

    star.style.animationDuration = 5 + duration + "s";
    star.style.animationDelay = duration + "s";

    background.appendChild(star);
    i++;
  }
}

starryNight();
