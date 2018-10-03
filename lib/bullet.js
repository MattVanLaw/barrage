import Sprite from './sprite.js';

class Bullet {
  constructor(startPos, ctx, canvas) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = startPos[0];
    this.y = startPos[1];
    this.width = 4;
    this.height = 17;
    this.bulletImage = new Image();
    this.bulletImage.src = "assets/bullet.png";
    this.render = this.render.bind(this);
  }

  render() {
    const bulletPic = new Sprite({
      context: this.canvas.getContext("2d"),
      cropX: 0,
      cropY: 0,
      x: this.x - 1,
      y: this.y - 1,
      width: 7,
      height: 20,
      image: this.bulletImage,
      frameWidth: 600,
      frameHeight: 700,
    });
    bulletPic.render();
  }

  update(delta) {
    this.x += delta[0];
    this.y -= delta[1];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.fill();
    this.ctx.closePath();
  }  
}

export default Bullet;