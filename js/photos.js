const arrayPhotos=[
    "../assets/img/photopost/0.jpg",
    "../assets/img/photopost/1.jpg",
    "../assets/img/photopost/2.jpg",
    "../assets/img/photopost/3.jpg",
    "../assets/img/photopost/4.jpg",
    "../assets/img/photopost/5.jpg",
    "../assets/img/photopost/6.jpg",
    "../assets/img/photopost/7.jpg",
    "../assets/img/photopost/8.jpg",
    "../assets/img/photopost/9.jpg",
    "../assets/img/photopost/10.jpg",
    "../assets/img/photopost/11.jpg",
    "../assets/img/photopost/12.jpg",
    "../assets/img/photopost/13.jpg",
    "../assets/img/photopost/14.jpg",
    "../assets/img/photopost/15.jpg",
    "../assets/img/photopost/16.jpg"
]

printImage()


function printImage(){
    arrayPhotos.forEach( function (element,i) {
        $('.divPost').eq(i).css('background-image', 'url(' + element + ')');
    })
}


//export {printImage}