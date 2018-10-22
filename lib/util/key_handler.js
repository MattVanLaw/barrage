export let rightPressed = false;
export let leftPressed = false;
export let upPressed = false;
export let downPressed = false;
export let isPaused = true;
var initial = true;

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

export const shipSpeed = (shipProps, canvas, speed) => {
  if (rightPressed && shipProps.x < canvas.width - shipProps.width) {
    shipProps.x += speed;
  } else if (leftPressed && shipProps.x > 0) {
    shipProps.x -= speed;
  }

  if (upPressed && shipProps.y > 0) {
    shipProps.y -= speed;
  } else if (downPressed && shipProps.y < canvas.height - shipProps.height) {
    shipProps.y += speed;
  }
};