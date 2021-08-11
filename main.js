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

let cards = document.querySelectorAll(".card");

function ids() {
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
  }
}

ids();
