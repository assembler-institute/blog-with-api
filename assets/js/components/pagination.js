import { getAllPosts } from "./posts.js"

export const getButtonsPagination = (response, page) => {

  let arrayPage = response.headers.get('link').split(',')

  let paginate = {
    prev: null,
    first: null,
    next: null,
    last: null
  }
  
  arrayPage.forEach(elm => {
    if (elm.includes('prev')) paginate.prev = elm
    if (elm.includes('first')) paginate.first = elm
    if (elm.includes('next')) paginate.next = elm
    if (elm.includes('last')) paginate.last = elm
  })


  for (const key in paginate) {
    if (paginate[key] !== null) {
      let pageParam = paginate[key].match(/_page=\d*/gm)
      let param = pageParam[0].split('=')[1]
      paginate[key] = parseInt(param)  
    }
  }

  // Build buttons
  let htmlButtons = ''
  if (paginate.prev === null) {
    htmlButtons += `<li class="page-item disabled"><button class="page-link" id="prev" data-page="${paginate.prev}">Prev</button></li>`
  } else {
    htmlButtons += `<li class="page-item"><button class="page-link" id="prev" data-page="${paginate.prev}">Prev</button></li>`
  }


  for (let i = paginate.first; i <= paginate.last; i++) {

    if (page === i) {
      htmlButtons += `<li class="page-item active"><a class="page-link" href="#">${i}</a><li/>`
    } else {
      htmlButtons += `<li class="page-item"><a class="page-link" href="#page-${i}">${i}</a>`
    }
    
  }

  if (paginate.next === null) {
    htmlButtons += `<li class="page-item disabled"><button class="page-link" id="next" data-page="${paginate.next}">Next</button></li>`
  } else {
    htmlButtons += `<li class="page-item"><button class="page-link" id="next" data-page="${paginate.next}">Next</button></li>`
  }
  

  return htmlButtons
}

/*
export const paginate = (event) => {

  if (event.target.id === 'next') currentPage += 1 
  if (event.target.id === 'next') currentPage -= 1

  let response = getAllPosts(currentPage)

  if (currentPage <= 1) {
    document.querySelector('#prev').style.display = 'none'
  } else {
    document.querySelector('#prev').style.display = 'block'
  }

}

export const nextButton = '<button id="next">Next</button>'
export const prevButton = '<button id="prev">Prev</button>'
*/