document.addEventListener('DOMContentLoaded', (event) => {

    for(i=0; i<10; i++){

    var template = document.getElementById("card-temp").content;
    let clone = document.importNode(template, true);
    
    document.getElementById("cards-container").appendChild(clone)
    }
  });