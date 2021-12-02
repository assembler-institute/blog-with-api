class Modal{

    constructor(title, body, edit){
        $("<div></div>").addClass("modal fade show").attr("tabindex", "-1").attr("style", "display: block;").css("background-color", "rgba(0,0,0,0.3)")
            .append($("<div></div>").addClass("modal-dialog modal-dialog-centered mw-100")
                .append($("<div></div>").addClass("modal-content")
                    .append($("<div></div>").addClass("modal-body d-flex flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text(title))
                        .append($("<img></img>").addClass("img-close rounded-circle").attr("src", "./assets/img/close.png"))
                        .append($("<pre></pre>").text(body))
                        .append($("<h5></h5>").addClass("modal-title").text("User"))
                        .append($("<span></span>").text("alex123")) //usuario
                        .append($("<span></span>").text("alex@mail.com")) //usuario
                    )
                    .append($("<div></div>").addClass("modal-footer d-flex align-items-start flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text("Comments"))
                        .append($("<button></button>").addClass("btn btn-dark").text("Load Comments"))
                    )
                )
            )
        .appendTo("body");

        $("img").on("click", function(){ $(".modal").remove(); });

        if(edit){
            $(".modal-body").find("h3").remove();
            $(".modal-body").find("pre").remove();
            $(".modal-footer").children().remove();
            $("<div></div>").append($("<input></input>").addClass("form-control").attr("placeholder", title)).addClass("form-group col-sm-8").prependTo(".modal-body");
            $("<div></div>").append($("<textarea></textarea>").addClass("form-control").attr("placeholder", body)).addClass("form-group col-sm-10").insertAfter(".img-close");
            $(".modal-footer").append($("<button></button>").addClass("btn btn-primary save-button").text("Save"))
        }

    }

}

export default Modal;