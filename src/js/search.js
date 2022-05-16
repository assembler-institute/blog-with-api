import { getPostData, displayPosts } from './main.js'

// Define string for search results from user entry in search bar
// Filter posts from json that have a title which includes search string and reurn results
async function getSearchResults () {
    const searchString = document.getElementById('headerSearch').value;
    const posts = await getPostData();
    const searchResults = posts.filter((post) => {
      return post.title.includes(searchString);
    })
    return searchResults;  
  } 
  
// Takes posts from the search results, if they exist, removes currently viewed posts and passes search results to display posts.
async function displaySearchResults () {
    const searchResults = await getSearchResults();
    if (searchResults.length > 0) {
    removePosts();
    displayPosts(searchResults);
    }
}

// Remove currently viewed posts on main page.
function removePosts () {
    const dataContainer = document.getElementById("postDisplay");
    while (dataContainer.firstElementChild) {
    dataContainer.removeChild(dataContainer.lastElementChild);
    }
}


  export { getSearchResults, displaySearchResults, removePosts}