// const templateBlock = document.getElementById("valor-anterior").content;
const templateForm= document.getElementById("valor-actual");
const templateTitle = document.querySelector(".formtitle");
const templateContainer = document.querySelectorAll("#operador");


const templateFragment = document.createDocumentFragment()

// document.addEventListener("DOMcontentLoadedr", getdata)


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
    const modalheader = document.querySelector(".modal-header")
    modalheader.innerHTML="";
    var userModal= document.querySelector(".name")
    userModal.innerHTML="";
    var emailModal= document.querySelector(".email")
    emailModal.innerHTML="";    
    open(json,element, modalheader,userModal,emailModal)
}

function open(json1,element,modalheader,userModal,emailModal){
    const modalContent=  document.querySelector(".modal-body")
    const modalFragment = document.createDocumentFragment()

    var titleModal= document.createElement("h5")
    titleModal.classList.add("card-title")
    titleModal.innerHTML= element.title

    

    modalheader.appendChild(titleModal)
    modalFragment.appendChild(userModal)
    modalFragment.appendChild(emailModal)
    modalContent.appendChild(modalFragment)
  
    var url1 = "http://localhost:3000/users?id="+element.userId
    fetch(url1)
    .then((res) => res.json())
    .then(json=> {
        userModal.innerHTML= json[0].name
        emailModal.innerHTML= json[0].email
    })
    const btnShowComents=  document.querySelector("#showComents")
    btnShowComents.addEventListener("click",()=>showComents(element,url1))
}

function showComents(element,url1){
    var modalContent2 = document.querySelector("#modalContent2")
   
    console.log("joder")
    var coments= document.createElement("p")
    coments.classList.add("card-title")
    var comentsTitle= document.createElement("h5")
    comentsTitle.classList.add("card-title")
    comentsTitle.innerHTML="Comments"
    modalContent2.appendChild(comentsTitle)
    modalContent2.appendChild(coments)

    var url1 = " http://localhost:3000/comments?id="+element.userId
    fetch(url1)
    .then((res) => res.json())
    .then(json=> {
        coments.innerHTML= json[0].body
    })

}
// var modalEmail = document.createElement("p")
// modalEmail.classList.add("card-text")
// modalEmail.innerHTML= element.email

getdata ()
// var modalbody= document.createElement("p")
// modalbody.classList.add("card-text")
// modalbody.innerHTML= element.body

var myModal = new bootstrap.Modal(document.getElementById('myModal'), options)