// URL'S
const post_url = "https://jsonplaceholder.typicode.com/posts";
const users_url = "https://jsonplaceholder.typicode.com/users";
const comments_url = "https://jsonplaceholder.typicode.com/comments/";

// Function that prints all titles and bodys in new div

function showPost() {
  fetch(post_url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((data) => {
        let divBox = document.querySelector(".divBox");

        let postDiv = document.createElement("div");
        let h2 = document.createElement("h2");
        let h4 = document.createElement("h4");

        postDiv.setAttribute("class", "post-preview");
        postDiv.setAttribute("data_id", data.id);
        postDiv.setAttribute("data_userId", data.userId);
        postDiv.setAttribute("data-toggle", "modal");
        postDiv.setAttribute("data-target", "#myModal");
        h2.setAttribute("class", "post-title");
        h4.setAttribute("class", "post-subtitle");

        h2.textContent = data.title;
        h4.textContent = data.body;

        postDiv.appendChild(h2);
        postDiv.appendChild(h4);
        divBox.appendChild(postDiv);
        postDiv.addEventListener("click", showModalContent);
      });
    });
}
showPost();
//Here we fetch the id and show the title and body in the modal
function showModalContent() {
  document.querySelector(".modal-comments").style.display = "none";

  let post_id = this.getAttribute("data_userId");
  let post_userId = this.getAttribute("data_userId");

  getPostById(post_id);
  getUserByUserId(post_userId);
  getCommentsById(post_id);

  document.querySelector(".loadCommentsBtn").onclick = function () {
    document.querySelector(".modal-comments").style.display = "block";
  };
}

function getPostById(post_id) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "__cfduid=d8283c461a9f4a01b3eeae68fd6947e0e1619514382"
  );

  var file = "<file contents here>";

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://jsonplaceholder.typicode.com/posts?id=" + post_id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      document.querySelector(".modal-title").innerHTML = result[0].title;
      document.querySelector(".modal-body").innerHTML = result[0].body;
    })
    .catch((error) => console.log("error", error));
}
//Here we fetch the userId and show the name and email in the modal
function getUserByUserId(post_userId) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "__cfduid=d8283c461a9f4a01b3eeae68fd6947e0e1619514382"
  );

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://jsonplaceholder.typicode.com/users?id=" + post_userId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      document.querySelector(".modal-username").innerHTML =
        "Name: " + result[0].name;
      document.querySelector(".modal-email").innerHTML =
        "Email: " + result[0].email;
    })
    .catch((error) => console.log("error", error));
}
//Here we fetch the comments by article id and show them in the modal
function getCommentsById(post_id) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "__cfduid=d8283c461a9f4a01b3eeae68fd6947e0e1619514382"
  );

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=" + post_id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      result = JSON.parse(result);
      result.forEach((comment) => {
        let parentComment = document.querySelector(".modal-comments");
        let loadCommments = document.createElement("div");
        let p = document.createElement("p");
        loadCommments.setAttribute("class", "loadComments");
        p.innerHTML = comment.body;
        loadCommments.appendChild(p);
        parentComment.appendChild(loadCommments);
      });
    })
    .catch((error) => console.log("error", error));
}
function carouselContent() {
  fetch(post_url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((data) => {
        letcarousel_caption = document.querySelector(".carousel-caption");
        carousel_btn = document.querySelector(".carousel_btn");
        carousel_title = document.querySelector(".carousel-title");

        carousel_title.innerHTML = data.title;
      });
    });
}
carouselContent();
