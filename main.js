let btnMore = document.getElementById("button--more");
let divCont = document.getElementById("container--grid");

//---------------------------------------------------CARUSEL PICTURES

document.getElementById("carousel-1").src =
  "https://picsum.photos/id/30/1000/400";
document.getElementById("carousel-2").src =
  "https://picsum.photos/id/45/1000/400";
document.getElementById("carousel-3").src =
  "https://picsum.photos/id/55/1000/400";

//---------------------------------------------------ADDING IDS TO CARDS AND MORE

function ids() {
  let cards = document.querySelectorAll(".card");
  for (let index = 0; index < cards.length; index++) {
    //We are adding ids to the cards and buttons

    cards[index].id = `id-${index}`;
    let btnModal = cards[index].querySelector("a");
    btnModal.id = `btn-${index}`;

    //Now we set the data-bs-toggle and data-bs-target which Bootstrap requires

    btnModal.dataset.bsToggle = "modal";
    btnModal.dataset.bsTarget = "#modal--main";

    //We get the information of each post and fill the cards with it

    fetch(`http://localhost:3000/posts/${index + 1}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        cards[index].querySelector(".card-title").textContent = response.title;
        cards[index].querySelector(".card-text").textContent =
          response.body.substring(0, 30) + "...";
      });

    //We get a new picture for each card

    cards[index].querySelector("img").src = `https://picsum.photos/id/${
      index + 10 + index
    }/300`;

    //We add the event listener to each button

    btnModal.addEventListener("click", fillingModal);
  }
}

ids();

//---------------------------------------------------FILLING THE MODAL'S CONTENT

function fillingModal(e) {
  //We are getting the button's id ("btn-x") and slicing only the number. It comes as string so we parse it
  let btnID = parseInt(e.target.id.slice(4, e.target.id.length));
  let modal = document.querySelector("#modal-content");
  let modalTitle = document.getElementById("modal_title");
  let userInfo = document.createElement("section");
  let listComments = document.createElement("section");
  let btnComments = document.querySelector("#btn-comments");
  let btnEdit = document.querySelector("#btn-edit");
  let btnDelete = document.querySelector("#btn-delete");
  let modalBody = document.getElementById("modal_body");

  //We search inside the API for the post with the btnID + 1 id

  fetch(`http://localhost:3000/posts/${btnID + 1}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      modalTitle.innerHTML = `${response.id} - <span id="title-post">${response.title}</span>`;
      modalBody.textContent = response.body;

      //Whenever you call a function with a local parameter like userID (myFunct(parameter)), you pass the value of the parameter to the second function
      let userID = response.userId;
      userData(userID);
    });

  //We need the user's information to fill the modal

  function userData(userID) {
    fetch(`http://localhost:3000/users/${userID}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        //First of all, we erase any other possible user's info and comments
        let list_comments = document.getElementById("list-comments");
        let user_info = document.getElementById("user-info");

        if (user_info || list_comments) {
          user_info.remove();
          list_comments.remove();
        }
        let footer = document.querySelector(".modal-footer");
        if (footer.classList.contains("d-none"))
          footer.classList.remove("d-none");

        //if (!modalFooter) modal.appendChild(cloneFooter);
        //Then we create a new section with the user's info and insert it dynamically in the modal-content div

        userInfo.id = "user-info";
        userInfo.className = "modal-body";
        userInfo.style.borderTop = "1px solid lightgrey";
        let username = document.createElement("p");
        username.innerHTML = `<b>${response.name}</b>`;
        let mail = document.createElement("p");
        mail.innerHTML = response.email;
        userInfo.appendChild(username);
        userInfo.appendChild(mail);
        modal.insertBefore(userInfo, modal.children[2]); //As we do not want it appended as the last child, we use the insertBefore method to add it after the third element of the div
      });
  }

  btnComments.addEventListener("click", function myComments() {
    fetch(`http://localhost:3000/comments?postId=${btnID + 1}&_limit=2`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        document.querySelector(".modal-footer").classList.add("d-none");
        listComments.id = "list-comments";
        for (let comment of response) {
          listComments.innerHTML += `
          <div class="modal-body d-flex" style="border-top: 1px solid lightgrey;">
            <div class="flex-grow-1">
              <p><b>${comment.name}</b></p>
              <p>${comment.body}</p>
              <p><b>${comment.email}</b></p>
            </div>
            <div class="d-flex flex-column align-items-start gap-2" id="icons-div">
              <a href="">
                <img src="./img/writing.svg" style="width: 2rem">
              </a>
              <a href="">
                <img src="./img/eraser.svg" style="width: 2rem">
              </a>
            </div>
          </div>
          `;
          modal.insertBefore(listComments, modal.children[3]);
        }
      });
    //! Very important: if we do not delete the event listener, the user may click again and there are bugs
    //! It also gets duplicated the next time we load other comments if we do not remove it here!
    btnComments.removeEventListener("click", myComments);
  });

  btnEdit.addEventListener("click", editPost);
  btnDelete.addEventListener("click", deletePost);
}

//---------------------------------------------------EDIT POST

function editPost() {
  let title = document.getElementById("title-post");
  let body = document.getElementById("modal_body");

  //We erase here the buttons to give more space inside the modal
  document.querySelector(".modal-footer").classList.add("d-none");

  //Now the title and the body of the post must appear as editable textareas
  body.innerHTML = `
  <textarea name="textarea" id="textarea-body" class="w-100" style="height: 8rem">${
    document.getElementById("modal_body").textContent
  }</textarea>`;

  title.innerHTML = `
  <textarea name="textarea" id="textarea-title" class="w-100" style="height: 2.5rem">${
    document.getElementById("title-post").textContent
  }</textarea>`;

  //We reset the user-info div so that it has the new button "Edit"
  document.getElementById("user-info").innerHTML = `
  <div class="modal-body d-flex">
            <div class="flex-grow-1">
              ${document.getElementById("user-info").innerHTML}
            </div>
            <div class="d-flex align-items-center">
            <button type="button" id="btn-confirm" class="btn btn-warning">
            Edit
          </button>
            </div>
          </div>
  `;
  //We need to remove the event listener of the button to avoid conflicts and duplications
  document.querySelector("#btn-edit").removeEventListener("click", editPost);

  //And now we set the new confirm "Edit" button to patch the changes
  document
    .querySelector("#btn-confirm")
    .addEventListener("click", function confirmEdit() {
      let idAgain = eval(
        document.querySelector("#modal_title").textContent.substring(0, 2)
      );
      let titleArea = document.querySelector("#textarea-title").value;
      let bodyArea = document.querySelector("#textarea-body").value;

      fetch(`http://localhost:3000/posts/${idAgain}`, {
        method: "PATCH",
        body: JSON.stringify({ title: titleArea, body: bodyArea }),
        headers: { "Content-type": "application/JSON; charset:UTF-8" },
      }).then((response) => {
        response.json();
      });
      document
        .querySelector("#btn-confirm")
        .removeEventListener("click", confirmEdit);
    });
}

//---------------------------------------------------DELETE POST

function deletePost() {
  let idAgain2 = eval(
    document.querySelector("#modal_title").textContent.substring(0, 2)
  );
  fetch(
    `http://localhost:3000/posts/${idAgain2}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/JSON; charset:UTF-8" },
    },
    null
  ).then((response) => {
    response.json();
  });
  document
    .querySelector("#btn-delete")
    .removeEventListener("click", deletePost);
}
