import Ship from './ship.js';
import Bullet from './bullet.js';
import Enemy from './enemy.js';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

//default ship settings w/ bullets
const ship = new Ship(canvas, ctx);
const shipAttr = ship.attr;
const bulletLeft = new Bullet([shipAttr.x + 4, shipAttr.y], ctx);
const bullet = new Bullet([shipAttr.x + 13, shipAttr.y], ctx);

const enemies = [];

for (let i = 0; i < 100; i++) {
  let randomX = Math.floor(Math.random() * canvas.width + 1);
  enemies.push(new Enemy([randomX, 0], 15, 5, ctx));
}

//initial keypress state
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let scoreMod = 3;
let score = shipAttr.hp;
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  $w(".health").html(shipAttr.hp + "");
  score += scoreMod;
  $w(".score").html(Math.floor(score - shipAttr.hp) + "");
  gameOver(shipAttr.hp);
  
  //enemy logic
  let enemy = enemies[0];
  enemy.draw();
  let enemySpeed;
  if (score > 10000 === 0) {
    enemySpeed += 10;
  } else {
    enemySpeed = .5;
  }
  enemy.y += score > 10000 ? 1.5 : .5;

  if (enemies.length > 0 && enemy.y > canvas.height) {
    enemies.shift();
    score -= 1000;
  }

  //enemy collision
  let enemyXStart = enemy.x;
  let enemyXEnd = enemy.x + enemy.width;
  let enemyYStart = enemy.y;
  let enemyYEnd = enemy.y + enemy.height;

  let shipXStart = shipAttr.x;
  let shipXEnd = shipAttr.x + shipAttr.width;
  let shipYStart = shipAttr.y;
  let shipYEnd = shipAttr.y + shipAttr.height;

  if ((enemyXStart >= shipXStart) && 
      (enemyXStart <= shipXEnd) && 
      (enemyYEnd >= shipYStart) && 
      (enemyYEnd <= shipYEnd)) {
    enemies.shift();
    shipAttr.hp--;
    $w(".health").html(shipAttr.hp);
    score -= 100;
    $w('.message').html("-1 HP");
  }

  //bullet collision
  let bulletsXStart = bulletLeft.x - bulletLeft.radius;
  let bulletsXEnd = bullet.x + bullet.radius;
  let bulletLeftYStart = bulletLeft.y - bulletLeft.radius;
  let bulletLeftYEnd = bulletLeft.y + bulletLeft.radius;

  if ((bulletLeftYStart <= enemyYEnd) &&
      (bulletLeftYStart >= enemyYStart) &&
      (bulletsXStart <= enemyXStart) &&
      (bulletsXStart <= enemyXEnd) &&
      (bulletsXEnd >= enemyXStart) &&
      (bulletsXEnd <= enemyXEnd)) {
        $w('.message').html("Kill");
        enemies.shift();
        score += 2000;
      }

  ship.draw();
  // bulletLeft.draw();
  bullet.draw();
  bulletLeft.y -= 2;
  bullet.y -= score > 10000 ? 2.5 : 2;

  if (rightPressed && shipAttr.x < canvas.width - shipAttr.width) {
    shipAttr.x += score > 10000 ? 2 : 1;
  } else if (leftPressed && shipAttr.x > 0) {
    shipAttr.x -= score > 10000 ? 2 : 1;
  }

  if (upPressed && shipAttr.y > 0) {
    shipAttr.y -= score > 10000 ? 2 : 1;
  } else if (downPressed && shipAttr.y < canvas.height - shipAttr.height) {
    shipAttr.y += score > 10000 ? 2 : 1;
  }

  if (bulletLeft.y < 2) { 
    bulletLeft.x = shipAttr.x + 4;
    bulletLeft.y = shipAttr.y;
    bullet.x = shipAttr.x + 13;
    bullet.y = shipAttr.y;
  }
  setTimeout(() => $w('.message').html(""), 5000);

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
  if (hp <= 0) {
    alert("GAME OVER");
    document.location.reload();
  } else if (enemies.length < 1) {
    alert("You Win!")
    document.location.reload();
  }
}

requestAnimationFrame(draw);
