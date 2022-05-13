let title = document.getElementById('title');
let body = document.getElementById('body');

fetch('./db.json')
.then(function (response){
    return response.json();
})
.then(function (users){
    console.log(users)
    for (var i=0; i<data.length; i++){
        document.getElementById('title').innerHtml +=
        data[i].id+"=>"+data[i].title+"";
        }
    })
    .catch(function(error){
        console.log(error)
    });