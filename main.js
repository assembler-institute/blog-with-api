let urlPosts = 'https://jsonplaceholder.typicode.com/posts/';
let urlUsers = 'https://jsonplaceholder.typicode.com/users';
//let imgRandom = 'https://random.imagecdn.app/500/150';

/**things to do user name - divs in html bootstrap + post dataGET & get users */

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
    });
    $("#btn-edit").on("click",function(e){
        var modalBody=document.querySelector(".modal-body");
        var modalTitle=document.getElementById("exampleModalLabel");
        var buttonAcceptEdit=document.createElement("button");
        buttonAcceptEdit.setAttribute("id","changeContent")

        var modalBodyEdit=document.createElement("input");
        var modalTitleEdit=document.createElement("input");

        modalBodyEdit.setAttribute("type","textarea");
        modalTitleEdit.setAttribute("type","text");
        modalBodyEdit.setAttribute("style","width:100%; height:200px;overflow:scroll;line-height: 18px;");

        modalBodyEdit.value=modalBody.innerHTML;
        modalTitleEdit.value=modalTitle.innerHTML;

        modalTitle.innerHTM="";
        modalBody.innerHTML="";

        modalBody.append(modalBodyEdit);
        modalTitle.append(modalTitleEdit);

        
        $("changeContent").on("click",function(e){
            // al pulsar el boton de editar, guardarlo  en ajax y sobreescribir los camios en bodyPost y titlePost
            /* $.ajax({
            url: urlPosts,
            method:"PATCH",
            id:positionDiv,
            body:modalBody.innerHTML,
            title:modalTitle.innerHTML,
            success:function(response){
               
            }
        });*/
        });
        //console.log(positionDiv);
        //console.log(modalTitle.innerHTML);
       // console.log(modalBody.innerHTML);
       
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
})