import Ship from './ship.js';
import Enemy from './enemy.js';
import Powerup from './powerup.js';
import Sound from './sound.js';
import Sprite from './sprite.js';
import { gameOver } from './util/game_over.js';
import dropPowerup from './util/drop_powerup.js';
import { shipSpeed, isPaused, leftPressed, rightPressed, keyDownHandler, keyUpHandler } from './util/key_handler.js';
import { shipRender, shipLeftRender, shipRightRender } from './util/ship_render.js';

let bkgMusic = new Sound("8-punk-music.mp3");
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ships = [new Ship(canvas, ctx, 1, "default")];
let shipProps = ships[0].props;


const powerups = Powerup.buildAllPowerUps(canvas, ctx, ships);

const allEnemies = Enemy.buildAllEnemies(canvas, ctx);
const enemies1 = allEnemies.enemies1;
const enemies1b = allEnemies.enemies1b;
const enemies2 = allEnemies.enemies2;

let enemy1Image = new Image();
enemy1Image.src = "assets/enemy-missiles.png";
const enemy1Pic = Enemy.sprite(canvas, enemies1[0]);

let bulletFrame = 0;
let frame = 0;
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

let scoreMod = 1;
let score = 0;
let tick = 0;
let musicPaused = false;
let anime = 0;

const play = () => {
  shipProps = ships[0].props;
  
  if (gameOver(shipProps.hp, stopAnime, score)) {
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
   
    bulletFrame++;
    if (frame >= 11) {
      frame = 0;
    }
    
    if (anime % 3 === 0) ++frame;
    
    if (leftPressed) {
      shipLeftRender(ships, canvas, frame);
    } else if (rightPressed) {
      shipRightRender(ships, canvas, frame);
    } else {
      shipRender(ships, canvas, frame);
    }
    enemy1Render();
    
    dropPowerup(tick, canvas, powerups, ships[0])

    tick += 1;
    let enemy1b = enemies1b[0];
    let enemy1 = enemies1[0];
    let enemy2 = enemies2[0];
    if (score < 40000) {
      enemy1.update([0, 2]);
      enemy1b.update([0, 3]);
      enemy1bRender();
      enemy2Render();
      enemy2.update([1.9, 0.5]);
      
      ships[0].bullets.forEach(bullet => {
        score = enemy2.killed(enemies2, score, canvas, shipProps, bullet, ships[0].bullets).score;
        score = enemy1b.killed(enemies1b, score, canvas, shipProps, bullet, ships[0].bullets).score;
      });

      shipSpeed(shipProps, canvas, 4);
    } else if (score >= 40000) {
      enemy1.update([0, 2.5]);
      enemy1b.update([0, 3.5]);
      enemy1bRender();
      enemy2Render();
      enemy2.update([3, 1]);
      ships[0].type = 2;
      ships[0].bullets.forEach(bullet => {
        score = enemy2.killed(enemies2, score, canvas, shipProps, bullet, ships[0].bullets).score;
        score = enemy1b.killed(enemies1b, score, canvas, shipProps, bullet, ships[0].bullets).score;
      });
      shipSpeed(shipProps, canvas, 6);
    } 

    ships[0].bullets.forEach(bullet => {
      score = enemy1.killed(enemies1, score, canvas, shipProps, bullet, ships[0].bullets).score;
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
    if (score > 40000) $w('#myCanvas').attr('style', "background: url('./assets/sky-pink.png");
    requestAnimationFrame(play);
  }
}; 

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

const stopAnime = requestAnimationFrame(play);
