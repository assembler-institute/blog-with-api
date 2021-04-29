

$('#usBut').on('click',testingDataUs);
$('#posBut').on('click',testingDataPo);
$('#comBut').on('click',testingDataCom);

function testingDataUs(){
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(
        function dataUs(responseUs){
            let count=0;
            $.each( responseUs.data, function( index, elem ){
                
                if($('.getText').val()==elem.name){
                  $('.name').text('thats your id '+`${elem.id}`)  
                  $('.usName').text('thats your username '+`${elem.username}`)  
                  $('.usEmail').text('thats your email '+` ${elem.email}`)  
                    
                    count+=1
                }
                
            })
            if(count==0){
                $('.userId').text('el usuario que mencionas no esta registrado')
            }
            
        }
        
    )
        
}
function testingDataPo(){
    return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(
        function dataPos(responsePos){
            $.each( responsePos.data, function( index, elem ){
                console.log(elem)
                $('.post').append('<div></div>');
                $('.post div:last-child').attr('id','posCont'+index);

                $(`#posCont${index}`).append('<p>'+`${elem.id}`+'</p>')
                
                $(`#posCont${index}`).append('<p>'+`${elem.title}`+'</p>')
                $(`#posCont${index}`).append('<p>'+`${elem.body}`+'</p>')
                    
            })

        }
    )
}
function testingDataCom(){

    
    return axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
    .then(
        function dataCom(responseCom){
            $.each( responseCom.data, function( index, elem ){
                
            })
        }
    )
    
}
