generatePostsGrid();

function generatePostsGrid () {
    const settings = {
        "url": "https://jsonplaceholder.typicode.com/posts",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        $("#loading-msg").remove();
        $("main").append($("<div>").addClass("row").attr("id", "main-row"));
        for (let i = 0; i < response.length; i++) {
            $("#main-row").eq(-1).append($("<div>").addClass("col-12 col-sm-6 col-md-4 col-lg-3 border").text(i+1));
        }
    });
    $("main").append($("<div>").attr("id", "loading-msg").text("Loading Posts..."));
}