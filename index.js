// const templateBlock = document.getElementById("valor-anterior").content;
const templateForm= document.getElementById("valor-actual");
const templateTitle = document.querySelector(".formtitle");
const templateContainer = document.querySelectorAll("#operador");
const templateFragment = document.createDocumentFragment()

// document.addEventListener("DOMcontentLoadedr", getdata)

// function getall() {

// }
// (()=>{
function getdata(){
    const postTitle = document.querySelector(".postTitle")
    var containerGeneral=  document.querySelector(".containerGeneral")
    // const bodySh = document.getElementById("bodySel")
    const dataFragment = document.createDocumentFragment()

    fetch("http://localhost:3000/posts?_start=0&_end=12")
        .then((res) => res.json())
       
        .then(json=>{
            
            console.log(json)
            json.forEach(element => {
                
                var divCardContent= document.createElement("div")
                divCardContent.classList.add("card")
                divCardContent.classList.add("col-4")
                divCardContent.style.width= "100%"
                var divCarbody= document.createElement("div")
                divCarbody.classList.add("card-body")
                var titteCarbody= document.createElement("h5")
                titteCarbody.classList.add("card-title")
                titteCarbody.innerHTML= element.title
                var pCarbody= document.createElement("p")
                pCarbody.classList.add("card-text")
                pCarbody.innerHTML= element.body
                var aCarbody= document.createElement("button")
                aCarbody.classList.add("btn-primary")
                aCarbody.classList.add("btn")
                aCarbody.setAttribute("data-bs-toggle","modal" )
                aCarbody.setAttribute("data-bs-target","#exampleModal" )
                aCarbody.innerHTML= "open"
                aCarbody.addEventListener("click",()=>deleteContent(json,element))
               
                divCarbody.appendChild(titteCarbody)
                divCarbody.appendChild(pCarbody)
                divCarbody.appendChild(aCarbody)
                divCardContent.appendChild(divCarbody)
                dataFragment.appendChild(divCardContent)
                

            });
            containerGeneral.appendChild(dataFragment)
        })
}

function deleteContent (json,element){
    const modalContent=  document.querySelector(".modal-body")
    modalContent.innerHTML="";
    open(json,element,modalContent)
}

function open(json,element,modalContent){
    const modalFragment = document.createDocumentFragment()

    var titteCarbody= document.createElement("h5")
    titteCarbody.classList.add("card-title")
    titteCarbody.innerHTML= element.title
    
    var pCarbody= document.createElement("p")
    pCarbody.classList.add("card-text")
    pCarbody.innerHTML= element.body

    modalFragment.appendChild( titteCarbody)
    modalFragment.appendChild(  pCarbody)
    modalContent.appendChild(modalFragment)
}




getdata ()

var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)