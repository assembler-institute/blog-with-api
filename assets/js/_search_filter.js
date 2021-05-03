export function searchFilters(input, selector) {
  $(input).on("input", function () {
    $(selector).each(function (index, el) {
      let str = el.textContent.toLowerCase();
      if (str.includes($(input).val())) {
        $(this).closest("article").show();
      } else {
        $(this).closest("article").hide();
      }
    });
  });

  //   $(input).on("focusout", function () {
  //     console.log($(input).val());
  //     if ($(input).val().trim() === "") {
  //       $(selector).each(function (index, el) {
  //         $(selector).closest("article").show();
  //       });
  //     }
  //   });
}
