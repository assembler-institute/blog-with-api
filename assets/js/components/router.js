import { loadPage } from "../index.js"

export const redirect = () => {

  if (location.hash === '') {
    return loadPage(1)
  } else {

    // Redirect to page
    if (location.hash.includes('page')) {
      return loadPage(getNumberFromString(location.hash)) 
    } 
    // Redirect to post
    else if (location.hash.includes('post')) {
      return loadPage(null , 'post', getNumberFromString(location.hash))
    } 
    // Edit post modal
    else if (location.hash.includes('edit')) {
      //return editPost(getNumberFromString(location.hash))
      return loadPage(null , 'edit', getNumberFromString(location.hash))
    }
  }
}

window.addEventListener('hashchange', redirect)

const getNumberFromString = (string) => {
  return parseInt(string.match(/\d*$/)[0])
}

