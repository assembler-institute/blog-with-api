function getUserInfo(id) {
    return users.filter(user => user.id == id);
}

function getComments(id) {
    return posts.filter(comment => comment.postId == id);
}