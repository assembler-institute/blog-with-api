export function deletePost(event) {
    fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                if (post.id === parseInt(event.target.dataset.delete)) {
                    document.getElementById("sure-btn").dataset.sure = post.id
                    document.getElementById("sure-btn").addEventListener("click", function(event) {
                    document.getElementById("cards-container").removeChild(document.querySelector(`[data-id="${parseInt(event.target.dataset.sure)}"]`))
                        fetch(`http://localhost:3000/posts/${post.id}`, {
                                method: 'DELETE'
                        })
                    })
                }
            })
        })
}