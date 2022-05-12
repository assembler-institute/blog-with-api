function createPost(post) {

    let cardContainer = document.getElementById("card-container");
    let template = document.getElementById("cardTemplate");
    let cardPost = template.cloneNode(true);

    let cardIMG = document.getElementById("cardIMG");
    let cardTitle = document.getElementById("cardTitle");
    let cardText = document.getElementById("cardText");
    let cardComments = document.getElementById("cardComments");

    cardIMG.src = "./src/assets/card03.jpg";
    cardTitle.innerText = post.title;
    cardText.innerText = post.body;
    cardComments.innerText = post.id;
    template.hidden = false;

    cardContainer.appendChild(cardPost);
}

export {
    createPost
};