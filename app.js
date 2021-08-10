let cardy = `<template class="drawer" ><div class="card" id="card"><p class="title" id="title">I am the title</p></div></template>`;

let btnTest = document.querySelector(".button");

btnTest.addEventListener("click", createCard);

function getPosts() {
  return fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      let hola = data;
      console.log(hola);
      //   data.forEach((element) => {
      //     let postTitle = element.title;
      //     let elementID = element.id;
      //     console.log(postTitle, elementID);
      //   });
    });
}

function getComments() {
  return fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        //console.log(element.body);
      });
    });
}

function getUsers() {
  return fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        // console.log(element.username);
      });
    });
}

function createCard() {
  let cardCont = document.getElementById("grid");
  cardCont.insertAdjacentHTML("beforeend", cardy);
  let rempCardy = document.querySelector(".drawer").content;
  let copyCardy = document.importNode(rempCardy, true);
  cardCont.appendChild(copyCardy);
  //copyCardy.setAttribute(data - id, elementID);
  drawCards();
  //getComments();
  //getUsers();
}

function drawCards() {
  getPosts();
  console.log(hola);
  for (let index = 0; index < hola.length; index++) {
    console.log("hola");
  }
}
