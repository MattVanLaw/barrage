class Bullet {
  constructor(startPos, ctx) {
    this.ctx = ctx;
    this.x = startPos[0];
    this.y = startPos[1];
    this.width = 3;
    this.height = 5;
  }

  update(delta) {
    this.x += delta[0];
    this.y -= delta[1];
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