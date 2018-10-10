export const keyDownHandler = (e) => {
  if (e.keyCode === 39) {
    e.preventDefault();
    rightPressed = true;
  } else if (e.keyCode === 37) {
    e.preventDefault();
    leftPressed = true;
  } else if (e.keyCode === 38) {
    e.preventDefault();
    upPressed = true;
  } else if (e.keyCode === 40) {
    e.preventDefault();
    downPressed = true;
  } else if (e.keyCode === 13) {
    e.preventDefault();
    isPaused = !isPaused;
    $w('.start-menu').toggleClass('hidden');
    initial ? $w('.start-menu').html("Pause") : null;
  } else if (e.keyCode === 83) {
    musicPaused = !musicPaused;
  }
};

export const keyUpHandler = (e) => {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40) {
    downPressed = false;
  }
};