export function deletePost(event) {
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {

                if (post.id === parseInt(event.target.dataset.delete)) {
                    document.getElementById("sure-btn").setAttribute("data-sure", parseInt(event.target.dataset.delete))

                    document.getElementById("sure-btn").addEventListener("click", function() {
                        fetch(`http://localhost:3000/posts/${post.id}`, {
                                method: 'DELETE'
                            })
                            .then(response => response.json())
                            .then(data => {})
                    })
                }
            })
        })
}