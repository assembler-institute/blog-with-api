// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("bi-pencil-square");

/* setTimeout(() => {
    for (const iterator of btn) {
        iterator.addEventListener("click", createModal);
    }
}, 0); */

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function createModal() {
    let user
    modal.style.display = "block";
}

/* // When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
} */

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        var fatherModal = document.querySelector('.modal');
        var childModal = document.querySelector('.modal-content')
        childModal.remove();
        fatherModal.style.display = 'none'
    }
}

/* Modal form */

// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//     'use strict'

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.querySelectorAll('.needs-validation')

//     // Loop over them and prevent submission
//     Array.prototype.slice.call(forms)
//         .forEach(function (form) {
//             form.addEventListener('submit', function (event) {
//                 if (!form.checkValidity()) {
//                     event.preventDefault()
//                     event.stopPropagation()
//                 }

//                 form.classList.add('was-validated')
//             }, false)
//         })
// })()