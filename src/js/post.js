
var locModal = document.getElementById('myModal');
var btnShow= document.querySelectorAll("button")[1]



// //show the modal
// btnShow.addEventListener('click', (e) => {
//     locModal.style.display = "block";
//     locModal.style.paddingRight = "17px";
//     locModal.className="modal fade show";
//     console.log(e.target)
//     setTitle()
//     setBody()

// });


function openModal(e){
    locModal.style.display = "block";
    locModal.style.paddingRight = "17px";
    locModal.className="modal fade show";
    console.log(e.target)
    setTitle()
    setBody()
}
