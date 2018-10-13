import Ship from './ship.js';
import Enemy from './enemy.js';
import Powerup from './powerup.js';
import Sound from './sound.js';
import Sprite from './sprite.js';
import Boss from './boss.js';
import { gameOver} from './util/game_over.js';

//bkgMusic, canvas, ctx can go into main game file
let bkgMusic = new Sound("8-punk-music.mp3");
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let bulletFrame = 0;

const ships = [new Ship(canvas, ctx, "default")];
let shipProps = ships[0].props;

let frame = 0;
const shipPic = ships[0].createSprite(canvas);

const shipRender = () => {
  shipPic.x = shipProps.x - 12;
  shipPic.y = shipProps.y - (shipProps.height / 2);
  shipPic.cropX = frame * 64;
  shipPic.render();
};

const shipLeftPic = ships[0].createLeftSprite(canvas);

const shipLeftRender = () => {
  shipLeftPic.x = shipProps.x - 18;
  shipLeftPic.y = shipProps.y - (shipProps.height / 2);
  shipLeftPic.cropX = frame * 64;
  shipLeftPic.render();
};

const shipRightPic = ships[0].createRightSprite(canvas);

const shipRightRender = () => {
  shipRightPic.x = shipProps.x - 6;
  shipRightPic.y = shipProps.y - (shipProps.height / 2);
  shipRightPic.cropX = frame * 64;
  shipRightPic.render();
};

const powerups = Powerup.buildAllPowerUps(canvas, ctx, ships);

const mgRender = () => {
  const mgPic = Powerup.sprite(canvas, powerups);
  mgPic.render();
};

const boss = new Boss([canvas.width / 6 + 8, 0], 125, 90, ctx, 5000);
const bosses = [boss];

const bossPic = Boss.sprite(canvas, bosses[0]);

const bossRender = () => {
  bossPic.cropX = bossFrame * 272;
  bossPic.x = bosses[0].x;
  bossPic.y = bosses[0].y;
  bossPic.render();
};

const allEnemies = Enemy.buildAllEnemies(canvas, ctx);
const enemies1 = allEnemies.enemies1;
const enemies1b = allEnemies.enemies1b;
const enemies2 = allEnemies.enemies2;
let enemy1Image = new Image();
enemy1Image.src = "assets/enemy-missiles.png";
const enemy1Pic = Enemy.sprite(canvas, enemies1[0]);

const enemy1Render = () => {
  enemy1Pic.x = enemies1[0].x - (enemies1[0].width / 2 - 5);
  enemy1Pic.y = enemies1[0].y;
  if (bulletFrame >= 12 && enemy1Pic.cropY === 246) {
    bulletFrame = 0;
    enemy1Pic.cropY = 117;
  } else if (bulletFrame >= 12 && enemy1Pic.cropY === 117) {
    bulletFrame = 0;
    enemy1Pic.cropY = 246;
  } 
  enemy1Pic.render();
};

const enemy1bPic = new Sprite({
  context: canvas.getContext("2d"),
  cropY: 39.9,
  x: enemies1b[0].x - (enemies1[0].width / 2 - 5),
  y: enemies1b[0].y,
  width: 15.4,
  height: 42,
  image: enemy1Image,
  frameWidth: 31.5,
  frameHeight: 70,
});

const enemy1bRender = () => {
  enemy1bPic.x = enemies1b[0].x - (enemies1b[0].width / 2 - 5);
  enemy1bPic.y = enemies1b[0].y;
  enemy1bPic.cropX =  0 * 32.5,
  enemy1bPic.render();
};

let enemy2Image = new Image();
enemy2Image.src = "assets/side-bullet.png";
const enemy2Pic = new Sprite({
  context: canvas.getContext("2d"),
  cropX: 0,
  cropY: 0,
  x: enemies2[0].x - 1,
  y: enemies2[0].y - 2,
  width: 55,
  height: 20,
  image: enemy2Image,
  frameWidth: 67,
  frameHeight: 29,
});

const enemy2Render = () => {
  enemy2Pic.x = enemies2[0].x - 1;
  enemy2Pic.y = enemies2[0].y - 2;
  enemy2Pic.render();
};

