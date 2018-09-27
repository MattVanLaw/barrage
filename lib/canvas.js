import Ship from './ship.js';
import Bullet from './bullet.js';
import Enemy from './enemy.js';
// Make slow enemies1 and side enemies1. Add links and D-pad.
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ship = new Ship(canvas, ctx);
const shipAttr = ship.attr;
const bullet = new Bullet([shipAttr.x + 13, shipAttr.y - 2], ctx);

const enemies1 = [];
const enemies2 = [];

for (let i = 0; i < 100; i++) {
  let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);
  enemies1.push(new Enemy([randomX, 0], 15, 5, ctx));
}

for (let i = 0; i < 100; i++) {
  let randomY = Math.floor(Math.random() * (canvas.height + 331) - 15);
  enemies2.push(new Enemy([0, randomY], 5, 15, ctx));
}

//initial keypress state
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let scoreMod = 3;
let score = shipAttr.hp;

const draw = () => {
  if (gameOver(shipAttr.hp)) {
    return;
  }
  if (isPaused) {
    requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $w(".health").html(`HP: ${shipAttr.hp}`)
    $w(".health").attr("style", "color: #0f380f");
    score += scoreMod;
    $w(".score").html(Math.floor(score - shipAttr.hp) + "");
    
    let enemy1 = enemies1[0];
    let enemy2 = enemies2[0];
    if (score > 10000) {
      enemy1.update([0, 1.5]);
      enemy2.update([1, 0]);
      debugger
      score = enemy2.handle(enemies2, score, canvas, shipAttr, bullet) + 1000;
    } else {
      enemy1.update([0, 1]);
    }
    score = enemy1.handle(enemies1, score, canvas, shipAttr, bullet);
    
    ship.draw();
    
    bullet.draw();
    bullet.y -= score > 10000 ? 3 : 2;

    if (rightPressed && shipAttr.x < canvas.width - shipAttr.width) {
      shipAttr.x += score > 10000 ? 3 : 2;
    } else if (leftPressed && shipAttr.x > 0) {
      shipAttr.x -= score > 10000 ? 3 : 2;
    }

    if (upPressed && shipAttr.y > 0) {
      shipAttr.y -= score > 10000 ? 3 : 2;
    } else if (downPressed && shipAttr.y < canvas.height - shipAttr.height) {
      shipAttr.y += score > 10000 ? 3 : 2;
    }

    if (bullet.y <= 40) {
      bullet.draw();
    }

    if (bullet.y < 2) { 
      bullet.x = shipAttr.x + 13;
      bullet.y = shipAttr.y - 2;
    }

    setTimeout(() => $w('.message').html(""), 5000);
    requestAnimationFrame(draw);
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
  } else if (e.keyCode === 13) {
    isPaused = !isPaused;
    $w('.start-menu').toggleClass('hidden');
    initial ? $w('.start-menu').html("Pause") : null;
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
    $w('.start-menu').html(`Game Over.<br/>Final Score ${score}.<br/><span class="replay">r === restart</span>`);
    $w('.start-menu').removeClass('hidden');
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 82) {
        document.location.reload(); 
      }
    });
    cancelAnimationFrame(stopAnime);
    return true;
  } else if (enemies1.length < 1) {
    alert(`Final score ${score}`)
    document.location.reload();
  }
}
let isPaused = true;
var initial = true;
document.addEventListener('DOMContentLoaded', () => {
  $w('.start-menu').on("click", () => {
    initial = false;
    $w('.start-menu').html("Pause");
    isPaused = false;
    $w('.start-menu').addClass('hidden');
  });

});

const stopAnime = requestAnimationFrame(draw);