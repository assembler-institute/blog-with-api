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

            template.content.querySelector('[role="button"]').dataset.id = element.id;

            template.content.querySelector('[role="btn-edit"]').dataset.id = element.id;

            const clone = document.importNode(template.content, true);
            container.appendChild(clone);


        });

        // BUTTON EDIT
        const editButton = document.querySelectorAll('[role="btn-edit"]');
        editButton.forEach((button) => {
            //MODAL POST API
            button.addEventListener('click', () => {
                const commentsDivs = document.querySelectorAll('.test');
                commentsDivs.forEach((comment) => {
                    comment.remove();
                })
                fetch('http://localhost:3000/posts/' + button.dataset.id)
                    .then((res) => res.json())
                    .then((post) => {
                        const title = document.querySelector('.modal-title')
                        const body = document.querySelector('.modal-body')
                        title.textContent = post.title;
                        body.textContent = post.body;
                        // MODAL USER API
                        fetch('http://localhost:3000/users/' + post.userId)
                            .then((res) => res.json())
                            .then((user) => {
                                const modalUser = document.querySelector('#userName');
                                const modalEmail = document.querySelector('#email');
                                modalUser.textContent = user.name;
                                modalEmail.textContent = user.email;
                            })
                            const btnCmt = document.getElementById('btnLoadComments')
                        btnCmt.addEventListener('click', () =>{
                            fetch('http://localhost:3000/comments?postId=' + post.id)
                            .then((res) => res.json())
                            .then((comments) => {
                            comments.forEach((comment) => {
                                const commentsContainer = document.createElement('div');
                                commentsContainer.classList.add("test");
                                console.log(commentsContainer);
                                const commentsBody = document.createElement('p');
                                const commentsName = document.createElement('h6');
                                const commentsEmail = document.createElement('p');
                                commentsName.textContent = comment.name;
                                commentsBody.textContent = comment.body;
                                commentsEmail.textContent = comment.email;
                                commentsContainer.appendChild(commentsName);
                                commentsContainer.appendChild(commentsBody);
                                commentsContainer.appendChild(commentsEmail);
                                btnCmt.insertAdjacentElement('afterEnd', commentsContainer);

                                //REMOVE BTN AFTER CLICK
                                const btnRemove = document.getElementById('btnLoadComments');
                            })
                            })
                            }
                        )
                    })
            });

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
// function getPostId() {
//     fetch(commentUrl)
//         .then((response) => response.json())
//         .then((data) => {
//             data.map((item) => {
//                 postIdNumber.push(item.postId)
//             })
//         })
// }

//** BUTTON ONLOAD **//
// const btnLoadComments = document.getElementById('btnLoadComments');
// btnLoadComments.addEventListener('click', loadComment);

// function loadComment() {
//     getId();
//     // getPostId();
//     const commentModal = document.getElementById("commentModal");
//     const divCommentModal = document.createElement('div');
//     divCommentModal.className = ('modal__comment', 'ps-4');
//     commentModal.appendChild(divCommentModal);
//     const commentName = document.createElement('h6');
//     commentName.textContent = "Comment Name";

//     const commentBody = document.createElement('p');
//     commentBody.textContent = "comment body";

//     const commentEmail = document.createElement('p');
//     commentEmail.textContent = "userEmail";

//     divCommentModal.append(commentName, commentBody, commentEmail);
//     btnLoadComments.className = 'd-none';

//     console.log(idNumber);
//     fetch(commentUrl)
//         .then((response) => response.json())
//         .then((data) => {
//             data.map((item) => {
//                 // postIdNumber.push(item.postId)
//                 if(item.postId === 30) {
//                     commentName.textContent = item.name,
//                     commentEmail.textContent = item.email,
//                     commentBody.textContent = item.body
//                 }
//             })
//         })
// }



// console.log(postIdNumber === idNumber.length);
// function compareId() {
//     idNumber.filter((element) =>postIdNumber.includes(console.log(element)));
// }