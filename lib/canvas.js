import Ship from './ship.js';
import Enemy from './enemy.js';

let scoreEl = $w('.score').html();


const saveScore = (name, score) => {
  name = name || 'noname';
  document.getElementById('name'); 
  const newScore = {};
  newScore.score = parseInt(scoreEl);

  firebase.database().ref().child('scores/').push({
    name,
    score,
  });
};

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let ship = new Ship(canvas, ctx);

const ships = [ship];

const enemies1 = [];
const enemies2 = [];

for (let i = 0; i < 100; i++) {
  let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);
  enemies1.push(new Enemy([randomX, 0], 15, 5, ctx));
}

for (let i = 0; i < 100; i++) {
  let randomY = Math.floor(Math.random() * (canvas.height + 21) - 15);
  enemies2.push(new Enemy([0, randomY], 5, 15, ctx));
}

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let scoreMod = 3;
let score = 0;
let tick = 0;

const play = () => {
  let shipAttr = ships[0].attr;

  if (gameOver(shipAttr.hp)) {
    return;
  } else if (isPaused) {
    requestAnimationFrame(play);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $w('.health').html(`HP:${shipAttr.hp}`)
    $w('.health').attr('style', 'color: #0f380f');
    score += scoreMod;
    $w('.score').html(score + '');
    console.log(tick);
    
    if (tick === 1000 || tick === 5000) {
      ships.push(new Ship(canvas, ctx, { x: ships[0].attr.x, y: ships[0].attr.y, hp: ships[0].attr.hp, bulletCount: 5 }));
      ships.shift();
    } else if (tick > 1000 && tick % 1000 === 0) {
      ships.push(new Ship(canvas, ctx, { x: ships[0].attr.x, y: ships[0].attr.y, hp: ships[0].attr.hp, bulletCount: 1 }));
      ships.shift();
    }
    tick += 1;
    let enemy1 = enemies1[0];
    let enemy2 = enemies2[0];
    if (score > 3000) {
      enemy1.update([0, 1.5]);
      enemy2.update([1, 0]);
      ships[0].bullets.forEach(bullet => {
        score = enemy2.killed(enemies2, score, canvas, shipAttr, bullet);
      });
    } else {
      enemy1.update([0, 1]);
    }

    ships[0].bullets.forEach(bullet => {
      score = enemy1.killed(enemies1, score, canvas, shipAttr, bullet);
    });

    score = enemy1.playerHit(shipAttr, enemies1, score);
    score = enemy2.playerHit(shipAttr, enemies2, score);
    
    score = enemy1.died(enemies1, score, canvas);
    score = enemy2.died(enemies2, score, canvas);
    ships[0].draw();

    ships[0].fire();
    ships[0].reload();
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
    let frame = 0;

    frame += 1;

    requestAnimationFrame(play);
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

const gameOver = (hp) => {
  if (hp <= 0 || enemies1.length < 1) {
    const nameEl = document.getElementById('name');
    $w('.start-menu').html(`Game Over<br/><span class="replay">Press enter to play</span>`);
    let name = 'noname';
    nameEl.addEventListener('change', (e) => {
      name = e.target.value;
    });
    document.getElementsByTagName('form')[0].addEventListener('submit', (e) => {
      e.preventDefault();
      saveScore(name, score);
      document.getElementsByTagName('form')[0].classList.add('hidden');
    });
    $w('.start-menu').removeClass('hidden');
    document.getElementsByTagName('form')[0].classList.remove('hidden');

    $w('.start-menu').off('click', hideMenu);
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        document.location.reload();
      }
    });
    cancelAnimationFrame(stopAnime);
    return true;
  }
};

const hideMenu = () => {
  initial = false;
  $w('.start-menu').html('Pause');
  isPaused = false;
  $w('.start-menu').addClass('hidden');
};

let isPaused = true;
var initial = true;
document.addEventListener('DOMContentLoaded', () => {
  $w('.start-menu').on('click', hideMenu);
});

const stopAnime = requestAnimationFrame(play);
