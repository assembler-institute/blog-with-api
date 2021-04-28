var settings = {
    "url": "https://jsonplaceholder.typicode.com/posts",
    "method": "GET",
    "timeout": 0,
  };
  
$.ajax(settings).done(function (response) {
console.log(response);
});