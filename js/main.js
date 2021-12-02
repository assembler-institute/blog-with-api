var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
const numPosts=[]
function getUsers(type){
    fetch("../data/users.json")
    .then(response=>response.json())
    .then(data=>{
        data.forEach(function(element,idx){
            return element.type; 
        })
    })
}
