var locModal;
var btnSearch = document.getElementById("searchPosts");

$(async () => {
    let allPosts = await getAllItems("http://localhost:3000/posts");
    showAllPost(allPosts);

    btnSearch.addEventListener("click", searchByTitlePosts);
});