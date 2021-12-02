// const displayValorAnterior = document.getElementById("valor-anterior");
// const displayValorActual= document.getElementById("valor-actual");
// const buttonNumber = document.querySelectorAll(".numero");
// const buttonOperador = document.querySelectorAll("#operador");


// document.addEventListener("DOMcontentLoadedr", getall)

// function getall() {

// }
// (()=>{
function getdata(){
    const userSh = document.getElementById("userSel")
    const bodySh = document.getElementById("bodySel")
    const dataFragment = document.createDocumentFragment()

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then(json=>{
            console.log(json)
            json.forEach(element => {
                var userLi= document.createElement("li")
                userLi.innerHTML= element.name
                dataFragment.appendChild(userLi)
            });
        userSh.appendChild(dataFragment)
        })
}
// })

getdata ()