const container = document.querySelector('.article__section--posts');

const postUrl = 'http://localhost:3000/posts';

fetch(postUrl)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
      let template = document.getElementById('post');

      const h3 = template.content.querySelector('h3');
      h3.textContent = element.title;

      const p = template.content.querySelector('p');
      p.textContent = element.body;

      const deleteBtn = template.content.querySelector('[role="button"]');
      deleteBtn.dataset.id = element.id;

      const clone = document.importNode(template.content, true);
      container.appendChild(clone);
    });

    // BUTTON EDIT
    let editButton = document.querySelectorAll('[role="btn-edit"]');
    editButton.forEach((element) => {
      element.addEventListener('click', () => {
        fetch('http://localhost:3000/posts/' + element.dataset.id, {
          method: 'PATCH',
        });
      });
    });

    const deleteButtons = document.querySelectorAll('[role="button"]');

    deleteButtons.forEach((element) => {
      element.addEventListener('click', () => {
        // element.parentNode.parentNode.remove()}
        fetch('http://localhost:3000/posts/' + element.dataset.id, {
          method: 'DELETE',
        });
      });
    });
  });
