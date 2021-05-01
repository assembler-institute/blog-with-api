const url = "http://localhost:3000";

generatePostsGrid();

function generatePostsGrid () {
    $("main").append($("<div>").attr("id", "loading-msg").text("Loading Posts..."));
    const settings = {
        "url": url + "/posts",
        "method": "GET"
    };
    $.ajax(settings).done(function (response) {
        $("#loading-msg").remove();

        $("main").append($("<div>").addClass("row").attr("id", "main-row"));
        for (let i = 0; i < response.length; i++) {
            let newGridElement = $("<div>");
            newGridElement.attr("value", response[i].id);
            newGridElement.addClass("col-12 col-sm-6 col-md-4 col-lg-3 p-3");
            $("#main-row").eq(-1).append(newGridElement);
            
            $("div [value]").eq(-1).append($("#card-body").contents().clone());
            $("div[type=post-number]").eq(-1).text("#" + response[i].id);
            $("div[type=post-title]").eq(-1).text(response[i].title);
            $("div[type=post-body]").eq(-1).text(response[i].body);
        }
    });
}