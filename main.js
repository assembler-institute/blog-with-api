import {
  createPost,
  handleModal,
  handleComments,
  handleEdit
} from "./src/js/utility.js";

const urlPosts = "http://localhost:3000/posts";//limit of posts
const urlUsers = "http://localhost:3000/users";
const urlComments = "http://localhost:3000/comments";

document.getElementById("blog-container").scrollIntoView();

const getPosts = async () => {
  const response = await fetch(urlPosts)
  const posts = await response.json()
  return posts
}

const getUsers = async () => {
  const response = await fetch(urlUsers)
  const users = await response.json()
  return users
}

const getComments = async () => {
  const response = await fetch(urlComments)
  const comments = await response.json()
  return comments
}

const allUsers = await getUsers();
const allPosts = await getPosts();
const allComments = await getComments()


const onLoad = () => {
  allPosts.map(post => {
    if (post.title)
      createPost(post, allUsers);
  });
}

const modalTemplate = document.getElementById('staticBackdrop');
modalTemplate.addEventListener('show.bs.modal', e => {
  let button = e.relatedTarget;
  let postId = button.getAttribute('data-bs-postID');

  handleModal(allPosts, postId, allUsers);
  handleComments(postId, allComments);
})

modalTemplate.addEventListener('hidden.bs.modal', function () {
  document.getElementById("comments-wrapper").setAttribute("class", "collapse");
})

const editModal = document.getElementById("editModal");
editModal.addEventListener('show.bs.modal', e => {
  let button = e.relatedTarget;
  let postId = button.getAttribute('data-bs-postID');

  handleEdit(postId, allPosts);
})

const submitEdit = document.getElementById("submitEdit");
submitEdit.addEventListener("submit", e => {
  handleEdit();
})

// window.addEventListener('scroll', () => {
//   console.log(window.scrollY) //scrolled from top
//   console.log(window.innerHeight) //visible part of screen
//   if (window.scrollY + window.innerHeight >=
//     document.documentElement.scrollHeight) {
//     onLoad();
//   }
// })

window.onload = onLoad();