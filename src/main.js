const container = document.querySelector('.article__section--posts');

const postUrl = 'http://localhost:3000/posts';
const commentUrl = 'http://localhost:3000/comments';

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
        const editButton = document.querySelectorAll('[role="btn-edit"]');
        editButton.forEach((element) => {

            element.addEventListener('click', () => {
                fetch('http://localhost:3000/posts/' + element.dataset.id, {
                    method: 'PATCH',
                });
                console.log(element);
            });
        });

        // BUTTON DELETE
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


//** FUNCTION THAT GET POSTID AND ID FROM DATA BASE **//
let idNumber = [];
let postIdNumber = [];

//This function get ID from current post comment
function getId() {
    fetch(postUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((idValue) =>
                idNumber.push(idValue.id),
            )
        })
}

//This function get postID from the user which comment the post
function getPostId() {
    fetch(commentUrl)
        .then((response) => response.json())
        .then((data) => {
            data.map((item) => {
                postIdNumber.push(item.postId)
            })
        })
}

//** BUTTON ONLOAD **//
const btnLoadComments = document.getElementById('btnLoadComments');
btnLoadComments.addEventListener('click', loadComment);

function loadComment() {
    getId();
    getPostId()
    const commentModal = document.getElementById("commentModal");
    const divCommentModal = document.createElement('div');
    divCommentModal.className = ('modal__comment', 'ps-4');
    commentModal.appendChild(divCommentModal);
    const commentName = document.createElement('h6');
    commentName.textContent = "Comment Name";

    const commentBody = document.createElement('p');
    commentBody.textContent = "comment body";

    const commentEmail = document.createElement('p');
    commentEmail.textContent = "userEmail";

    divCommentModal.append(commentName, commentBody, commentEmail);
    btnLoadComments.className = 'd-none';

    console.log(idNumber);
    console.log(postIdNumber);
}




// if(item.postId === postIdData) {
//     commentName.textContent = item.name,
//     commentEmail.textContent = item.email,
//     commentBody.textContent = item.body
// }