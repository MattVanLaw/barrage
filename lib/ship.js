import Bullet from './bullet.js';
import Sprite from './sprite.js';

class Ship {
  constructor(canvas, ctx, options) {
    this.canvas = canvas;
    this.ctx = ctx;
    const weaponTree = {
      default: [0, 6],
    };

    let defaults = {
      width: 30,
      height: 25,
      x: (canvas.width - 28) / 2,
      y: (canvas.height - 28),
      hp: 10,
      weapon: weaponTree["default"], 
      bulletCount: 1, 
    };

    this.attr = Object.assign(defaults, options);
  
    this.fire = this.fire.bind(this);
    this.reload = this.reload.bind(this);
    this.bullets = [];
    for (let i = 0; i < this.attr.bulletCount; i++) {
      this.bullets.push(new Bullet([this.attr.x + (this.attr.width / 2) - 2, this.attr.y - (2 + (this.attr.bulletCount - i))], this.ctx, this.canvas));
    }
  }

  static createSprite(canvas) {
    let shipImage = new Image();
    shipImage.src = "assets/ship.png";
    return new Sprite({
      context: canvas.getContext("2d"),
      cropX: 0,
      cropY: 258,
      x: (canvas.width - 28) / 2 - 17,
      y: (canvas.height - 28) - (25 / 2),
      width: 60,
      height: 42,
      image: shipImage,
      frameWidth: 60,
      frameHeight: 42,
    });
  }

  static createLeftSprite(canvas) {
    let shipImage = new Image();
    shipImage.src = "assets/ship.png";
    return new Sprite({
      context: canvas.getContext("2d"),
      cropX: 0,
      cropY: 321,
      x: (canvas.width - 28) - 12,
      y: (canvas.height - 28) - (25 / 2),
      width: 60,
      height: 42,
      image: shipImage,
      frameWidth: 60,
      frameHeight: 43,
    });
  }
  static createRightSprite(canvas) {
    let shipImage = new Image();
    shipImage.src = "assets/ship.png";
    return new Sprite({
      context: canvas.getContext("2d"),
      cropX: 0,
      cropY: 385,
      x: (canvas.width - 28) - 12,
      y: (canvas.height - 28) - (25 / 2),
      width: 60,
      height: 42,
      image: shipImage,
      frameWidth: 60,
      frameHeight: 42,
    });
  }

  fire() {
    this.bullets.forEach(bullet => {
      bullet.render();
      bullet.draw();
      bullet.update(this.attr.weapon);
    });
  }

  reload() {
    this.bullets.forEach((bullet, i) => {
      if (bullet.y < 2) {
        bullet.x = this.attr.x + (this.attr.width / 2) - 2;
        bullet.y = this.attr.y - (2 + (this.attr.bulletCount - i));
      }
    });
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.attr.x, this.attr.y, this.attr.width, this.attr.height);
    // this.ctx.fill();
    this.ctx.closePath();
  }
};

export default Ship;