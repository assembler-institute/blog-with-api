
const postsURL = fetch("https://jsonplaceholder.typicode.com/posts/");
const contentBody = document.getElementById('modal__body-content');
const contentTitle = document.getElementById('modal__title-content');

const userBodyPost = document.getElementById('user__body--post');
const userNamePost = document.getElementById('user__name--post');
const userEmailPost = document.getElementById('user__email--post');
/*  */
const commentBox = document.getElementById('collapseWidthExample');

const paraTitle = document.createElement('p');
const paraBody = document.createElement('p');
const paraEmail = document.createElement('p');
/*  */
const collapseWidthExample = document.getElementById('collapseWidthExample'); //cajita pal comentario

function loadPosts(){
    postsURL
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            const mainContainer = document.getElementById('cards-container');
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card', 'container__card--post');
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            const titleLink = document.createElement('a');
            titleLink.setAttribute('href','javaScript:void(0)')
            titleLink.setAttribute('data-bs-toggle', 'modal')
            titleLink.setAttribute('data-bs-target', '#exampleModal')
            titleLink.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);
            const delIcon = document.createElement('i');
            const cardText = document.createElement('p');
            const btnAdd = document.createElement('button');
            const btnDel = document.createElement('button');
            const addIcon = document.createElement('i');
            cardText.classList.add('card-text');
            cardText.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1)).slice(0, 80) + '...';
            const boxUserComment = document.createElement('div');
            boxUserComment.classList.add('card', 'card-body', 'toggle__comment--box');
            
            paraTitle.classList.add('toggle__comment--para');
            paraBody.classList.add('toggle__comment--para');
            paraEmail.classList.add('toggle__comment--para');
            
            titleLink.setAttribute('id', post.userId);

            addIcon.classList.add('bi', 'bi-pen');
            delIcon.classList.add('bi', 'bi-trash3-fill');
            btnAdd.classList.add('btn', 'btn-success');
            btnDel.classList.add('btn', 'btn-outline-danger');

            cardTitle.addEventListener('click', () =>{
                userBodyPost.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1));
                contentTitle.textContent = (post.title.charAt(0).toUpperCase() + post.title.slice(1));
                let titleLinkId = titleLink.getAttribute('id')
                userNamePost.textContent = getUser(titleLinkId);
                userEmailPost.textContent = getUser(titleLinkId);
                paraTitle.textContent = getComments(titleLinkId);
                paraBody.textContent = getComments(titleLinkId);
                paraEmail.textContent = getComments(titleLinkId);
                
                contentBody.append(userBodyPost, userNamePost, userEmailPost);
                boxUserComment.append(paraTitle, paraBody, paraEmail);
                collapseWidthExample.append(boxUserComment);
            });

            cardTitle.append(titleLink)
            btnDel.append(delIcon);
            btnAdd.append(addIcon);
            mainContainer.append(cardContainer);
            cardContainer.append(cardBody);
            cardBody.append(cardTitle, cardText, btnAdd, btnDel);
        });
    })
    .catch(error => {
        console.log(error);
    });
}

function getUser(idUser){
    fetch(`http://localhost:3000/users?id=${idUser}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            userNamePost.textContent = 'Written by: ' + user.name;
            userEmailPost.textContent = 'Email: ' + user.email;
        });
    })
    .catch(error => {
        console.log(error);
    });
};

function getComments(idPost){
    fetch(`http://localhost:3000/comments?postId=${idPost}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(comment => {
            //console.log('Title: ' + comment.name + ' ----- Comment: ' + comment.body + ' ------- Email: ' + comment.email);
            paraTitle.textContent = comment.name;
            paraBody.textContent = comment.body;
            paraEmail.textContent = comment.email;
            //comment.name.toUpperCase();
        });
    })
    .catch(error => {
        console.log(error);
    });
}
//getComments(1);

/*
async function loadComments(idPost){
    const response = await fetch(`http://localhost:3000/comments?postId=${idPost}`);
    const comments = await response.json();
    comments.forEach(comment => {
        paraTitle.textContent = comment.name;
        paraBody.textContent = comment.body;
        paraEmail.textContent = comment.email;
    });
} 
*/
//loadComments(1);


loadPosts();