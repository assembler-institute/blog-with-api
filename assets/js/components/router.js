import { loadPage } from "../index.js"
import { Modal } from "../layouts/modal.js"
import { getQueryPosts } from "../layouts/search.js"

export const redirect = (event) => {

  getRandomImage()
  Modal.hide()

  let oldURL = ''
  if (typeof event === 'undefined') oldURL = ''
  if (typeof event !== 'undefined') oldURL = new URL(event.oldURL).hash

  if (location.hash === '') {
    return loadPage(1)
  } else {

    // Redirect to page
    if (location.hash.includes('page')) {
      return loadPage(getNumberFromString(location.hash)) 
    } 
    // Redirect to post
    else if (location.hash.includes('post')) {
      return loadPage(null , 'post', getNumberFromString(location.hash), oldURL)
    } 
    // Edit post modal
    else if (location.hash.includes('edit')) {
      //return editPost(getNumberFromString(location.hash))
      return loadPage(null , 'edit', getNumberFromString(location.hash), oldURL)
    }
    else if (location.hash.includes('search')) {
      return getQueryPosts(null, getQueryFromString(location.hash))
    }
    else if (location.hash.includes('add-new')) {
      return loadPage(null , 'add-new', null, oldURL)
    }
  }
}

window.addEventListener('hashchange', redirect)

const getNumberFromString = (string) => {
  return parseInt(string.match(/\d*$/)[0])
}

const getQueryFromString = (string) => {
  return string.split('-')[1]
}


const getRandomImage = () => {
  let hero =  document.getElementById('hero')
  hero.style.opacity = '0'
  hero.style.backgroundImage = 'url("")'
  hero.style.backgroundImage = 'url("https://picsum.photos/1200/500")'
  hero.style.backgroundSize = 'cover'
  hero.style.backgroundPosition = 'center'
  hero.style.height = '25vh'
  hero.style.opacity = '1'
}
