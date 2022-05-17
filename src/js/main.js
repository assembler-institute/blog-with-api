
const postsURL = fetch("https://jsonplaceholder.typicode.com/posts/");
const contentBody = document.getElementById('modal__body-content');
const contentTitle = document.getElementById('modal__title-content');

const userBodyPost = document.getElementById('user__body--post');
const userNamePost = document.getElementById('user__name--post');
const userEmailPost = document.getElementById('user__email--post');

const commentBox = document.getElementById('boxForComments');

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
            titleLink.classList.add('card__title--post')
            titleLink.setAttribute('href','javaScript:void(0)')
            titleLink.setAttribute('data-bs-toggle', 'modal')
            titleLink.setAttribute('data-bs-target', '#exampleModal')
            titleLink.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);
            const delIcon = document.createElement('i');
            const cardText = document.createElement('p');
            const addIcon = document.createElement('i');
            cardText.classList.add('card-text');
            cardText.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1)).slice(0, 80) + '...';
            
            titleLink.setAttribute('id', post.userId);
            addIcon.classList.add('bi', 'bi-pen');
            delIcon.classList.add('bi', 'bi-trash3-fill');

            cardTitle.addEventListener('click', () =>{
                userBodyPost.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1));
                contentTitle.textContent = (post.title.charAt(0).toUpperCase() + post.title.slice(1));
                let titleLinkId = titleLink.getAttribute('id')
                
                contentBody.append(userBodyPost, userNamePost, userEmailPost);
                
                getUser(titleLinkId);
                getComment(titleLinkId)
                .then(data => {
                    data.forEach(comment => {
                        const boxUserComment = document.createElement('div');
                        boxUserComment.classList.add('card', 'card-body', 'toggle__comment--box');
                        
                        const paraTitle = document.createElement('p');
                        const paraBody = document.createElement('p');
                        const paraEmail = document.createElement('p');
                        paraTitle.classList.add('toggle__comment--para');
                        paraBody.classList.add('toggle__comment--para');
                        paraEmail.classList.add('toggle__comment--para');

                        paraTitle.textContent = comment.name.charAt(0).toUpperCase() + comment.name.slice(1);
                        paraBody.textContent = comment.body.charAt(0).toUpperCase() + comment.body.slice(1);
                        paraEmail.textContent = comment.email;
                        boxUserComment.append(paraTitle, paraBody, paraEmail);
                        commentBox.appendChild(boxUserComment);
                    });
                })
                updateDisplay();
            });

            cardTitle.append(titleLink)
            mainContainer.append(cardContainer);
            cardContainer.append(cardBody);
            cardBody.append(cardTitle, cardText);
        });
    })
    .catch(error => {
        console.log(error);
    });
}

function getUser(idUser){
    fetch(`https://jsonplaceholder.typicode.com/users?id=${idUser}`)
    .then(response => response.json())
    .then(data => {
         data.forEach(user => {
             userNamePost.textContent = '— ' + user.name;
             userEmailPost.textContent = user.email;
         });
    })
    .catch(error => {
        console.log(error);
    });
};

async function getComment(idPost) {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

function updateDisplay(){
    while (commentBox.firstChild) {
        commentBox.removeChild(commentBox.lastChild);
    }
}

loadPosts();