var settings = {
  url: "https://jsonplaceholder.typicode.com/posts/4/comments",
  method: "GET",
  timeout: 0,
  headers: {
    Cookie: "__cfduid=dfac7795eb88e235d6e3ce30d27228df41619517766",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response);
  a = response;
});
