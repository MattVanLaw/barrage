import Ship from './ship.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ship = new Ship(canvas, ctx);
const shipAttr = ship.attr;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();
  gameOver(shipAttr.hp);

  console.log(shipAttr.hp);
  if (rightPressed && shipAttr.x < canvas.width - shipAttr.width) {
    shipAttr.x += 1;
  } else if (leftPressed && shipAttr.x > 0) {
    shipAttr.x -= 1;
  }

  if (upPressed && shipAttr.y > 0) {
    shipAttr.y -= 1;
  } else if (downPressed && shipAttr.y < canvas.height - shipAttr.height) {
    shipAttr.y += 1;
  }
  
  requestAnimationFrame(draw);
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

function gameOver(hp) {
  if (hp < 0) {
    alert("GAME OVER");
    document.location.reload();
  }
  else
    console.log("still alive")
}

requestAnimationFrame(draw);
