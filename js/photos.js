

function printImage(){
    $('.divPost').each(function(idx,element){
        let randomNumber=Math.floor(Math.random()*300)
        $(element).css('background-image', `url(https://picsum.photos/500/?${randomNumber})`)
    })
}