const shipSpeed = (speed) => {
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
}

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

let scoreMod = 1;
let score = 0;
let tick = 0;
let musicPaused = false;
let anime = 0;
let bossFrame = 0;
const play = () => {
  shipProps = ships[0].props;
  let powerup = powerups[0];
  if (gameOver(shipProps.hp, bosses[0], stopAnime, score)) {
    return;
  } else if (isPaused) {
    requestAnimationFrame(play);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    musicPaused ? bkgMusic.stop() : bkgMusic.play();
    $w('.health').html(`HP:${shipProps.hp}`)
    $w('.health').attr('style', 'color: #0f380f');
    score += scoreMod;
    $w('.score').html(score + '');
    anime += 1;
    if (anime % 2 === 0) ++bossFrame;
    if (bossFrame >= 65) {
      bossFrame = 0;
    }
    bulletFrame++;
    if (frame >= 11) {
      frame = 0;
    }
    
    if (anime % 3 === 0) ++frame;
    
    if (leftPressed) {
      shipLeftRender();
    } else if (rightPressed) {
      shipRightRender();
    } else {
      shipRender();
    }
    enemy1Render();
    // enemies1[0].animateExplosion(frame, explosionPic);
    if (tick > 1000 && tick <= 1150) {
      if (tick === 1150) tick = 0;
      powerup.draw();
      mgRender();
      powerup.update(canvas);
      powerup.collide(powerups);
    }

    tick += 1;
    let enemy1 = enemies1[0];
    let enemy1b = enemies1b[0];
    let enemy2 = enemies2[0];

    if (score > 3000) {
      enemy1.update([0, 2]);
      enemy1b.update([0, 3]);
      enemy1bRender();
      enemy2Render();
      enemy2.update([1.9, 0.5]);
      
      ships[0].bullets.forEach(bullet => {
        score = enemy2.killed(enemies2, score, canvas, shipProps, bullet).score;
        score = enemy1b.killed(enemies1b, score, canvas, shipProps, bullet).score;
      });
      shipSpeed(4);
    } else if (score >= 40000) {
      enemy1.update([0, 2.5]);
      enemy1b.update([0, 3.5]);
      enemy1bRender();
      enemy2Render();
      enemy2.update([3, 1]);
      ships[0].bullets.forEach(bullet => {
        score = enemy2.killed(enemies2, score, canvas, shipProps, bullet);
        score = enemy1b.killed(enemies1b, score, canvas, shipProps, bullet);
      });
      shipSpeed(3);
    } else {
      enemy1.update([0, 1]);
      shipSpeed(2);
    }

    if (score >= 300000) {
      bosses[0].draw();
      bossRender();
      setInterval(() => bosses[0].update(canvas), 20000);
      bosses[0].hurtPlayer(shipProps, score);
      ships[0].bullets.forEach(bullet => {
        bosses[0].hitScore(score, canvas, ships[0], bullet);
      });
    }

    ships[0].bullets.forEach(bullet => {
      score = enemy1.killed(enemies1, score, canvas, shipProps, bullet).score;
    });
    
    score = enemy1.playerHit(shipProps, enemies1, score);
    score = enemy1b.playerHit(shipProps, enemies1b, score);
    score = enemy2.playerHit(shipProps, enemies2, score);
    
    score = enemy1.died(enemies1, score, canvas);
    score = enemy1b.died(enemies1b, score, canvas);
    score = enemy2.died(enemies2, score, canvas);
    ships[0].draw();

    ships[0].fire();
    ships[0].reload();
 
    if (score > 40000) {
      $w('#myCanvas').attr('style', "background: url('./assets/sky-pink.png");
    } else if (score > 60000) {
      $w('#myCanvas').attr('style', "background: purple");
    } else if (score > 400000) {
      $w('#myCanvas').attr('style', "background: black");
    }
    requestAnimationFrame(play);
  }
};

function keyDownHandler(e) {
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

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let isPaused = true;
var initial = true;

const stopAnime = requestAnimationFrame(play);
