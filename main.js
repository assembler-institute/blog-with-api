const URL = "https://jsonplaceholder.typicode.com";

let $posts = $("#cardsContainer");
let buttonToTop = $('#btn-to-top');


// Get all Posts

$.get(`${URL}/posts`, function (allPosts) {
  $.each(allPosts, function (i, post) {
    $("#cardsContainer").append(`
      <div id="${post.id}" class="card border-0" data-toggle="modal" data-target="#${post.id}" data-id="${post.userId}">
        <div class="text-end pt-2 icon-container">
             <i class="bi bi-pencil editPost" type="button"></i>
             <i class="bi bi-trash delete" type="button" id="${post.id}" aria-label="Close"></i>
        </div>
        <div class="card-body" id="cardBody">
            <div id="imgContainer">
              <figure> 
               <img src="https://picsum.photos/500/250?random=${post.id}" alt="post" class="rounded mx-auto d-block card-img-top">
              </figure>
            </div><br>
            <h5 class="card-title text-black-50">${post.title}</h5>
            <p class="card-text">${post.body}</p>       
        </div>
      </div>`);
  });
}).fail(function() {
  console.log(error)
});


// Delete a Post

$posts.on("click", ".delete", function (e) {
  e.preventDefault();
  let $card = $(this).closest(".card");
  $.ajax({
    url: `${URL}/posts/${$(this).attr("id")}`,
    type: "DELETE",
    success: function (result) {
      $(".checkModal .modal-body").text("Delete this post?");
      $(".checkModal").modal("show");
      $(".confirm").on("click", function () {
        $(".checkModal").modal("hide");
        $(".toast").removeClass("updated");
        $(".toast-body").text("Successfully removed!");
        $(".toast").addClass("removed").toast("show");
        $card.remove();
      });
    },
    error: function (error) {
      console.log(error);
    }
  });
});


// Update a Post

$posts.on("click", ".editPost", function (e) {
  e.preventDefault();
  let $card = $(this).closest(".card");
  $(".modalForEditing").modal("show");
  $card.addClass("edit");

  $(".modalForEditing")
    .off("click")
    .on("click", ".confirmEdit", function (e) {
      e.preventDefault();
      let post = {
        title: $("input.title").val(),
        body: $("textarea.body").val()
      };
      $.ajax({
        type: "PUT",
        url: `${URL}/posts/${$card.attr("id")}`,
        data: post,
        success: function (result) {
          $(".checkModal .modal-body").text("Update this post?");
          $(".checkModal").modal("show");

          $(".confirm").on("click", function () {
            e.preventDefault();
            $(".toast").removeClass("removed");
            $(".checkModal").modal("hide");
            $(".toast-body").text("Successfully updated!");
            $(".modalForEditing").modal("hide");
            $(".toast").addClass("updated").toast("show");
            $card.find("h5.card-title").text(post.title);
            $card.find("p.card-text").text(post.body);
            $card.removeClass("edit");
          });
        },
        error: function (error) {
          console.log(error);
        },
      });
    });
});


// Post Modal 

$posts.on("click", ".card-body", function (e) {
  e.preventDefault();
  let $card = $(this).closest(".card");
  let $cardTitle = $(this).find(".card-title").text();
  let $cardText = $(this).find(".card-text").text();
  let $cardImage = $(this).find("#imgContainer img").attr("src");
  $(".modalForPost").modal("show");
  $(".modal-title").text($cardTitle);
  $(".modal-body p").text($cardText);
  $("#modal-image img").attr("src", $cardImage);

  $.get(`${URL}/users/${$card.attr("data-id")}`, function (response) {
    $(`#userName`).text(response.username);
    $(`#userEmail`).text(response.email);
  }).fail(function() {
    console.log(error)
  });

  $.get(`${URL}/comments/?postId=${$card.attr("id")}`, function (postData) {
    $.each(postData, function () {
      $(
        "#comments"
      ).append(`<h6 class="fw-bold text-light bg-secondary p-2 rounded-2" style="text-indent: 5px">${this.name}</h6>
                <p style="text-indent: 5px">${this.body}</p>
                <p class="text-end text-secondary">${this.email}</p>
                          `);
    });
    $(".comments-btn")
      .off("click")
      .on("click", function (e) {
        e.preventDefault();
        $("#comments").fadeToggle();
      });
  }).fail(function() {
    console.log(error)
  });
});


// Handling Closing Modal 

$(".modal").on("hidden.bs.modal", function () {
  $("#comments").empty();
  $("#title-input, #body-text").val("");
  $("#comments").hide();
});



// Go to the Top button 

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    buttonToTop.addClass('show');
  } else {
    buttonToTop.removeClass('show');
  }
});

buttonToTop.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

