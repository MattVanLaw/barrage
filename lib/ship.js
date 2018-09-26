class Ship {
  constructor(canvas, ctx, options) {
    this.canvas = canvas;
    this.ctx = ctx;
    const weaponTree = {
      default: {
        fire: [0, 4],
      },
    };

    let defaults = {
      width: 28,
      height: 4,
      x: (canvas.width - 28) / 2, //center X
      y: (canvas.height - 4),
      hp: 5,
      weapon: weaponTree["default"],
    }
    this.attr = Object.assign(defaults, options);
  }
  attr() {
    return this.attr;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.attr.x, this.attr.y, this.attr.width, this.attr.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
    this.ctx.closePath();
  }
};

export default Ship;