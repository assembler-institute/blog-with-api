//let postModal = document.getElementById('postModal')
let listItems = document.querySelectorAll(".list-group-item")
listItems.forEach (element => {
    element.addEventListener("click", ()=> modalWindow(element))
})

function modalWindow(element){
    element.focus()
}


//postModal.addEventListener('shown.bs.modal', function () {
  //myInput.focus()
//})