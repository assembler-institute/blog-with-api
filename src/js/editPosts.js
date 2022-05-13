//not used
const url = 'http://localhost:3000/posts'

function editPost(id, edittedBody){
    try{
        fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {"Content-type": "application/json; charset= UTF-8"},
        body: JSON.stringify({body: edittedBody})
        })
    } catch(error) {
        console.error(error)
    }
}

export default editPost