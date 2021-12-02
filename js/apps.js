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
    //console.log(e.target);
    if(e.target instanceof SVGElement){
        if(e.target instanceof SVGPathElement) {
            new Modal(e.target.parentNode.parentNode.parentNode.children[1].textContent, e.target.parentNode.parentNode.parentNode.children[2].textContent, true);
        }
        else new Modal(e.target.parentNode.parentNode.children[1].textContent, e.target.parentNode.parentNode.children[2].textContent, true);
    } else {
        new Modal(e.target.parentNode.children[1].textContent, e.target.parentNode.children[2].textContent, true);
    }
}

var mainRow = document.getElementsByClassName("mainRow")
for (let i = 0; i < mainRow.length -1 ; i++) {
    mainRow[i].addEventListener("click", openModal)
}
