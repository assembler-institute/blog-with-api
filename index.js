const displayValorAnterior = document.getElementById("valor-anterior");
const displayValorActual= document.getElementById("valor-actual");
const buttonNumber = document.querySelectorAll(".numero");
const buttonOperador = document.querySelectorAll("#operador");


//Agregar numero//
function agregarNumber() {
  if (operacion == "") {
    num1 = num1 + buttonNumber.innerHTML;
    console.log(num1);
    display.innerHTML = num1;
  } else {
    num2 = num2 + btn0.innerHTML;
    console.log(num2);
    display.innerHTML = num2;