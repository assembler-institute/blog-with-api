// AddEventListener Button
// call editComment async function

const url = 'http://localhost:3000/comments'

//need to write async/await??
function patchComment(id, edittedBody){
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

export default patchComment