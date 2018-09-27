import Ship from './ship.js';
import Bullet from './bullet.js';
import Enemy from './enemy.js';
Make slow enemies and side enemies. Add links and D-pad.
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');



const ship = new Ship(canvas, ctx);
const shipAttr = ship.attr;
const bullet = new Bullet([shipAttr.x + 13, shipAttr.y - 2], ctx);

const enemies = [];

for (let i = 0; i < 100; i++) {
  let randomX = Math.floor(Math.random() * (canvas.width - 20) + 15);
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
    
    //enemy logic
    let enemy = enemies[0];
    enemy.draw();
    enemy.y += score > 10000 ? 1 : .5;

    if (enemies.length > 0 && enemy.y > canvas.height) {
      enemies.shift();
      score -= 1000;
    }

    //enemy collision
    let enemyXStart = enemy.x;
    let enemyXEnd = enemy.x + enemy.width;
    let enemyYStart = enemy.y;
    let enemyYEnd = enemy.y + enemy.height;

    if (shipAttr.x < enemy.x + enemy.width &&
        shipAttr.x + shipAttr.width > enemy.x &&
        shipAttr.y < enemy.y + enemy.height &&
        shipAttr.y + shipAttr.height > enemy.y) {
      enemies.shift();
      shipAttr.hp--;
      $w(".health").html(shipAttr.hp);
      score -= 100;
      $w('.message').html("-1 HP");
    }

    if (bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y) {
          $w('.message').html("Kill");
          enemies.shift();
          score += 1000 + (canvas.height - shipAttr.y);
      }
    

    ship.draw();
    
    bullet.draw();
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
        console.log("RRR");
        
        document.location.reload(); 
      }
    });
    cancelAnimationFrame(stopAnime);
    return true;
  } else if (enemies.length < 1) {
    alert(`Final score ${score}`)
    document.location.reload();
  }
}
let isPaused = true;
var initial = true;
document.addEventListener('DOMContentLoaded', () => {
  $w('.start-menu').on("click", () => {
    initial = false;
    isPaused = false;
    $w('.start-menu').addClass('hidden');
  });

});

const stopAnime = requestAnimationFrame(draw);