$.get("http://localhost:3000/posts", function succes(data) {
  const containerPosts = document.getElementById("containerPosts");
  for (var i = 0; i < 100; i++) {
    /*CREACION DE LOS POSTS*/
    $(containerPosts).append('<div class="post row " id=post' + i + ">");
    $("#post" + i).addClass("bg-light mt-3 rounded");
    $("#post" + i).css("height", "auto");
    $("#post" + i).html('<div class="title col-12 mt-2" id=title' + i + ">");
    $("#title" + i).css("height", "50px");
    $("#title" + i).addClass("bg-info rounded");

    $("#post" + i).append('<div class="cont col-12" id=cont' + i + ">");
    $("#cont" + i).css("height", "auto");
    $("#cont" + i).addClass("bg-info mt-2 rounded");

    $("#post" + i).append(
      '<button type="button" class="btn btn-dark border-info border-3 mt-2 mb-2 " data-bs-toggle="modal" data-bs-target="#staticBackdrop" id=btn' +
        i +
        ">"
    );
    $("#btn" + i).css("width", "100px");
    $("#btn" + i).css("height", "65px");
    $("#btn" + i).text("Open Post");
    $("#btn" + i).attr("data-num", data[i].id);
    $("#btn" + i).attr("data-number", data[i].userId);

    /*VOLCANDO DATOS A LOS POSTS*/
    $("#title" + i).text(data[i].title);
    $("#cont" + i).text(data[i].body);

    /*Modal*/
    $("#btn" + i).click(function () {
      var UserssId = $(this).data("number");
      var dataNum = $(this).data("num");
      $("#modal-info").css("padding-left", "12px");
      $("#modal-title").text($("#title" + dataNum).text());
      $("#modal-body").text($("#cont" + dataNum).text());

      //Sacar la info del usuario (userName and email)
      $.get("http://localhost:3000/users/" + UserssId, function succes(data) {
        $("#modal-info").html(
          "<h5>USER</h5> Author: " +
            data.username +
            "<br/>" +
            "Email: " +
            data.email
        );
      });
      //Comments
      $.get(
        "http://localhost:3000/posts/" + dataNum + "/comments",
        function succes(data) {
          $("#loadComments").one("click", function () {
            $(data).each(function (index, element) {
              var comment = $("<div class='commentari border-top'>").html(
                "<p>Title: " +
                  element.name +
                  "</p></br><p>Comment Body: " +
                  element.body +
                  "</p></br><p>Author of Comment: " +
                  element.email +
                  "</p></br>"
              );
              $(".commentari").css("padding-left", "12px");
              $("#modal-comments").append($(comment));
            });
          });
          //Cambiar por un on('click', function(){}); para poder cerrar el eventListenner
          $("#closebtn").one("click", function () {
            $(".modal-comments").children().remove();
          });
          $(".btn-close").one("click", function () {
            $(".modal-comments").children().remove();
          });
        }
      );
    });
  }
});
