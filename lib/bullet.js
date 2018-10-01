class Bullet {
  constructor(startPos, ctx) {
    this.ctx = ctx;
    this.x = startPos[0];
    this.y = startPos[1];
    this.width = 3;
    this.height = 5;
  }

  update(score) {

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = '#306230';
    this.ctx.fill();
    this.ctx.closePath();
  }  
}

export default Bullet;