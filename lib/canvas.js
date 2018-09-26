import Ship from './ship.js';
import Bullet from './bullet.js';
import Enemy from './enemy.js';

let score = 0;

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//default ship settings w/ bullets
const ship = new Ship(canvas, ctx);
const shipAttr = ship.attr;
const bulletLeft = new Bullet([shipAttr.x + 4, shipAttr.y], ctx);
const bulletRight = new Bullet([shipAttr.x + 23, shipAttr.y], ctx);



const enemies = [];

for (let i = 0; i < 5; i++) {
  let randomX = Math.floor(Math.random() * canvas.width + 1);
  enemies.push(new Enemy([randomX, 0], 5, 5, ctx));
}

//initial keypress state
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameOver(shipAttr.hp);
  
  let enemy = enemies[0];
  debugger
  enemy.draw();
  enemy.y += .5;

  
  if (enemy.y > canvas.height) {
    enemies.shift();
    debugger
  }

  ship.draw();
  bulletLeft.draw();
  bulletRight.draw();
  bulletLeft.y -= 2;
  bulletRight.y -= 2;

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

  if (bulletLeft.y < 2) { 
    bulletLeft.x = shipAttr.x + 4;
    bulletLeft.y = shipAttr.y;
    bulletRight.x = shipAttr.x + 23;
    bulletRight.y = shipAttr.y;
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
  if (hp < 0 || enemies.length < 1) {
    alert("GAME OVER");
    document.location.reload();
  }
}

requestAnimationFrame(draw);
