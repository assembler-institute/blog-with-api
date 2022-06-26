//Execute getData on window load
window.onload = () => {
        getData();
};
//Global variables stored data from fetch
let usersData;
let postsComments;
let apiImages;
let editBtn;
let modalTitle = document.getElementById("exampleModalLabel");
let modalBody = document.getElementById("bodyContent");
let editTitle = document.getElementById("staticBackdropLabel");
let editBody = document.getElementById("editBodyContent");
let saveChangesBtn = document.getElementById("saveChanges");
let edited = false;
let postTitleElement;


//Fetch all data from json & pixabay API
function getData() {
        let url = "https://jsonplaceholder.typicode.com";
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

//Set data to global Variables
const getUsers = (users) => {
        usersData = users;
};
const getComments = (comments) => {
        postsComments = comments;
};
const getImages = (images) => {
        apiImages = images;
};

//Render images & post title to the main page
function renderPostTitle(postData) {
        const postsTitlesContainer = getElement("postsTitlesContainer");

        //Iterate each post in posts.json
        postData.map((post) => {
                const postElement = createPostTitleElement(post, postsTitlesContainer);
                listElementAddEvent(post, postElement);
        });
}

//Create a div element for each "Post Title" & append it to the section in html
const createPostTitleElement = (post, postsTitlesContainer) => {
        let elementContainer = createElement("div");
        elementContainer.classList.add("col", "card");
        elementContainer.setAttribute("data-id", post.id);
        postTitleElement = createElement("div");
        let img = createBootstrapImg();
        editBtn = createButton("Edit", post.id);
        editBtn.setAttribute("data-bs-toggle", "modal");
        editBtn.setAttribute("data-bs-target", "#staticBackdrop");


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

        removeBtn.addEventListener("click", deletePost);

        return postTitleElement;
};




//Create bootstrapImg with each post
const createBootstrapImg = () => {
        let i = Math.round(Math.random() * (19 - 1) + 1);
        let imgUrl = apiImages.hits[i].webformatURL;
        let img = createElement("img");
        img.src = `${imgUrl}`;
        img.classList = "img-thumbnail";
        img.alt = "...";
        return img;
};

//Create delete & remove buttons
const createButton = (element, id) => {
        let btn = createElement("button");
        btn.textContent = element;
        if (element == "Remove") {
                btn.classList = `btn btn-danger blog__post__${element}__btn`;
        } else {
                btn.classList = `btn btn-primary blog__post__${element}__btn`;
        }
        btn.setAttribute("data-id", id);
        btn.dataset.type = element;
        return btn;
};

//Add click event to every  post element
const listElementAddEvent = (post, postElement) => {
        postElement.addEventListener("click", () => {
                setModalTitle(post);
                setPostUser(post);
                setPostComments(post);
        });

        editBtn.addEventListener("click", () => {
                edited = false;
                setModalTitle(post);
                setPostUser(post);
        });

        saveChangesBtn.addEventListener("click", () => {
                saveChanges(post);
        });

};




//Set title & body to the modal
const setModalTitle = (post) => {
        modalTitle.textContent = post.title;
        modalBody.textContent = post.body;
        editTitle.textContent = post.title;
        editBody.textContent = post.body;
        editTitle.setAttribute("data-edit-id", post.id);
        editTitle.setAttribute("contenteditable", "true");
        editBody.setAttribute("contenteditable", "true");
};





//Save changes in edit modal
function saveChanges(post) {

        let element = document.querySelector(`[data-edit-id`);
        let identifier = element.getAttribute("data-edit-id");
        let title = document.querySelector(`[data-id="${identifier}"]`);
        //Loop through all posts to find the post with the same id
        Object.entries(post).map(item => {
                //Find the post with id = identifier and edit it
                if (item[0] == "id" && item[1] == identifier) {
                        post.title = editTitle.textContent;
                        post.body = editBody.textContent;
                        title = title.children[1];
                        title.textContent = post.title;
                }
              })

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
                        method: "PATCH",
                        headers: {
                                "Content-type": "application/json; charset=UTF-8",
                        },
                        body: JSON.stringify( {title: post.title, body: post.body}),
                })
                .then((res) => {
                        res.json();
                        //console.log(res)
                })
                .then((data) => {
                        //console.log(data);
                })


}


//Set user name & email to each post when modal displays
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

//Set comments to each post when modal displays
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
//Creates paraghrpah for each comment item "user, comment, email"
const createCommentItem = (comment, key) => {
        let item = createElement("p");
        item.textContent = comment[key];
        item.classList = `comment__${key}`;
        return item;
};
//create comment container
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


function deletePost(e) {

        let postId = e.target.dataset.id;
        let postElement = document.querySelector(`[data-id="${postId}"]`);
        if (confirm(`Are you sure you want to delete post number ${postId}?`)) {

                postElement.remove();
                fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                                method: "DELETE",
                        })
                        .then((res) => {
                                res.json();
                                console.log(res)
                        })
                        .then((res) => {
                                console.log("Post deleted");
                        })
        }


}