const container = document.querySelector('.article__section--posts');

const postUrl = 'http://localhost:3000/posts';

fetch(postUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      let div = document.createElement('div');

      //   Post title
      let title = document.createElement('h3');
      title.classList.add('section__post--title');
      title.textContent = element.title;
      div.appendChild(title);
      //   post body
      let body = document.createElement('p');
      body.textContent = element.body;
      div.appendChild(body);
      console.log(body);

      container.classList.add('flex-column');
      container.appendChild(div);
    });
  });
