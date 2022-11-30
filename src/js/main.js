var locModal;
var btnSearch = document.getElementById("searchPosts");
var inputCreatePost = document.getElementById("createBodyPost");

$(async () => {
    let allPosts = await getAllItems("http://localhost:3000/posts");
    showAllPost(allPosts);
    inputCreatePost.addEventListener("keypress", newPost);

    btnSearch.addEventListener("click", searchByTitlePosts);
});