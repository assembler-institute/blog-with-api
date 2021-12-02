class Modal{

    constructor(title, body){
        $("<div></div>").addClass("modal fade show").attr("tabindex", "-1").attr("style", "display: block;").css("background-color", "rgba(0,0,0,0.3)")
            .append($("<div></div>").addClass("modal-dialog modal-dialog-centered mw-100")
                .append($("<div></div>").addClass("modal-content")
                    .append($("<div></div>").addClass("modal-body d-flex flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text(title)) //edit
                        .append($("<img></img>").addClass("img-close rounded-circle").attr("src", "./assets/img/close.png"))
                        .append($("<span></span>").text(body)) //edit
                        .append($("<h5></h5>").addClass("modal-title").text("User"))
                        .append($("<span></span>").text("alex123"))
                        .append($("<span></span>").text("alex@mail.com"))
                    )
                    .append($("<div></div>").addClass("modal-footer d-flex align-items-start flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text("Comments"))
                        .append($("<button></button>").addClass("btn btn-dark").text("Load Comments"))
                    )
                )
            )
        .appendTo("body");

        $("img").on("click", function(){ $(".modal").remove(); });

        if(title === undefined || body === undefined){
            $("<input></input>").addClass("modal-title").attr("size", 10).text(title).prependTo(".modal-body");
            $("<textarea></textarea>").addClass("modal-title").attr("columns", 10).text(body).insertAfter(".img-close");
        }

    }

}

export default Modal;