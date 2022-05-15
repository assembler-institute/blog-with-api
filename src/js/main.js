const usersURL = fetch("https://jsonplaceholder.typicode.com/users/");
const postsURL = fetch("https://jsonplaceholder.typicode.com/posts/");
const commentsURL = fetch("https://jsonplaceholder.typicode.com/comments/");

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
            cardTitle.textContent = post.title.charAt(0).toUpperCase() + post.title.slice(1);
            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = (post.body.charAt(0).toUpperCase() + post.body.slice(1)).slice(0, 80) + '...';
            const link = document.createElement('a');
            link.setAttribute('href', '#');
            link.classList.add('card-link');
            link.textContent = "read more...";

            mainContainer.append(cardContainer);
            cardContainer.append(cardBody);
            cardBody.append(cardTitle, cardText, link);
        });
    })
    .catch(error => {
        return error
    });
}

loadPosts();