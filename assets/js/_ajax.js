export function fnAjax(url, options) {
  let { method, success, error, data } = options;

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
      error(err);
    });
}
