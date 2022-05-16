//Global variables
//Get the container from html
let usersData;
let postsComments;
let apiImages;

function getData() {
  let url = "http://localhost:3000";
  const Comments = fetch(`${url}/comments`);
  const Posts = fetch(`${url}/posts`);
  const Users = fetch(`${url}/users`);
  const Images = fetch(
    "https://pixabay.com/api/?key=27437216-9ddae61d97237ec9e5fc37f36&q=nature&image_type=photo&category=nature"
  );

  Posts.then((response) => response.json())
    .then((data) => {
      renderPostTitle(data);
    })
    .catch((error) => console.error(error));
  Comments.then((response) => response.json())
    .then((data) => {
      getComments(data);
    })
    .catch((error) => console.error(error));

  Users.then((response) => response.json())
    .then((data) => {
      getUsers(data);
    })
    .catch((error) => console.error(error));
  Images.then((response) => response.json())
    .then((data) => {
      getImages(data);
    })
    .catch((error) => console.error(error));
}

const getUsers = (users) => {
  usersData = users;
};

const getComments = (comments) => {
  postsComments = comments;
};
const getImages = (images) => {
  apiImages = images;
};


function renderPostTitle(postData) {
  const postsTitlesContainer = getElement("postsTitlesContainer");

  //Iterate each post in posts.json
  postData.map((post) => {
    const listElement = creatPostTitleElement(post, postsTitlesContainer);
    listElementAddEvent(post, listElement);
  });
}

//Create a Li element for each "Post Title" & append it to the list
const creatPostTitleElement = (post, postsTitlesContainer) => {
  let elementContainer = createElement("div");
  elementContainer.classList.add("col", "card");
  let postTitleElement = createElement("div");
  let img = creatBootstrapImg();
  let editBtn = createButton("Edit", post.id);
  let removeBtn = createButton("Remove", post.id);

  postTitleElement.className = "list-group-item";
  postTitleElement.setAttribute("data-bs-toggle", "modal");
  postTitleElement.setAttribute("data-bs-target", "#exampleModal");
  postTitleElement.textContent = post.title;
  postsTitlesContainer.append(elementContainer);

  let buttonContainer = createElement("div");
  buttonContainer.className = "buttonContainer";


  elementContainer.append(img, postTitleElement, buttonContainer);
  buttonContainer.append(editBtn, removeBtn);

  return postTitleElement;
};

const creatBootstrapImg = () => {
  let i = Math.round(Math.random() * (19 - 1) + 1);
  let imgUrl = apiImages.hits[i].webformatURL;
  let img = createElement("img");
  img.src = `${imgUrl}`;
  img.classList = "img-thumbnail";
  img.alt = "...";
  return img;
};

const createButton = (element, id) => {
  let btn = createElement("button");
  btn.textContent = element;
  if (element == "Remove") {
    btn.classList = `btn btn-danger blog__post__${element}__btn`;
  } else {
    btn.classList = `btn btn-primary blog__post__${element}__btn`;
  }
  btn.id = `${element}Btn${id}`;
  btn.dataset[element] = "button";
  return btn;
};

//Add click event to every list element
const listElementAddEvent = (post, listElement) => {
  listElement.addEventListener("click", () => {
    setModalTitle(post);
    setPostUser(post);
    setPostComments(post);
  });
};

const setModalTitle = (post) => {
  let modalTitle = getElement("exampleModalLabel");
  let modalBody = getElement("bodyContent");
  modalTitle.textContent = post.title;
  modalBody.textContent = post.body;
};

const setPostUser = (post) => {
  let userId = post.userId;
  let userName = getElement("userName");
  let email = createElement("p");
  usersData.map((user) => {
    if (user.id == userId) {
      userName.textContent = user.name;
      email.textContent = user.email;
    }
  });
  userName.append(email);
};

const setPostComments = (post) => {
  let commentContainer = getElement("commentContainer");
  commentContainer.textContent = "";

  postsComments.map((comment) => {
    if (comment.postId == post.id) {
      let commentWrapper = createCommentWrapper();
      let commentName = createCommentItem(comment, "name");
      let commentBody = createCommentItem(comment, "body");
      let email = createCommentItem(comment, "email");
      commentContainer.append(commentWrapper);
      commentWrapper.append(commentName, commentBody, email);
    }
  });
};

const createCommentItem = (comment, key) => {
  let item = createElement("p");
  item.textContent = comment[key];
  item.classList = `comment__${key}`;
  return item;
};

const createCommentWrapper = () => {
  let commentWrapper = createElement("div");
  commentWrapper.className = "commentWrapper";
  return commentWrapper;
};
const getElement = (element) => {
  return document.getElementById(element);
};

const createElement = (element) => {
  return document.createElement(element);
};

export {
  getData
};