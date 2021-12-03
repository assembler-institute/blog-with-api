class Modal{

    constructor(title, body, edit, posts){
        $("<div></div>").addClass("modal fade show").attr("tabindex", "-1").attr("style", "display: block;").css("background-color", "rgba(0,0,0,0.3)")
            .append($("<div></div>").addClass("modal-dialog modal-dialog-centered mw-100")
                .append($("<div></div>").addClass("modal-content")
                    .append($("<div></div>").addClass("modal-body d-flex flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text(title))
                        .append($("<img></img>").addClass("img-close rounded-circle").attr("src", "./assets/img/close.png"))
                        .append($("<pre></pre>").text(body))
                        .append($("<h5></h5>").addClass("modal-title").text("User"))
                    )
                    .append($("<div></div>").addClass("modal-footer d-flex align-items-start flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text("Comments"))
                        .append($("<button></button>").addClass("btn btn-dark").text("Load Comments"))
                    )
                )
            )
        .appendTo("body");

        posts.then(function(post){

            fetch("https://jsonplaceholder.typicode.com/users/" + post.userId,
            {
                method: "GET",
            })
            .then(function(res) {
                return res.json();
            })
            .then(function (user) {
                $("<span></span>").text(user.name).appendTo(".modal-body");
                $("<span></span>").text(user.email).appendTo(".modal-body");
            })

            fetch("https://jsonplaceholder.typicode.com/posts/" + post.id + "/comments",
            {
                method: "GET",
            })
            .then(function(res) {
                return res.json();
            })
            .then(function (comments) {
                comments.forEach(comment => {
                    //Load comments
                    $(".btn-dark").on("click", function(){
                        if($(".modal-footer").children().first().children().length <= 1){
                            posts.then(function(){
                                $(".modal-footer").children().first().append($("<h5></h5>").text(comment.name));
                                $(".modal-footer").children().first().append($("<p></p>").text(comment.body));
                            });
                            $(".btn-dark").remove();
                        }
                    });
                });
            })
        });

        //Close button
        $("img").on("click", function(){ $(".modal").remove(); });

        //Only when is edit modal
        if(edit){
            $(".modal-body").find("h3").remove();
            $(".modal-body").find("pre").remove();
            $(".modal-footer").children().remove();
            $("<div></div>").append($("<input></input>").addClass("form-control").attr("placeholder", title)).addClass("form-group col-sm-8").prependTo(".modal-body");
            $("<div></div>").append($("<textarea></textarea>").addClass("form-control").attr("placeholder", body)).addClass("form-group col-sm-10").insertAfter(".img-close");
            $(".modal-footer").append($("<button></button>").addClass("btn btn-primary save-button").text("Save"));
            
            //Save event
            $(".save-button").on("click", function(){ 
                const title = $("input").val();
                const body = $("textarea").val();
                if(String(title).trim() != " " && String(title).trim() != "" && String(body).trim() != " " && String(body).trim() != ""){
                    posts.then(function(post){
                        //Edit post
                        fetch("https://jsonplaceholder.typicode.com/posts/" + post.id,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-type": "application/json; charset=UTF-8",
                              },                           
                            body: JSON.stringify({
                                title: title,
                                body: $("textarea").val(),
                            }),
                        })
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (json) {
                            //Refresh data
                            const row = $("tbody").find("scope").prevObject[(post.id - 1)];
                            $(row).find("#postTitle")[0].textContent = json.title;
                            $(row).find("#postBody")[0].textContent = json.body;
                            $(".modal").remove();
                        });
                       
                    });   
                }
            });
        }

    }

}

export default Modal;