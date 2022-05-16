const container = document.querySelector('.article__section--posts');

const postUrl = 'http://localhost:3000/posts';

fetch(postUrl)
  .then((response) => response.json())
  .then((postsArray) => {
    postsArray.forEach((post) => {
      let template = document.getElementById('post');

      const h3 = template.content.querySelector('h3');
      h3.textContent = post.title;

      const p = template.content.querySelector('p');
      p.textContent = post.body;

      template.content.querySelector('[role="button"]').dataset.id = post.id;

      template.content.querySelector('[role="btn-edit"]').dataset.id = post.id;

      const clone = document.importNode(template.content, true);
      container.appendChild(clone);
    });

    // BUTTON EDIT
    let editButton = document.querySelectorAll('[role="btn-edit"]');
    editButton.forEach((button) => {
      button.addEventListener('click', () => {
        // remove cooments
        const commentsDivs = document.querySelectorAll('.test');
        commentsDivs.forEach((element) => element.remove());
        // Modal post api
        fetch('http://localhost:3000/posts/' + button.dataset.id)
          .then((response) => response.json())
          .then((post) => {
            const title = document.querySelector('.modal-title');
            const body = document.querySelector('.modal-body');
            title.textContent = post.title;
            body.textContent = post.body;
            //  Modal user api
            fetch('http://localhost:3000/users/' + post.userId)
              .then((res) => res.json())
              .then((user) => {
                const modalUser = document.querySelector('#userName');
                const modalEmail = document.querySelector('#email');
                modalUser.textContent = user.name;
                modalEmail.textContent = user.email;
              });
            // Button comments
            const cmtBtn = document.getElementById('comments');
            cmtBtn.addEventListener('click', () => {
              fetch('http://localhost:3000/comments?postId=' + post.id)
                .then((res) => res.json())
                .then((comments) => {
                  console.log(comments);
                  // Every comment setting
                  comments.forEach((comment) => {
                    const commentsContainer = document.createElement('div');
                    commentsContainer.classList.add('test');
                    const commentsBody = document.createElement('p');
                    const commentsName = document.createElement('h6');
                    const commentsEmail = document.createElement('p');
                    commentsName.textContent = comment.name;
                    commentsBody.textContent = comment.body;
                    commentsEmail.textContent = comment.email;
                    commentsContainer.appendChild(commentsName);
                    commentsContainer.appendChild(commentsBody);
                    commentsContainer.appendChild(commentsEmail);
                    cmtBtn.insertAdjacentElement('afterend', commentsContainer);
                    cmtBtn.style.display = false;
                  });
                });
            });
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
