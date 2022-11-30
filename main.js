let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';

/*user*/
function getUserid(userId, postId) {
    var userSettings = {
        "url": urlUsers,
        "method": "GET",
        "data": {
            id: userId,
        },
        "timeout": 0,
    };

    $.ajax(userSettings)
        .then(function (response) {
            if (postId > 0) {
                $('#userName' + postId).text(response[0].name);
            } else {
                $('#userName').text(response[0].name);
            };
        });
};

/*username id hay 10*/
for (let x = 1; x < 11; x++) {
    for (let y = 1; y < 11; y++) {
        var z = (x - 1) * 10 + y;
         getUserid(x, z);
    };
};

/*data*/
function getPost(id) {
    var settings = {
        "url": urlPosts,
        "method": "GET",
        "data": {
            id: id,
        },
        "timeout": 0,
    };

    $.ajax(settings)
        .done(function (response) {
            response.forEach(data => {
                //createPost(id, data);
            });
        });
};

/*divs html dinamico 100users */
for (let id = 1; id < 101; id++) {
    getPost(id);
    if (id > 0) {
        var post = $('<div class="col-md-6" id="postContainer' + id + '">'+
        '<div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative post-box" id="box' + id + '">'+
        '<div class="col p-4 d-flex flex-column position-static"><div id="imgPost' + id + '"></div>'+
        '<h3 class="mb-3 titlePost" id="titlePost' + id + '">Featured post</h3>'+
        '<p class="card-text mb-auto bodyPost" id="bodyPost' + id + '"></p> '+
        '<div class="post-creator"><strong class="d-inline-block mb-2 text-warning" id="userName' + id + '"></strong>'+
        '</div><div class="button-flex">'+
        '<button type="button" class="btn btn-primary modalBtn"data-bs-toggle="modal" data-bs-target="#exampleModal" data-btn-id="' + id + '">Read post</button></div></div></div></div>')
        $('#postDiv').append(post);
    };

    if(id==100){
        getPostContent(urlPosts);
    }
};

/*read post hacerlo modal*/
function getPostContent(urlPosts){
    $.ajax({
        url: urlPosts,
        success:function(response){
            $.each(response,function(index,value){
                let imgRandom='https://picsum.photos/500/150?random='+Math.floor(Math.random() * 101);
                let titlePost=document.getElementById("titlePost"+(index+1));
                let bodyPost=document.getElementById("bodyPost"+(index+1));
                let imgPost=document.getElementById("imgPost"+(index+1));
                let imgElement=document.createElement("img");
                imgElement.setAttribute("src",imgRandom);
                titlePost.innerHTML=value.title;
                bodyPost.innerHTML=value.body;
                imgPost.appendChild(imgElement);
            })
        }
    });
}

/*click button, insert in modal title and body content*/
$(document).ready(function(){
    var positionDiv;
    $(".col-md-6 div .col").on("click","button",function(e){
        positionDiv=e.currentTarget.getAttribute("data-btn-id");
        var modalBody=document.querySelector(".modal-body");
        var modalTitle=document.getElementById("exampleModalLabel");
        var titlePost=document.getElementById("titlePost"+positionDiv);
        var bodyPost=document.getElementById("bodyPost"+positionDiv);
        modalTitle.innerHTML=titlePost.innerHTML;
        modalBody.innerHTML=bodyPost.innerHTML;
        getComments(positionDiv);
        deletePost(positionDiv);

    });
    //show inputs to edit content
    $("#btn-edit").on("click",function(e){
        var modalBody=document.querySelector(".modal-body");
        var modalTitle=document.getElementById("exampleModalLabel");
        let titlePost=document.getElementById("titlePost"+(positionDiv));
        let bodyPost=document.getElementById("bodyPost"+(positionDiv));
        let btnEdit=document.getElementById("btn-edit");
        let btnAccept=document.createElement("button");
        let comment = document.getElementById("buttonComment");
        
        btnAccept.setAttribute("id","changeEdit");
        btnAccept.setAttribute("class","btn btn-primary");
        btnAccept.innerHTML="Accept";
        comment.append(btnAccept);
        
        var modalBodyEdit=document.createElement("textarea");
        var modalTitleEdit=document.createElement("input");
        modalBodyEdit.setAttribute("cols","40");
        modalBodyEdit.setAttribute("rows","5");
        modalTitleEdit.setAttribute("type","text");
        modalBodyEdit.value=modalBody.innerHTML;
        modalTitleEdit.value=modalTitle.innerHTML;
        modalTitle.innerHTML="";
        modalBody.innerHTML="";

        modalBody.append(modalBodyEdit);
        modalTitle.append(modalTitleEdit);
        $(".btn-close").on("click",function(e){
            btnAccept.remove();
        });
        //edit content
        $("#changeEdit").on("click",function(e){
        fetch('https://jsonplaceholder.typicode.com/posts/'+positionDiv, {
            method: 'PUT',
            body: JSON.stringify({
                id:positionDiv,
                title: modalTitleEdit.value,
                body: modalBodyEdit.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => {console.log(json);
            modalTitle.innerHTML=json.title;
            modalBody.innerHTML=json.body;
            titlePost.innerHTML=json.title;
            bodyPost.innerHTML=json.body;
            btnAccept.remove();
            });
    });
});
});
/**getcoments falta boot in html */
/*name id body postid*/ 
function getComments(positionDiv) {

    var comentsvalue = {
        "url": "https://jsonplaceholder.typicode.com/posts/" + positionDiv + "/comments/",
        "method": "GET",
        "timeout": 0,
        
    };
    $.ajax(comentsvalue).done(function (response) {
        $('.collapse').empty();
        response.forEach(function (data) {
            $('.collapse').append('<div class="card card-body p-5"><p class="data-name">' + data.name + '</p><p class="data-body p-4 bg-light rounded">' + data.body + '<p><p class="data-email">' + data.email + '<img src="img/user.png"  width="20" height="20"></p></div>');
        });
    });
};
/*ver el ajax no ejecuta posid*/
/*$(".modal-content").ready(function(){
    console.log(postId);
    $(".btn btn-light").on("click","button",getComments(postId));
    
});*/

var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
var collapseList = collapseElementList.map(function (collapseEl) {
  return new bootstrap.Collapse(collapseEl)
})

var myCollapse = document.getElementById('buttonComment')
var bsCollapse = new bootstrap.Collapse(myCollapse, {
  toggle: false
});

function deletePost(positionDiv) {
    $("#btn-delete").on("click", function() {
        var deleteButton = {
            "url": "https://jsonplaceholder.typicode.com/posts/" + positionDiv,
        "method": "DELETE",
        "timeout": 0,
        };
        $.ajax(deleteButton).done(function() {
            $("#modaldelete").modal("show");
            $("#postContainer" + positionDiv).remove();
            $("#close-btn").on("click", function() {
                $("#modaldelete").modal("hide");
            });
        })
    })
}