import Ship from './ship.js';
import Enemy from './enemy.js';
import Powerup from './powerup.js';
import Sound from './sound.js';


const bkgMusic = new Sound("./assets/8-bit-punk.mp3");

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let ship = new Ship(canvas, ctx);

const ships = [ship];
let shipAttr = ships[0].attr;
let shipImage = new Image();
shipImage.src = "assets/enemy.png";

const sprite = (options) => {
  let that = {};

  that.context = options.context;
  that.width = options.width;
  that.height = options.height;
  that.image = options.image;
  that.x = options.x;
  that.y = options.y;
  that.cropX = options.cropX;
  that.cropY = options.cropY;
  that.frameWidth = options.frameWidth;
  that.frameHeight = options.frameHeight;

  that.render = function () {

    // Draw the animation
    that.context.drawImage(
      that.image,
      that.cropX,
      that.cropY,
      that.frameWidth,
      that.frameHeight,
      that.x, // x
      that.y, // y
      that.width,
      that.height);
    };
    return that;
};

const shipRender = () => {
  const shipPic = sprite({
    context: canvas.getContext("2d"),
    cropX: 252,
    cropY: 249,
    x: shipAttr.x - (shipAttr.width / 2) + 1,
    y: shipAttr.y - (shipAttr.height / 2),
    width: 54,
    height: 51,
    image: shipImage,
    frameWidth: 73,
    frameHeight: 73,
  });
  shipPic.render();
};
const powerups = Powerup.buildAllPowerUps(canvas, ctx, ships);
let mgImage = new Image();
mgImage.src ="assets/m-powerup.png";

const mgRender = () => {
  const mgPic = sprite({
    context: canvas.getContext("2d"),
    cropX: 0,
    cropY: 0,
    x: powerups[0].x - 3,
    y: powerups[0].y - 3,
    width: 20,
    height: 20,
    image: mgImage,
    frameWidth: 50,
    frameHeight: 50,
  });
  mgPic.render();
}

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
const allEnemies = Enemy.buildAllEnemies(canvas, ctx);
const enemies1 = allEnemies.enemies1;
const enemies1b = allEnemies.enemies1b;
const enemies2 = allEnemies.enemies2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let scoreMod = 1;
let score = 0;
let tick = 0;

const play = () => {
  shipAttr = ships[0].attr;
  let powerup = powerups[0];
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
    
    shipRender();
    
    if (tick > 1000 && tick <= 1150) {
      if (tick === 1150) tick = 0;
      powerup.draw();
      mgRender();
      powerup.update();
      powerup.collide(powerups);
    }

    tick += 1;
    let enemy1 = enemies1[0];
    let enemy1b = enemies1b[0];
    let enemy2 = enemies2[0];

    if (score > 3000) {
      enemy1.update([0, 1.5]);
      enemy1b.update([0, 2]);
      enemy2.update([1.5, 0.1]);
      ships[0].bullets.forEach(bullet => {
        score = enemy2.killed(enemies2, score, canvas, shipAttr, bullet);
        score = enemy1b.killed(enemies1b, score, canvas, shipAttr, bullet);
      });
    } else {
      enemy1.update([0, 1]);
    }

    ships[0].bullets.forEach(bullet => {
      score = enemy1.killed(enemies1, score, canvas, shipAttr, bullet);
    });

    score = enemy1.playerHit(shipAttr, enemies1, score);
    score = enemy1b.playerHit(shipAttr, enemies1b, score);
    score = enemy2.playerHit(shipAttr, enemies2, score);
    
    score = enemy1.died(enemies1, score, canvas);
    score = enemy1b.died(enemies1b, score, canvas);
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
    musicPause ? bkgMusic.stop() : bkgMusic.play();
    requestAnimationFrame(play);
  }
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
let musicPause = false;

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
  } else if (e.keyCode === 83) {
    musicPause = !musicPause;
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

//pull gameOver and saveScore to game util file.
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
