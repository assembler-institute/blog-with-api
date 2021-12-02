class Modal{

    constructor(){
        $("<div></div>").addClass("modal fade show").attr("tabindex", "-1").attr("style", "display: block;").css("background-color", "rgba(0,0,0,0.3)")
            .append($("<div></div>").addClass("modal-dialog modal-dialog-centered")
                .append($("<div></div>").addClass("modal-content")
                    .append($("<div></div>").addClass("modal-body d-flex flex-column")
                        .append($("<h3></h3>").addClass("modal-title").text("Title"))
                        .append($("<span></span>").text("body"))
                        .append($("<h5></h5>").addClass("modal-title").text("User"))
                        .append($("<span></span>").text("alex123"))
                        .append($("<span></span>").text("alex@mail.com"))
                    )
                    .append($("<div></div>").addClass("modal-footer d-flex align-items-start flex-column")
                        .append($("<span></span>").addClass("modal-title").text("Comments"))
                        .append($("<button></button>").addClass("btn btn-dark").text("Load Comments"))
                    )
                )
            )
        .appendTo("body");

    }

}

export default Modal;