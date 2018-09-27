class Bullet {
  constructor(startPos, ctx) {
    this.ctx = ctx;
    this.x = startPos[0];
    this.y = startPos[1];
    this.radius = 2;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0f380f';
    this.ctx.fill();
    this.ctx.closePath();
  }  
}

export default Bullet;