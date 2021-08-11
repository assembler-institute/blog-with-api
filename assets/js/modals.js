//modal to edit

$("#editModalBtn").on("click", function() {
    $("#editModal").css("display", "block");
    $("#editModal").css("opacity", "1");
});

//modal to confirm

$("#confirmModalBtn").on("click", function() {
    $("#confirmModal").css("display", "block");
    $("#confirmModal").css("opacity", "1");
});

//exit modal edit

$("#cancelEditModalBtn1").on("click", function() {
    $("#editModal").css("display", "none");
    $("#editModal").css("opacity", "0");
});

$("#cancelEditModalBtn2").on("click", function() {
    $("#editModal").css("display", "none");
    $("#editModal").css("opacity", "0");
});

//exit modal confirm

$("#cancelConfirmModalBtn1").on("click", function() {
    $("#confirmModal").css("display", "none");
    $("#confirmModal").css("opacity", "0");
});

$("#cancelConfirmModalBtn2").on("click", function() {
    $("#confirmModal").css("display", "none");
    $("#confirmModal").css("opacity", "0");
});

//change styles

$(".modal-dialog").css("max-width", "80%");
$(".modal-dialog").css("transform", "translate(0,0px)");