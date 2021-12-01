import $ from "Jquery"


function createpost(obj){
    //Variable declaration
    var containerDiv = $("<div></div>")
    var headerDiv = $("<div></div>")
    var bodyDiv = $("<div></div>")
    var titleDiv = $("<h5></h5>")
    var pDiv = $("<p></p>")
    //Adding classes
    containerDiv.addClass("card text-center postblog")
    headerDiv.addClass("card-header")
    bodyDiv.addClass("card-body")
    titleDiv.addClass("card-title")
    pDiv.addClass("card-text")
    //Taking text
    headerDiv.text(obj.userId)
    titleDiv.text(obj.title)
    pDiv.text(obj.body)
    //Import text
    headerDiv.append(containerDiv)
    bodyDiv.append(containerDiv)
    titleDiv.append(bodyDiv)
    pDiv.append(bodyDiv)
    containerDiv.append($("body"))

}



