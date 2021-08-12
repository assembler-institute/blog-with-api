let btnMore = document.getElementById("button--more");
let divCont = document.getElementById("container--grid");

//---------------------------------------------------CARUSEL PICTURES

document.getElementById("carousel-1").src =
  "https://picsum.photos/id/30/1000/400";
document.getElementById("carousel-2").src =
  "https://picsum.photos/id/45/1000/400";
document.getElementById("carousel-3").src =
  "https://picsum.photos/id/55/1000/400";

//---------------------------------------------------LOAD MORE POSTS







// btnMore.addEventListener("click", function loadPosts() {
//   let row1 = document.createElement("div");
//   row1.className = "row gap-2";
//   row1.textContent();
//   let row2 = document.createElement("div");
//   row2.className = "row gap-2";
//   divCont.appendChild(row1);
//   divCont.appendChild(row2);
// });

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

    fetch(`https://jsonplaceholder.typicode.com/posts/${index + 1}`)
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
  let modalBody = document.getElementById("modal_body");
  let userInfo = document.createElement("section");
  let listComments = document.createElement("section");
  let btnComments = document.querySelector("#btn-comments");

  //We search inside the API for the post with the btnID + 1 id

  fetch(`https://jsonplaceholder.typicode.com/posts/${btnID + 1}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      modalTitle.textContent = response.title;
      modalBody.textContent = response.body;

      //Whenever you call a function with a local parameter like userID (myFunct(parameter)), you pass the value of the parameter to the second function
      let userID = response.userId;
      userData(userID);
    });

  //We need the user's information to fill the modal

  function userData(userID) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userID}`)
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
    fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${
        btnID + 1
      }&_limit=2`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        document.querySelector(".modal-footer").classList.add("d-none");
        listComments.id = "list-comments";
        for (let comment of response) {
          let commentDiv = document.createElement("div");
          commentDiv.className = "modal-body";
          commentDiv.style.borderTop = "1px solid lightgrey";
          let commentUserName = document.createElement("p");
          commentUserName.innerHTML = `<b>${comment.name}</b>`;
          let commentMail = document.createElement("p");
          commentMail.innerHTML = `<b>${comment.email}</b>`;
          let commentBody = document.createElement("p");
          commentBody.innerHTML = comment.body;
          commentDiv.appendChild(commentUserName);
          commentDiv.appendChild(commentBody);
          commentDiv.appendChild(commentMail);
          listComments.appendChild(commentDiv);
          modal.insertBefore(listComments, modal.children[3]);
        }
      });
    //! Very important: if we do not delete the event listener, the user may click again and there are bugs
    //! It also gets duplicated the next time we load other comments if we do not remove it here!
    btnComments.removeEventListener("click", myComments);
  });
}
