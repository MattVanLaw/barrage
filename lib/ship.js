import Bullet from './bullet.js';

class Ship {
  constructor(canvas, ctx, options) {
    this.canvas = canvas;
    this.ctx = ctx;
    const weaponTree = {
      default: [0, 3],
    };

    let defaults = {
      width: 28,
      height: 4,
      x: (canvas.width - 28) / 2, //center X
      y: (canvas.height - 4),
      hp: 10,
      weapon: weaponTree["default"], 
      bulletCount: 1, 
    };

    this.attr = Object.assign(defaults, options);
    
    this.fire = this.fire.bind(this);
    this.reload = this.reload.bind(this);
    this.bullets = [];
    for (let i = 0; i < this.attr.bulletCount; i++) {
      this.bullets.push(new Bullet([this.attr.x + 10, this.attr.y + (10 * i)], this.ctx));
    }
  }

  fire() {
    this.bullets.forEach(bullet => {
      bullet.draw();
      bullet.update(this.attr.weapon);
    });
  }

  reload() {
    this.bullets.forEach((bullet, i) => {
      if (bullet.y < 2) {
        bullet.x = this.attr.x + 13;
        bullet.y = this.attr.y - (2 + (this.attr.bulletCount - i));
      }
    });
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.attr.x, this.attr.y, this.attr.width, this.attr.height);
    this.ctx.fillStyle = '#9bac0f';
    this.ctx.fill();
    this.ctx.closePath();
  }
};

export default Ship;