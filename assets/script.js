
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let result1;

  fetch("http://localhost:3000/posts", requestOptions)
    .then(response => response.text())
    .then(result => {result1 = JSON.parse(result)
        console.log(result1)
        updatePostsList(result1)
    })
    .catch(error => console.log('error', error));


function updatePostsList(result1, index){
    result1.forEach(item => {
        let div1 = document.createElement("div")
        div1.innerHTML =  `<div class="title1">
                            `+ item.title +`
                            </div>
                            <div class="body1">
                            `+ item.body +`
                            </div>`
        div1.setAttribute("class","User-container")
        div1.setAttribute("id","User-container-"+item.id)
        document.body.appendChild(div1)
        div1.addEventListener("click",function (){
            createModal(item)
        })
    });
}


function createModal(item, cb){
    let bigDiv = document.createElement("div")
    bigDiv.classList.add("modalTransparent")
    bigDiv.setAttribute("id","modal")
    $("body").append(bigDiv)

    let smallDiv = document.createElement("div")
    smallDiv.classList.add("modalSmall")
    bigDiv.appendChild(smallDiv)

    let titleDiv = document.createElement("div")
    titleDiv.classList.add("title-container")
    titleDiv.textContent = "Text title: "+ item.title;
    smallDiv.appendChild(titleDiv)

    // let jQueryDiv = document.createElement("div")
    // jQueryDiv.classList.add("jQuery-container")
    // smallDiv.appendChild(jQueryDiv)

    // let jScriptDiv = document.createElement("div")
    // jScriptDiv.classList.add("javaScript-container")
    // smallDiv.appendChild(jScriptDiv)

    // let buttonsDiv = document.createElement("div")
    // buttonsDiv.classList.add("buttons-container")
    // smallDiv.appendChild(buttonsDiv)

    // let button1 = document.createElement("button")
    // button1.classList.add("buttons-modal")
    // button1.setAttribute("id","show-solution-button")
    // button1.textContent = "Show Solution"
    // buttonsDiv.appendChild(button1)

    // let button2 = document.createElement("button")
    // button2.classList.add("buttons-modal")
    // button2.setAttribute("id","solution-button")
    // button2.textContent = "Validate"
    // buttonsDiv.appendChild(button2)

    removeModal(bigDiv)

}
function removeModal(child){
    let bigDivClose = document.getElementById("modal")
    bigDivClose.addEventListener("click",(e)=>{
        if(e.target.matches(".modalTransparent")){
            document.body.removeChild(child)
            bigDivClose.removeEventListener;
        }
    })
}