function deletePost_Comments(id){

    try{
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
            headers: {"Content-type": "application/json; charset= UTF-8"},
        });
        
    }catch(error){
        console.error(error)
    }
    
}

export default deletePost_Comments;