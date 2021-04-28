

$('.bringDataUS').on('click',testingDataUs);
$('.bringDataPO').on('click',testingDataPo);
$('.bringDataCo').on('click',testingDataCom);

function testingDataUs(){
    return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(
        function dataUs(responseUs){
           console.log (responseUs.data)
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
