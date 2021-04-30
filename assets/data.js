

$('#usBut').on('click',DataUser);
//$('#posBut').on('click',DataPost);
//$('#comBut').on('click',DataComent);
let url='http://localhost:3000/'
function DataUser(){
    return axios.get(url+'users')
    
    .then(
        function dataU(responseUs){
            
            let count=0;
            $.each( responseUs.data, function( index, elemUs ){
                
            if($('#floatingInput').val()==elemUs.name){
                    $('#post').empty();
                 /*$('.name').text('thats your id '+`${elemUs.id}`)  
                  $('.usName').text('thats your username '+`${elemUs.username}`)  
                  $('.usEmail').text('thats your email '+` ${elemUs.email}`)*/
                  DataPost(elemUs.id,elemUs.name);
                  count+=1
                }
                
            })
            if(count==0){
                $('#post').text('el usuario que mencionas no esta registrado')
            }
            
        }
        
    )
            
}
function DataPost(userId,userName){
    
    return axios.get(url+'post')
    .then(
        function dataP(responsePos){
            let cnt=0;
            $.each( responsePos.data, function( index, elemPos ){
                
                
                if(userId==elemPos.userId){
                    cnt=cnt+1;
                    $('#post').append('<div></div>');
                    $('#post div:last-child').attr('id','posCont'+index);
                    $('#post div:last-child').attr('class','col');

                    //$(`#posCont${index}`).append('<p>'+`${elemPos.id}`+'</p>')
                    $(`#posCont${index}`).append('<p>'+`<span class='user'>${userName}</span>  :`+'</p>')
                    $(`#posCont${index}`).append('<p>'+`<span class='tit'>Title ${cnt} :<br></span> ${elemPos.title}`+'</p>')
                    
                    //$(`#posCont${index}`).append('<p>'+`${elemPos.body}`+'</p>')
                    $(`#posCont${index}`).append('<button  class="sendButP" data-toggle="modal" data-target="#exampleModalCenter">Full info</button>')
                    $(`#posCont${index} button.sendButP`).on('click',function(){postData(this,elemPos.id,elemPos.body,userName)})
                }   
            })
        }
    )
}

function postData(event,post_id,post_body,user_name){
    
    $('.comBox').empty();
    $('.modal-header').empty();
    $('#exampleModalLongTitle').append(`<p class='idpost'>${user_name} post: </p>`);
    $('.modal-header').prepend('<img src="https://yt3.ggpht.com/ytc/AAUvwngLxx3Ylzao3sJXP_H8faqBjtRf6VO0dX8ZkVJt=s176-c-k-c0x00ffffff-no-rj" alt="hola">')
    $('#textContent').empty();
    $('#textContent').append(`<p class='bodypost'>${post_body}</p>`);
    $('#buttonsZone').empty();
    $('#buttonsZone').append(`<button class="sendButC">See post coments </button>`);
    //$('button.sendButC').on('click',function(){DataComent(post_id)})

   // $('button.sendButC').on('click',function(){DataComent(post_id)})


    $('button.sendButC').on('click',function(){DataComent(post_id)})

    $(event).parent().css('transition','2s');
    x=+1;



}

function DataComent(idpost){
   $('.modal-header').css('opacity','0.7');
   $('.modal-body').css('opacity','0.7');
   $('.modal-footer').css('opacity','0.7');
    
    return axios.get(url+'coments')
    .then(
        function dataCom(responseCom){
            
            $.each( responseCom.data, function( index, elemCom ){
               
                if(idpost==elemCom.postId){
                    
                    $('.comBox').append(`<div class='comntbox2' id="coment${index}"></div>`)
                    $(`#coment${index}`).append(`<p class="nameCom">${elemCom.name}</p>`)
                    $(`#coment${index}`).append(`<p class="bodyCom">Says:<br>${elemCom.body}</p>`)
                    $(`#coment${index}`).append(`<p class="emailCom">To answer:<br>${elemCom.email}</p>`)
                    //console.log(elemCom.email)
                   // console.log(elemCom.body)
                   $('.comntbox2').on('click',function(){
                        $('p.bodyCom',this).show()
                        $('p.emailCom',this).show()
                    
                   })
                }
               
            })
        }
    )
}
