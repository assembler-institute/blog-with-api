const url = "http://localhost:3000";

generatePostsGrid();

function generatePostsGrid(){
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
        $(".card-post").on("click", loadPostModal);
    });
}

function loadPostModal(){
    let postId = $(this).parent().attr("value");

    if($("#modal-post").length != 0){
        $("#modal-post").remove();
    }
    let contentModalTemplate = $("#modal-post-template").contents().clone();
    $("main").append(contentModalTemplate);
    
    var modal = new bootstrap.Modal(document.getElementById("modal-post"));
    modal.show();

    $("#modal-header-text").text("Loading title...");
    $("#modal-body-text").text("Loading body...");

    const settingsPost = {
        "url": url + "/posts/" + postId,
        "method": "GET"
    };
    $.ajax(settingsPost).done(function (response) {
        let userId = response.userId;
        let title = response.title;
        let body = response.body;
        const settingsUser = {
            "url": url + "/users/" + userId,
            "method": "GET"
        };
        $.ajax(settingsUser).done(function (response) {
            $("#modal-header-text").text(title);
            $("#modal-body-text").text(body);
            $("#modal-user-email").text(response.username + " | " + response.email);
        });
    });

    const settingsComments = {
        "url": url + "/comments?postId=" + postId,
        "method": "GET"
    };
    $.ajax(settingsComments).done(function (response) {
        let commentsBtn = $("<button>").attr("type", "button").attr("id", "btn-comments").addClass("btn btn-primary").text("Load comments (" + response.length + ")");
        $("#modal-footer-header").append(commentsBtn);
        $("#btn-comments").on("click", function () {
            for (let i = 0; i < response.length; i++) {
                let newDiv = $("<div>").addClass("pt-2 pb-1 border-top").html(`
                <div type="comment-name" class="fw-bold"></div>
                <div type="comment-body" class="my-2 fw-lighter lh-2"></div>
                <div type="comment-email" class="fw-lighter fst-italic text-end text-muted"></div>
                `);
                $(".modal-footer").append(newDiv);
                $("div[type=comment-name]").eq(-1).text(response[i].name);
                $("div[type=comment-body]").eq(-1).text(response[i].body);
                $("div[type=comment-email]").eq(-1).text(response[i].email);
                $("#btn-comments").remove();
            }
        });
    });
}