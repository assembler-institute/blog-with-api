const URL = "https://jsonplaceholder.typicode.com";


// $.when(postData, userData, commentData).done(function (a) {
//   let allPosts = a[0];
$.get(`${URL}/posts`, function(allPosts) {
  $.each(allPosts, function (i) {
    $("#cardsContainer").append(`
    <div id="card${i}" class="card mb-3" style="max-width: 600px;" data-toggle="modal" data-target="#${this.userId}">
            <div class="card-body">
                <h5 class="card-title text-black-50">${this.title}</h5>
                <p class="card-text">${this.body}</p>       
            </div>
    </div>`);
    //
    $(`#card${i}`).each(function () {
      $(this).off("click").on("click", function (e) {
          e.preventDefault();
        $(".modal").attr("id", allPosts[i].userId).modal("show");
        $(`#${allPosts[i].userId} .modal-title`).text(allPosts[i].title);
        $(`#${allPosts[i].userId} .modal-body p`).text(allPosts[i].body);
        $.get(`${URL}/users/${allPosts[i].userId}`, function (response) {
          $(`#userName`).text(response.username);
          $(`#userEmail`).text(response.email);
        });

        $.get(`${URL}/comments/?postId=${allPosts[i].id}`, function(postData) {
          console.log(typeof(postData))    
          $.each(postData, function() {
                $("#comments").append(`<p>${this.body}</p>`)
            })
        })
      });
    });
  });
});


$(".modal").on("hidden.bs.modal", function() {
  $("#comments").empty();
});

