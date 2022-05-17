/**
 * Resize and document ready listener
 */
function listeningTinder() {
  $(document).ready(function () {
    swipeCard();
  });
  $(window).on("resize", function () {
    swipeCard();
  });
}

/**
 * Swipe Card
 */
function swipeCard() {
  if ($(window).width() < 768) {
    let animating = false;
    let cardsCounter = 0;
    let numOfCards = 6;
    let decisionVal = 80;
    let pullDeltaX = 0;
    let deg = 0;
    let $card;

    function pullChange() {
      animating = true;
      deg = pullDeltaX / 10;
      $card.addClass('moving');
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
            $(".post-card").removeClass("below");
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
          .attr("style", "");

        pullDeltaX = 0;
        animating = false;
      }, 300);
    }

    $(document).on("mousedown touchstart", ".post-card:not(.inactive)", function (e) {
      if (animating) return;

      $card = $(this);
      let startX = e.pageX || e.originalEvent.touches[0].pageX;

      $(document).on("mousemove touchmove", function (e) {
        let x = e.pageX || e.originalEvent.touches[0].pageX;
        pullDeltaX = x - startX;
        if (!pullDeltaX) return;
        pullChange();
      });

      $(document).on("mouseup touchend", function () {
        $card.removeClass('moving');
        $(document).off("mousemove touchmove mouseup touchend");
        if (!pullDeltaX) return; // prevents from rapid click events
        release();
      });
    });
  }
}

export {
  listeningTinder
};