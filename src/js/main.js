var locModal;

$(async () => {
    let allPosts = await getAllItems("http://localhost:3000/posts");
    showAllPost(allPosts);
});