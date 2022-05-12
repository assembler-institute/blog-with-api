

// Fetch posts from api for posts, return as .json data, and pass to displayPosts function.
function getPostData () {
    const fetchPosts = fetch('http://localhost:3000/posts');
    fetchPosts
        .then(response => {
            return response.json();
        })
        .then(data => {
            displayPosts(data);
        })
}

// Loads the blog posts when site is opened.
window.onload = getPostData();

// Shows the blog posts with title and body on the main page
function displayPosts(data) {
    const dataContainer = document.getElementById('postDisplay');

    data.map((post) => {

        const postContainer = document.createElement('div');
        const blogTitle = document.createElement('h3');
        const blogPost = document.createElement('p');

        postContainer.classList.add('post__container');
        blogTitle.classList.add('post__title')
        blogPost.classList.add('post__blog--post');
        blogTitle.textContent = post.title;
        blogPost.textContent = post.body;

        postContainer.append(blogTitle, blogPost);
        dataContainer.append(postContainer);
    })
}



