const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let speed = 0.025; // change to increase the ease
let fastSpeed = 1; // change to increase the ease

/**
 * Hover an element
 */
onMouseHover = () => {
  $bigBall.style.transform = 'scale(2)';
}

/**
 * Hover out an element
 */
onMouseHoverOut = () => {
  $bigBall.style.transform = 'scale(1)';
}

/**
 * Animate
 */
animate = () => {
  let distX = mouseX - cursorX;
  let distY = mouseY - cursorY - 16;

  cursorX = cursorX + (distX * speed);
  cursorY = cursorY + (distY * speed);

  $bigBall.style.left = cursorX + 'px';
  $bigBall.style.top = cursorY + 'px';

  cursorX = cursorX + (distX * fastSpeed);
  cursorY = cursorY + (distY * fastSpeed);

  $smallBall.style.left = cursorX + 10 + 'px';
  $smallBall.style.top = cursorY + 7 + 'px';

  requestAnimationFrame(animate);
}

animate();

document.addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
})

for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}
