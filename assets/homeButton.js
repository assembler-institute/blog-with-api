//-------------------HOME BUTTON---------------------//

document.getElementById("page-home").addEventListener("click", () => {
    blogGrid.innerHTML = "";

    createBlogs();
    removeNewTiles();

    document.getElementById("page-1").parentNode.classList.add("new-tile");
    document.getElementById("page-2").parentNode.classList.remove("new-tile");
    document.getElementById("page-3").parentNode.classList.remove("new-tile");
});

//-------------------END HOME BUTTON---------------------//