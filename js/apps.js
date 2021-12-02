import Modal from "./Modal/modal.js";

// Getting the API
fetch("https://jsonplaceholder.typicode.com/posts",
{
    method: "GET",
})
.then(function(res) {
    return res.json();
})
.then(function (json) {
    // console.log(json)
})
fetch("https://jsonplaceholder.typicode.com/users",
{
    method: "GET",
})
.then(function(res) {
    return res.json();
})
.then(function (json) {
    // console.log(json)
})
fetch("https://jsonplaceholder.typicode.com/posts/1/comments", //id 1
{
    method: "GET",
})
.then(function(res) {
    return res.json();
})
.then(function (json) {
    // console.log(json)
})

//Add Event Listeners
function openModal(e) {
    e.stopPropagation();
    if(e.target instanceof SVGElement){
        // console.log(e.target);
        new Modal();
    } else {
        new Modal(e.target.parentNode.children[1].textContent, e.target.parentNode.children[2].textContent);
    }
}


/*const rows = $(".mainRow");
for(let i = 0; i < rows){

}*/
var mainRow = document.getElementsByClassName("mainRow")
for (let i = 0; i < mainRow.length -1 ; i++) {
    mainRow[i].addEventListener("click", openModal)
}
/*var edit = document.getElementsByClassName("edit")
for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener("click", openModal)
    edit[i].style.cursor = "pointer"
}
var del = document.getElementsByClassName("delete")
for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", openModal)
    del[i].style.cursor = "pointer"
}*/
