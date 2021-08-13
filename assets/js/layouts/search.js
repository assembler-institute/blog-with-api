export let searchHTML = `<div class="input-group flex-nowrap w-auto">
  <div class="form-outline">
    <input type="search" id="search-input" class="form-control" placeholder="Search" />
  </div>
</div>
`

export const searchHandler = () => {
  document.getElementById('search-input').addEventListener('change', queryPostHandler)
  async function queryPostHandler (event) {
    await getQueryPosts(event.target.value)
    event.target.value = '' 
  }
}

export const getQueryPosts = async (stringEvent, stringHash = '') => {
  let string;
  if (stringEvent !== null) {
    string = stringEvent
  } else {
    string = stringHash
  }
  
  let posts = await fetch(`http://localhost:3000/posts?q=${string}`, {
    method: 'GET'
  }).then(res => res.json()).then(data => data).catch(err => err)

  let container = document.getElementById('main-container')
  if (posts.length > 0) {
    container.querySelectorAll('*').forEach(elm => elm.remove())
    let articles = ''
    posts.forEach(elm => {
      articles += `
      <li class="list-group-item">
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic"><a href="#post-${elm.id}">${elm.title}</a></h4>
          <p>${elm.body}</p>
        </div>
      </li>
      `
    })

    let resultPageHTML = `
        <a id="article-back" href="#"><< Back</a>
        <section class="article-comments pt-5">
          <ul class="list-group">
            ${articles}
          </ul> 
        </section>
    `
    container.insertAdjacentHTML('afterbegin',resultPageHTML)
    
    location.hash = `search-${string}`

  }

}