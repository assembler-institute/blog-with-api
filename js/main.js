var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

fetch("../data/posts.json")
.then(response=>response.json())
.then(data=>{
    data.forEach(element=>{
        console.log(element.title); 
    })
});