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
function openModal() {
    console.log(mainRow)
}
var mainRow = document.getElementsByClassName("mainRow")
for (let i = 0; i < mainRow.length; i++) {
    mainRow[i].addEventListener("click", openModal)
}

