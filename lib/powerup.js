import Ship from './ship.js';

class Powerup {
  constructor(pos, dim, shipArray, ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = pos[0];
    this.y = pos[1];
    this.width = dim[0];
    this.height = dim[1];
    this.ships = shipArray;
    this.addMGShip = this.addMGShip.bind(this);
    this.resetShip = this.resetShip.bind(this);
    this.collide = this.collide.bind(this);
    this.used = this.used.bind(this);
  }

  static buildAllPowerUps(canvas, ctx, ships) {
    const powerups = [];

    for (let i = 0; i < 10; i++) {
      let randoX = Math.floor(Math.random() * (canvas.width)) + 1;

      let powerup = new Powerup([randoX, 0], [15, 14], ships, ctx, canvas);
      powerups.push(powerup);
    }
    return powerups;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.closePath();
  }

  update() {
    this.y += 1.5;
  }

  addMGShip() {
    const mgShip = new Ship(this.canvas, this.ctx, { x: this.ships[0].attr.x, y: this.ships[0].attr.y, hp: this.ships[0].attr.hp, bulletCount: 5 });
    this.ships.push(mgShip);
    this.ships.shift();
  }

  resetShip(ship) {
    const defaultShip = new Ship(this.canvas, this.ctx, { x: ship.attr.x, y: ship.attr.y, hp: ship.attr.hp });
    this.ships.push(defaultShip);
    this.ships.shift();
  }

  collide(parentArray) {
    if (
      this.ships[0].attr.x < this.x + this.width &&
      this.ships[0].attr.x + this.ships[0].attr.width > this.x &&
      this.ships[0].attr.y < this.y + this.height &&
      this.ships[0].attr.y + this.ships[0].attr.height > this.y
    ) {
      this.addMGShip();
      this.used(parentArray);
    }
  }

  used(parentArray) {
    parentArray.shift();
    this.addMGShip();
    setTimeout(() => this.resetShip(this.ships[0]), 10000);
  }
}

export default Powerup;