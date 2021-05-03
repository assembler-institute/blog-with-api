// const URL = 'https://jsonplaceholder.typicode.com/';
const URL = 'http://localhost:3000/';
function startLoadingSpinner() {
    $("div.spanner").addClass("show");
    $("div.overlay").addClass("show");
}

function stopLoadingSpinner() {
    $("div.spanner").removeClass("show");
    $("div.overlay").removeClass("show");
}

function getPosts() {
    startLoadingSpinner();
    $.get(URL+'posts/', res => {
        buildPostsContainer(res);
        stopLoadingSpinner();
    });
}

function getUserById(userId) {
    startLoadingSpinner();
    return $.get(`${URL}users/${userId}`, stopLoadingSpinner);
}

function disableButton(element) {
    element.prop('disabled', true);
}

function enableButton(element) {
    element.prop('disabled', false);
}

function deletePost(id) {
    startLoadingSpinner();
    $.ajax({
        url: `${URL}posts/${id}`,
        type: 'DELETE',
        success: _ => {
            $(`li[data-id=${id}]`)?.fadeOut(400, _ => {
                $(`li[data-id=${id}]`).remove();
            });
        },
        error: _ => {
            alert(`Fail deleting post: ${id}`);
        },
        complete: _ => {
            stopLoadingSpinner();
            $('#deleteBtn').off('click');
        }
    });
}

function editPost(postId) {
    let inputTitle = $('#inputTitle');
    let inputBody = $('#inputBody');
    let liItemDivLeft = $(`li[data-id=${postId}] .ms-2`);

    inputTitle.val(liItemDivLeft.children().first().text());
    inputBody.val(liItemDivLeft.children().last().text());
    $('#saveBtn').on('click', _ => {
        if (!inputTitle.val()){
            alert('Title cannot be empty!');
            return false;
        }
        let saveBtn = $('#saveBtn');
        disableButton(saveBtn);
        saveBtn.append($('<span>', {class: 'spinner-border spinner-border-sm ml-2'}));
        $.post(URL+'posts',
            {id: postId, title: inputTitle.val(), body: inputBody.val()},
            _ => {
                liItemDivLeft.children().first().text(inputTitle.val());
                liItemDivLeft.children().last().text(inputBody.val());
                $('#editModal').modal('hide');
            })
    });
}

function getComments(postId) {
    let loadCommentsBtn = $('#loadCommentsBtn');
    loadCommentsBtn.append($('<span>', {class: 'spinner-border spinner-border-sm ml-2'}));
    disableButton(loadCommentsBtn);
    $.get(`${URL}comments?postId=${postId}`, res => {
        loadCommentsBtn.hide();
        if (res.length) {
            let ulComments = $('<ul>', {class: 'p-0 commentScroll'});
            $('#showModal .modal-footer').append(ulComments);
            $.each(res, (index, comment) => {
                let liComment = $('<li>', {class: 'list-group-item '});
                let name = $('<p>', {class: 'font-weight-bold', text: comment.name});
                let body = $('<p>', {text: comment.body});
                let email = $('<p>', {text: comment.email});
                liComment.append([name, body, email]);
                ulComments.append(liComment);
            });
        } else {
            $('#showModal .modal-footer').append($('<p>', {text: 'There is no comments'}));
        }
    });
}

function showPost(post) {
    let liItemDivLeft = $(`li[data-id=${post.id}] .ms-2`);
    $('#pTitle').text(liItemDivLeft.children().first().text());
    $('#pBody').text(liItemDivLeft.children().last().text());

    getUserById(post.userId).then(user => {
        $('#pUserName').text(user.username);
        $('#pUserEmail').text(user.email);
    });
    $('#loadCommentsBtn').on('click', _ => {
        getComments(post.id);
    });
}

function buildPostsContainer(posts) {
    $.each(posts, (index, post) => {
        let ul = $('.container-sm > ul');
        let li = $(`<li class="list-group-item d-flex justify-content-between align-items-start list-group-item-action" data-id=${post.id}></li>`);

        let divLeft = $('<div>', {class: "ms-2 me-auto px-3", style: 'flex-basis: 100%;cursor:pointer;'});
        divLeft.on('click', _ => {
            showPost(post);
            $('#showModal').modal('show');
        });
        let divTitle = $('<div>', {class: "font-weight-bold", text: post.title});
        let divBody = $('<div>', {class: "font-weight-light", text: post.body});
        divLeft.append([divTitle, divBody]);

        let divRight = $('<div>', {class: "d-flex align-self-center"});
        let editBtn = $('<button>',
            {type: 'button', class: 'btn btn-outline-primary shadow-none p-1 border-0'}
        );
        let editIcon = $('<i>', {class: 'bi bi-pencil-square'});
        editBtn.append(editIcon);
        editBtn.on('click', e => {
            editPost(post.id);
            $('#editModal').modal('show');
        });
        let deleteBtn = $('<button>',
            {
                type: 'button',
                class: 'btn btn-outline-danger shadow-none p-1 border-0'
            }
        );
        let delIcon = $('<i>', {class: 'bi bi-trash'});
        deleteBtn.append(delIcon);
        deleteBtn.on('click', _ => {
            $('#deleteModal').modal('show');
            $('#deleteBtn').on('click', _ => {
                deletePost(post.id);
                $('#deleteModal').modal('hide');
            });
        });
        divRight.append([editBtn, deleteBtn]);

        li.append([divLeft, divRight]);
        ul.append(li);
    });
}

function cleanShowModalListener() {
    $('#showModal').on('hidden.bs.modal', _ => {
        let commentsBtn = $('#loadCommentsBtn');
        $('#pTitle').empty();
        $('#pBody').empty();
        $('#pUserName').empty();
        $('#pUserEmail').empty();
        commentsBtn.show();
        commentsBtn.next()?.remove();
        $('#loadCommentsBtn > span')?.remove();
        commentsBtn.off('click');
        enableButton(commentsBtn);
    });
}

function cleanEditModalListener() {
    $('#editModal').on('hidden.bs.modal', _ => {
        let saveBtn = $('#saveBtn');
        $('#inputTitle').empty();
        $('#inputBody').empty();
        $('#saveBtn > span')?.remove();
        saveBtn.off('click');
        enableButton(saveBtn);
    });
}

(function onStart() {
    cleanShowModalListener();
    cleanEditModalListener();
    getPosts();
}())
