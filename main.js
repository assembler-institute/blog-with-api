const URL = "https://jsonplaceholder.typicode.com";

let $posts = $("#cardsContainer");

$.get(`${URL}/posts`, function (allPosts) {
  $.each(allPosts, function (i, post) {
    $("#cardsContainer").append(`
      <div id="${post.id}" class="card border-0" data-toggle="modal" data-target="#${post.id}" data-id="${post.userId}">
        <div class="text-end pt-2">
             <i class="bi bi-pencil editPost" type="button"></i>
             <i class="bi bi-trash delete" type="button" id="${post.id}" aria-label="Close"></i>
        </div>
        <div class="card-body" id="cardBody">
              <div id="imgContainer">
              <img src="https://picsum.photos/500/250?random=${post.id}" alt="post" class="rounded mx-auto d-block card-img-top">
              </div><br>
                  <h5 class="card-title text-black-50">${post.title}</h5>
                  <p class="card-text">${post.body}</p>       
              </div>
      </div>`);
  });
});

console.log($posts)
$posts.on("click", ".delete", function (e) {
    e.preventDefault();
    let $card = $(this).closest(".card")
    $.ajax({
                url: `${URL}/posts/${$(this).attr("id")}`,
                type: "DELETE",
                success: function (result) {
                  $card.remove();
                },
              });
})


$posts.on("click", ".editPost", function (e) {
    e.preventDefault();
    let $card = $(this).closest(".card");
    $(".modalForEditing").modal("show");
   // $card.find("input.title").val($(".card-title").text());
    //$card.find("textarea.body").val($(".card-body").text());
    $card.addClass("edit");

    $(".modalForEditing").off("click").on("click", ".confirmEdit", function(e) {
        e.preventDefault();
        let post = {
            title: $("input.title").val(),
            body: $("textarea.body").val()
        };
        $.ajax({
            type: "PUT",
            url: `${URL}/posts/${$card.attr("id")}`,
            data: post,
            success: function() {
                console.log("success")
                $(".modalForEditing").modal("hide");
                $card.find("h5.card-title").text(post.title);
                $card.find("p.card-text").text(post.body);
                $card.removeClass("edit");
            },
            error: function(error) {
                console.log(error)
            }
        })
    })
} )

$posts.on("click", ".card-body", function() {
    let $card = $(this).closest(".card");
    let $cardTitle = $(this).find(".card-title").text();
    let $cardText = $(this).find(".card-text").text();
    $(".modalForPost").modal("show");
    $(".modal-title").text($cardTitle);
    $(".modal-body p").text($cardText);
    $.get(`${URL}/users/${$card.attr("data-id")}`, function (response) {
            $(`#userName`).text(response.username);
            $(`#userEmail`).text(response.email);
          });

          $.get(`${URL}/comments/?postId=${$card.attr("id")}`, function (postData) {
                $.each(postData, function () {
                  $("#comments").append(`<h6 class="fw-bold text-light bg-secondary" style="text-indent: 5px">${this.name}</h6>
                          <p style="text-indent: 5px">${this.body}</p>`);
                });
                $(".comments-btn").off("click").on("click", function(e) {
                    e.preventDefault()
                    $("#comments").toggle();
                })
              });
})




$(".modal").on("hidden.bs.modal", function () {
  $("#comments").empty();
  $("#title-input, #body-text").val("");
  $("#comments").hide();
});

