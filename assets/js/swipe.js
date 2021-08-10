let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

const tinder = document.getElementById("tinder");

tinder.addEventListener(
  "touchstart",
  function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  },
  false
);

tinder.addEventListener(
  "touchend",
  function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleTinder();
  },
  false
);

tinder.addEventListener(
  "mousedown",
  function (event) {
    touchstartX = event.offsetX;
    touchstartY = event.offsetY;
  },
  false
);

tinder.addEventListener(
  "mouseup",
  function (event) {
    touchendX = event.offsetX;
    touchendY = event.offsetY;
    handleTinder();
  },
  false
);

function handleTinder() {
  if (touchendX <= touchstartX) {
    console.log("Swiped left");
  }

  if (touchendX >= touchstartX) {
    console.log("Swiped right");
  }

  if (touchendY <= touchstartY) {
    console.log("Swiped up");
  }

  if (touchendY >= touchstartY) {
    console.log("Swiped down");
  }

  if (touchendY === touchstartY) {
    console.log("Tap");
  }
}
