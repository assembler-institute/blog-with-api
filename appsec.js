function createEvents() {
    var cards = document.querySelectorAll(".cards");
    console.log(cards);
    for (let index = 0; index < cards.length; index++) {
        cards[index].addEventListener("click", () => {
            createModal();
        });
    }
}

function createModal() {
    alert("HolaqueaC");
}

createEvents();