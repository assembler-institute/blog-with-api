//let postModal = document.getElementById('postModal')
let listItems = document.querySelectorAll(".list-group-item");
let btnClose = document.querySelector('.btn-close');
let exampleModal = document.getElementById("exampleModal");

btnClose.addEventListener("click", closeModal)
listItems.forEach (element => {
    element.addEventListener("click", ()=> modalWindow(element))
})

function modalWindow(element){
    // element.focus()
    exampleModal.style.display = "block"
    exampleModal.classList.add("show")
}

function closeModal() {
  exampleModal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == exampleModal) {
    closeModal()
  }
}

// Variables of template
const cards = document.querySelector(".cards");
const template = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();

// Template 
fetch("http://localhost:3000/posts")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data.length)
    data.slice(0, 20).forEach((ele) => {
      // console.log(ele)
      template.querySelector(".card-img-top").setAttribute("src", "../assets/img/levitan.jpg")

      template.querySelector(".card-title").textContent = ele.id + ". "  + ele.title
      template.querySelector(".card-text").textContent = ele.body

      let clone = document.importNode(template, true);
      fragment.appendChild(clone);
    }) 
    cards.appendChild(fragment);
  })
  
