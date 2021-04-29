
//this function injects posts in the DOM

let inf = {
    url: "https://jsonplaceholder.typicode.com/posts/",
    method: "GET",
};

$.ajax(inf).done(function (response) {

    const container = $("#posts");

    response.forEach((post) => {
    let postCont = $(`<div class="d-flex text-muted pt-3">
            <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div class="d-flex justify-content-between">
                    <strong data-id="${post.id}" class="text-gray-dark title">${post.title}</strong>
                    <i class="bi bi-pencil-square" data-userid="${post.userId}" id="${post.id}" data-body="${post.body}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
        </div>
    </div>`);
    container.append(postCont);
    });
});


// this function inject body a title to modal
$(document).on("click", function (event) {
    if (event.target.matches(".bi-pencil-square")) {
    let settings = {
        url: `https://jsonplaceholder.typicode.com/users/${event.target.dataset.userid}`,
        method: "GET",
    };
    $.ajax(settings).done(function (response) {
        $("#user").text(response.username);
        $("#email").text(response.email);
        $(".text-start").text(event.target.dataset.body);
        let titleSet = $(`strong[data-id="${event.target.id}"]`).text();
        $(".modal-title").text(titleSet);
    });
    $("#load-comments").on("click", function () {

        $(this).addClass("d-none");
        console.log();
        var settings = {
            url: `https://jsonplaceholder.typicode.com/posts/${event.target.id}/comments`,
            method: "GET",
        };

        $.ajax(settings).done(function (comments) {
            console.log(comments);
            const commetsContainer = $(".modal-content");
            comments.forEach((comms) => {
            let comCont = $(`<div class="modal-body2">
                <strong class="fs-4">${comms.name}</strong>
                <span>${comms.body}</span>
                <span class="text-muted">${comms.email}</span>
                </div>`);
                commetsContainer.append(comCont);
            });
        });
    });
};
});

$("#exampleModal").on("hide.bs.modal", function () {
    $("#load-comments").removeClass("d-none");
    $(".modal-body2").remove();
    $("#load-comments").off();
});


