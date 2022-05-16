/*  Event Modal 
/* 
const addPostBtn = document.getElementById('add__post');
const viewPostContentBtns = document.querySelector('#post__edit__btn');




addPostBtn.addEventListener('click', openEditor)

function openEditor(){
 
const editorOpen = new bootstrap.Modal(document.getElementById("editor__wrapper"));

editorOpen.show();
}

viewPostContentBtns.addEventListener('click', openModalPost)

function openModalPost(){
  
const modalPost = new bootstrap.Modal(document.getElementById("modal__wrapp"));

modalPost.show();

} */