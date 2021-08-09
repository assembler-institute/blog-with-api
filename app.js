let cardy = `<template class="drawer" ><div class="card" id="card"><p class="title" id="title">I am the title</p></div></template>`;

let btnTest = document.querySelector(".button");

btnTest.addEventListener("click", createCard);

function getPosts() {
    return fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((json) => console.log(json));
}

function createCard() {
    let cardCont = document.getElementById("grid");
    cardCont.insertAdjacentHTML("beforeend", cardy);
    let rempCardy = document.querySelector(".drawer").content;
    let copyCardy = document.importNode(rempCardy, true);
    cardCont.appendChild(copyCardy);
    getPosts();
}