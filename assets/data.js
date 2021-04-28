

$('.bringDataUS').on('click',testingDataUs);
$('.bringDataPO').on('click',testingDataPo);
$('.bringDataCo').on('click',testingDataCom);

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
           console.log (responsePos.data)
        }
    )
}
function testingDataCom(){
    return axios.get('https://jsonplaceholder.typicode.com/posts/:id/comments')
    .then(
        function dataCom(responseCom){
           console.log (responseCom.data)
        }
    )
}
