import Bullet from './bullet.js';
import Sprite from './sprite.js';
import shipTree from './util/ship_tree.js';

class Ship {
  constructor(canvas, ctx, type) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.props = shipTree[type];

    this.fire = this.fire.bind(this);
    this.reload = this.reload.bind(this);
    
    this._buildBullets = this._buildBullets.bind(this);
    this.bullets = this._buildBullets();

    this.createSprite = this.createSprite.bind(this);
    this.createLeftSprite = this.createLeftSprite.bind(this);
    this.createRightSprite = this.createRightSprite.bind(this);
    this.changeBulletCount = this.changeBulletCount.bind(this);
  }
  changeBulletCount(x) {
    this.props.bulletCount = x;
    this.bullets = this._buildBullets();
  }
  _buildBullets() {
    const bullets = [];

    for (let i = 0; i < this.props.bulletCount; i++) {
      bullets.push(new Bullet([this.props.x + (this.props.width / 2) - 2, this.props.y - (2 + (this.props.bulletCount - i))], this.ctx, this.canvas));
    }

    return bullets;
  }

  createSprite() {
    let shipImage = new Image();
    shipImage.src = "assets/ship.png";
    return new Sprite({
      context: this.canvas.getContext("2d"),
      cropX: 0,
      cropY: 258,
      x: (this.canvas.width - 28) / 2 - 17,
      y: (this.canvas.height - 28) - (25 / 2),
      width: this.props.width + 15,
      height: this.props.height + 15,
      image: shipImage,
      frameWidth: 60,
      frameHeight: 42,
    });
  }

  createLeftSprite() {
    let shipImage = new Image();
    shipImage.src = "assets/ship.png";
    return new Sprite({
      context: this.canvas.getContext("2d"),
      cropX: 0,
      cropY: 321,
      x: (this.canvas.width - 28) - 12,
      y: (this.canvas.height - 28) - (25 / 2),
      width: this.props.width + 15,
      height: this.props.height + 15,
      image: shipImage,
      frameWidth: 60,
      frameHeight: 43,
    });
  }
  createRightSprite() {
    let shipImage = new Image();
    shipImage.src = "assets/ship.png";
    return new Sprite({
      context: this.canvas.getContext("2d"),
      cropX: 0,
      cropY: 385,
      x: (this.canvas.width - 28) - 12,
      y: (this.canvas.height - 28) - (25 / 2),
      width: this.props.width + 15,
      height: this.props.height + 15,
      image: shipImage,
      frameWidth: 60,
      frameHeight: 42,
    });
  }

  fire() {
    this.bullets.forEach(bullet => {
      bullet.render();
      bullet.draw();
      bullet.update(this.props.weapon);
    });
  }

  reload() {
    this.bullets.forEach((bullet, i) => {
      if (bullet.y < 2) {
        bullet.x = this.props.x + (this.props.width / 2) - 2;
        bullet.y = this.props.y - (2 + (this.props.bulletCount - i));
      }
    });
  }
  
  draw() {
    this.createSprite();
    this.createLeftSprite();
    this.createRightSprite();
    this.ctx.beginPath();
    this.ctx.rect(this.props.x, this.props.y, this.props.width, this.props.height);
    // this.ctx.fill();
    this.ctx.closePath();
  }
};

export default Ship;