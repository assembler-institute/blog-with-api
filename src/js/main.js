
const postsURL = fetch("https://jsonplaceholder.typicode.com/posts/");
const commentsURL = fetch("https://jsonplaceholder.typicode.com/comments/");
const contentBody = document.getElementById('modal__body-content');
const contenTitle = document.getElementById('modal__title-content');

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
            const titleLink = document.createElement('a');
            titleLink.setAttribute('href','javaScript:void(0)')
            titleLink.setAttribute('data-bs-toggle', 'modal')
            titleLink.setAttribute('data-bs-target', '#exampleModal')
            cardTitle.classList.add('card-title');
            titleLink.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);
            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1)).slice(0, 80) + '...';
            const btnAdd = document.createElement('button');
            const btnDel = document.createElement('button');
            const addIcon = document.createElement('i');
            const delIcon = document.createElement('i');
            // const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.createElement('p');
            const modalUser = document.createElement('p');
            titleLink.setAttribute('id', post.userId);

            addIcon.classList.add('bi', 'bi-pen');
            delIcon.classList.add('bi', 'bi-trash3-fill');
            btnAdd.classList.add('btn', 'btn-success');
            btnDel.classList.add('btn', 'btn-outline-danger');

            cardTitle.addEventListener('click', () =>{
                contentBody.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1));
                contenTitle.textContent = (post.title.charAt(0).toUpperCase() + post.title.slice(1));
                modalUser.textContent = getUser(titleLink.getAttribute('id'));
                //console.log(titleLink.getAttribute('id'));
                contentBody.append(modalBody, modalUser);
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
        //return data.id;
        data.forEach(element => {
            console.log(element.name);
            //return element.name;
        });
    })
    .catch(error => {
        console.log(error);
    });
};
//getUser(3);

loadPosts();