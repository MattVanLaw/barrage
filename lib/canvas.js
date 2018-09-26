const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let shipHeight = 4;
let shipWidth = 28;
let shipX = (canvas.width - shipWidth) / 2;
let shipY = (canvas.height - shipHeight);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const drawShip = () => {
  ctx.beginPath();
  ctx.rect(shipX, shipY, shipWidth, shipHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();

  if (rightPressed && shipX < canvas.width - shipWidth) {
    shipX += 1;
  } else if (leftPressed && shipX > 0) {
    shipX -= 1;
  }

  if (upPressed && shipY > 0) {
    shipY -= 1;
  } else if (downPressed && shipY < canvas.height - shipHeight) {
    shipY += 1;
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  } else if (e.keyCode === 38) {
    upPressed = true;
  } else if (e.keyCode === 40) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  } else if (e.keyCode === 38) {
    upPressed = false;
  } else if (e.keyCode === 40) {
    downPressed = false;
  }
}

setInterval(draw, 10);