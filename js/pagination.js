const arrUsers=[]
var cont=0;
async function makePagination(){
     await fetch("http://localhost:3000/posts/")
    .then(response=>response.json())
    .then(data=>{
        data.forEach(function(element,idx){
          cont++;
            if(cont==10){
              arrUsers.push(element)
              cont=0
            }
            
        })
    })
    createPage()
    Activatepagination()
}

function createPage(){
    for(let i=0;i<arrUsers.length;i++){
        $(".pagination").eq(0).append(`
            <li class="page-item"><a class="page-link" href="#">${i+1}</a></li>
        `)
    }
    $(".pagination").eq(0).append(`
            <li class="page-item"><a class="page-link" href="#">Next</a>
            `)
}
//listeners to pagination
function Activatepagination(){
    $(".page-item").eq(1).addClass("active")
    $(".page-item").on("click",changePage)
    //if buttons are disabled, turn of event listener
    $(".page-item").on("disabled",function(){
      $(".page-item").off("click",changePage)
    })
  }
  //when press pagination buttons, activate this function
function changePage(e){
    const item=$(".page-item");
    const button=e.target.textContent;
  
    //sum or rest the numId while press paginate buttons
    // && Check if numId is higher or lower than 10-1, comeback to 1
    if(numId==button){
      return;
    }
    if(button>=1 && button<=10){
      item.eq(0).css("cursor","pointer");
      numId=button;
      getPosts();
      printImage()
      }
  
  //if press previous, or next, check if can change of page
    if(button=="Previous" && numId>1){
      numId--;
      item.eq(11).removeClass("disabled")
      getPosts()
      printImage()
    }else if(button=="Next" && numId<10){
      numId++;
      item.eq(0).removeClass("disabled")
      getPosts();
      printImage()
  
    }
  //put disabled buttons
    if(numId==1){
      item.eq(0).addClass("disabled")
  
    }else if(numId==10){
      item.eq(11).addClass("disabled")
    }
    //remove the disabled for prev and next button
    if(numId<10 && numId>1){
      item.eq(11).removeClass("disabled")
      item.eq(0).removeClass("disabled");
    }
  
  //active page
    item.removeClass("active");
    item.eq(numId).addClass("active");
    //check if any post is deleted and toggle visible
    $(".divPost").each(function(idx,element){
      if($(element).css("display")=="none"){
        $(element).show()
      }else{
        return;
      }
    })
}

