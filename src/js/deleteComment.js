function deleteComments_Post(id){

    try{
        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset= UTF-8"},
        });
        
    }catch(error){
        console.error(error)
    }
    
}

export default deleteComments_Post;