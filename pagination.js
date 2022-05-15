const btnI12= document.querySelector("#btnI12")
const btn1doc= document.querySelector("#btn1doc")
const btn2doc= document.querySelector("#btn2doc")
const btn3doc= document.querySelector("#btn3doc")
const btnL12= document.querySelector("#btnL12")
const btnLast= document.querySelector("#btnLast")


btnI12.addEventListener("click", blogIni)
btn1doc.addEventListener("click", blog1doc)
btn2doc.addEventListener("click", blog2doc)
btn3doc.addEventListener("click", blog3doc)
btnL12.addEventListener("click", blogEnd)
btnLast.addEventListener("click", blocLast)

function blogIni(){
    remove()
    if(initialPost>13){
    initialPost=initialPost-12;
    endPost=endPost-12;
    }
    else{
    initialPost=0;
    endPost=12;
    }
    getdata(endPost,initialPost)
}
function blog1doc(){
    remove()
    initialPost=0;
    endPost=12;
    getdata(endPost,initialPost)
}
function blog2doc(){
    remove(divGeneral)
    initialPost=13;
    endPost=25;
    getdata(endPost,initialPost)
}
function blog3doc(){
    remove()
    initialPost=26;
    endPost=38;
    getdata(endPost,initialPost)
}
function blogEnd(){
    remove()
    initialPost=initialPost+12;
    endPost=endPost+12;
    getdata(endPost,initialPost)
}
function blocLast(){
    remove(divCarbody)
    initialPost=totalPost-12;
    endPost=totalPost
    getdata(endPost,initialPost)
    
}
function remove(){
var divGeneral = document.querySelector(".containerGeneral")
    while (divGeneral.lastChild){
    console.log(divGeneral)
    divGeneral.removeChild(divGeneral.lastChild)
    }
}

