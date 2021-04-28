
//this function injects posts in the DOM

function postMaker() {


    return axios
        .get("https://jsonplaceholder.typicode.com/posts/")
        .then((data) => {
            const container = $("#posts");

            data.data.forEach((post) => {
            let postCont = $(`<div class="d-flex text-muted pt-3">
                    <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
                            <div class="d-flex justify-content-between">
                            <strong data-id="${post.id}" data-userid="${post.userId}" class="text-gray-dark title">${post.title}</strong>
                            <i class="bi bi-pencil-square" id="${post.id}" data-body="${post.body}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                </div>
        </div>`);
            container.append(postCont);
            });
        });
}

postMaker();

// this function inject body a title to modal
$(document).on("click", function (event) {
    if (event.target.matches(".bi-pencil-square")) {
        return axios
            .get("https://jsonplaceholder.typicode.com/users/")
            .then((info) => {
            console.log(info);
            info.data.forEach((user) => {
                const users = user.id;
                console.log(users);

                $(".text-start").text(event.target.dataset.body);
                    let titleSet = $(`strong[data-id="${event.target.id}"]`).text();
                    $(".modal-title").text(titleSet);
                    $("#user").text(event.target.dataset.userid)
                });
            });
    };
});

if userid === id 


