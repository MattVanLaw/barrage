class Enemy {
  constructor(pos, width, height, ctx) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = '#0f380f';
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Enemy;