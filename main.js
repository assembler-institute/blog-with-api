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
    }/200`;

    //We add the event listener to each button

    btnModal.addEventListener("click", fillingModal);
  }
}

ids();

//---------------------------------------------------FILLING THE MODAL'S CONTENT

function fillingModal(e) {
  //We are getting the button's id ("btn-x") and slicing only the number. It comes as string so we parse it
  let id = e.target.id;
  let btnID = parseInt(e.target.id.slice(4, e.target.id.length));
  let modal = document.querySelector("#modal-content");
  let modalTitle = document.getElementById("modal_title");
  let modalBody = document.getElementById("modal_body");

  //We are searching inside the API for the post with the btnID + 1 id

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
        //First of all, we erase any other possible user's info

        for (let m of modal.children) {
          if (m.id === "user-info") m.remove();
        }

        //Then we create a new section with the user's info and insert it dynamically in the modal-content div

        let userInfo = document.createElement("section");
        userInfo.id = "user-info";
        userInfo.className = "modal-body";
        userInfo.style.borderTop = "1px solid lightgrey";
        let username = document.createElement("p");
        username.innerHTML = `<b>Author</b>: ${response.name}`;
        let mail = document.createElement("p");
        mail.innerHTML = `<b>Email</b>: ${response.email}`;
        userInfo.appendChild(username);
        userInfo.appendChild(mail);
        modal.insertBefore(userInfo, modal.children[2]); //As we do not want it appended as the last child, we use the insertBefore method to add it after the third element of the div
      });
  }

  let btnComments = document.querySelector("#btn-comments");
  btnComments.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}&_limit=2`) //!This is temporarily out of service
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        for (let m of modal.children) {
          if (m.id === "list-comments") m.remove();
        }
        let listComments = document.createElement("section");
        listComments.id = "list-comments";
        listComments.style.borderTop = "1px solid lightgrey";
        for (let comment of response) {
          let commentDiv = document.createElement("div");
          commentDiv.className = "modal-body";
          let commentUserName = document.createElement("p");
          commentUserName.innerHTML = `<b>Author</b>: ${comment.name}`;
          let commentMail = document.createElement("p");
          commentMail.innerHTML = `<b>Email</b>: ${comment.email}`;
          let commentBody = document.createElement("p");
          commentBody.innerHTML = `<b>Comment</b>: ${comment.body}`;
          commentDiv.appendChild(commentBody);
          commentDiv.appendChild(commentUserName);
          commentDiv.appendChild(commentMail);
          modal.insertBefore(commentDiv, modal.children[3]);
        }
      });
  });
}
