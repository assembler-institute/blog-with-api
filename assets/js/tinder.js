"use strict";

$(document).ready(function () {
  swipeCard();
});
$(window).on("resize", function () {
  swipeCard();
});

/**
 * Swipe Card
 */
function swipeCard() {
  if ($(window).width() < 768) {
    var animating = false;
    var cardsCounter = 0;
    var numOfCards = 6;
    var decisionVal = 80;
    var pullDeltaX = 0;
    var deg = 0;
    var $card, $cardReject, $cardLike;

    function pullChange() {
      animating = true;
      deg = pullDeltaX / 10;
      $card.css(
        "transform",
        "translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)"
      );
    }

    function release() {
      if (pullDeltaX >= decisionVal) {
        $card.addClass("to-right");
      } else if (pullDeltaX <= -decisionVal) {
        $card.addClass("to-left");
      }

      if (Math.abs(pullDeltaX) >= decisionVal) {
        $card.addClass("inactive");

        setTimeout(function () {
          $card.addClass("below").removeClass("inactive to-left to-right");
          cardsCounter++;
          if (cardsCounter === numOfCards) {
            cardsCounter = 0;
            $(".post__card").removeClass("below");
          }
        }, 300);
      }

      if (Math.abs(pullDeltaX) < decisionVal) {
        $card.addClass("reset");
      }

      setTimeout(function () {
        $card
          .attr("style", "")
          .removeClass("reset")
          .find(".post__card__choice")
          .attr("style", "");

        pullDeltaX = 0;
        animating = false;
      }, 300);
    }

    $(document).on(
      "mousedown touchstart",
      ".post__card:not(.inactive)",
      function (e) {
        if (animating) return;

        $card = $(this);
        var startX = e.pageX || e.originalEvent.touches[0].pageX;

        $(document).on("mousemove touchmove", function (e) {
          var x = e.pageX || e.originalEvent.touches[0].pageX;
          pullDeltaX = x - startX;
          if (!pullDeltaX) return;
          pullChange();
        });

        $(document).on("mouseup touchend", function () {
          $(document).off("mousemove touchmove mouseup touchend");
          if (!pullDeltaX) return; // prevents from rapid click events
          release();
        });
      }
    );
  }
}
