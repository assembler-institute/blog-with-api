$.ajax("https://jsonplaceholder.typicode.com/posts", {
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      $("#posts-list").append(
        $("<li>")
          .data("id", data[i].id)
          .append(
            $("<h2>").text(data[i].title),
            $("<p>").text(data[i].body),
            $("<span>").addClass("delete"),
            $("<span>").addClass("edit"),
            $("<hr>")
          )
      );
    }
  },
}).then(() => {
  // Setting event to open Modal to read a Post
  $("#posts-list h2").on("click", (event) => {
    // Show loading image
    $(".loading").toggle();
    // Save the clicked id post
    let id = $(event.target).parent().data("id");
    //Search for the posts info
    $.ajax("https://jsonplaceholder.typicode.com/posts/" + id, {
      success: function (data) {
        $("#modal__title").text(data.title);
        $("#modal__body").text(data.body);
        //Search for the user info
        $.ajax("https://jsonplaceholder.typicode.com/users/" + data.userId, {
          success: function (userData) {
            $(".loading").toggle();
            $("#modal__user").text(userData.username);
            $("#modal__email").text(userData.email);
            $(".modal").toggle();
            $(".modal__container").toggle();
          },
        });
      },
    });

    // Event for "Load Comments" Button
    $("#modal__loadComments").on("click", () => {
      $("#modal__loadComments").prop("disabled", true).text("Loading...");
      $.ajax({
        url: "https://jsonplaceholder.typicode.com/comments",
        data: { postId: id },
        success: function (commentsData) {
          for (let i = 0; i < commentsData.length; i++) {
            $("#modal__comments").append(
              $("<li>").append(
                $("<h3>").text(commentsData[i].name),
                $("<p>").text(commentsData[i].body),
                $('<a href="">').text(commentsData[i].email),
                $("<hr>")
              )
            );
          }
          // Hides the "Load Comments" Button when comments are appended
          $("#modal__loadComments").slideUp("slow");
        },
      });
    });
  });

  // Adding event to Edit button
  $(".edit").click((event) => {
    // Save the clicked id post
    let id = $(event.target).parent().data("id");
    // Show loading image
    $(".loading").toggle();
    // Search the clicked post on the API and print on the Edit Modal
    $.ajax("https://jsonplaceholder.typicode.com/posts/" + id, {
      success: function (data) {
        $(".loading").toggle();
        $("#modal__edit__title").val(data.title);
        $("#modal__edit__body").val(data.body);
        $(".modal").toggle();
        $(".modal__edit").toggle();
      },
    });

    // Setting event change the post
    $(".modal__edit button").on("click", function editPost() {
      $("#modal__edit__form").slideUp("slow");
      $("#modal__edit__loading").toggle();
      $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/" + id,
        type: "patch",
        dataType: "json",
        data: {
          title: $("#modal__edit__title").val(),
          body: $("#modal__edit__body").val(),
        },
        success: function (response) {
          // Shows updated information on modal
          $("#modal__edit__success").append($("<h3>").text("Title:"));
          $("#modal__edit__success").append($("<p>").text(response.title));
          $("#modal__edit__success").append($("<h3>").text("Body:"));
          $("#modal__edit__success").append($("<p>").text(response.body));
          $("#modal__edit__loading").slideToggle("slow");
          // Changes the post information on "Posts List" searching for the "data-id" on the <li>
          let li = $("li").filter(function () {
            return $(this).data("id") == id;
          });
          $("h2", li).text(response.title);
          $("p", li).text(response.body);
        },
      }).then(() => {
        $("#modal__edit__success").slideToggle("slow");
      });
    });
  });

  // Delete event for delete icon
  $(".delete").click((event) => {
    let id = $(event.target).parent().data("id");
    $(".loading").toggle();
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts/" + id,
      type: "delete",
      success: function () {
        $(".loading").toggle();
        $(".modal").toggle();
        $(".modal__deleted").toggle();
        // Deletes the POST on "Posts List" searching for the correspondent "data-id"
        $("li")
          .filter(function () {
            return $(this).data("id") == id;
          })
          .remove();
      },
    });
  });
});

// Closing Modal
$(".x-close").click(() => {
  resetModal();
});

$(".modal").click((event) => {
  if ($(event.target).is($(".modal"))) {
    resetModal();
  }
});

function resetModal() {
  $(".modal").toggle();
  if ($(".modal__container").css("display") == "block") {
    $("#modal__loadComments").unbind();
    $(".modal__container").toggle();
    if ($("#modal__comments").children().length > 0) {
      $("#modal__loadComments").prop("disabled", false).text("Load comments");
      $("#modal__loadComments").toggle();
      $("#modal__comments").empty();
    }
  }
  if ($(".modal__edit").css("display") == "block") {
    $(".modal__edit").toggle();
    $(".modal__edit button").unbind();
    if ($("#modal__edit__success").css("display") == "block") {
      $("#modal__edit__success p").remove();
      $("#modal__edit__success h3").remove();
      $("#modal__edit__success").toggle();
      $("#modal__edit__form").toggle();
    }
  }
  if ($(".modal__deleted").css("display") == "block") {
    $(".modal__deleted").toggle();
  }
}
