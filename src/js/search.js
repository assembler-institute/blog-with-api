import { getPostData, displayPosts } from './main.js'

async function getSearchResults () {
    const searchString = document.getElementById('headerSearch').value;
    const posts = await getPostData();
    const searchResults = posts.filter((post) => {
      return post.title.includes(searchString);
    })
    return searchResults;  
  } 
  
  async function displaySearchResults () {
    const searchResults = await getSearchResults();
    if (searchResults.length > 0) {
      removePosts();
      displayPosts(searchResults);
    }
  }
  
  function removePosts () {
    const dataContainer = document.getElementById("postDisplay");
    while (dataContainer.firstElementChild) {
      dataContainer.removeChild(dataContainer.lastElementChild);
    }
  }


  export { getSearchResults, displaySearchResults, removePosts}