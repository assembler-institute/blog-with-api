export function fnAjax(url, options) {
  let { method, success, error, data } = options;

  //   fetch((url = ""), {
  //     method: method || "GET", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));

  $.ajax({
    url: url,
    method: method || "GET",
    data: data,
    dataType: "json",
  })
    .done(function (data) {
      success(data);
    })
    .fail(function (err) {
      console.log("errorrrrrrr");
      //   error(err);
    });
}
