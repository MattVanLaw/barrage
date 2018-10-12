import Ship from './ship.js';
import Sprite from './sprite.js';

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

    for (let i = 0; i < 1000; i++) {
      let randoX = Math.floor(Math.random() * (canvas.width)) + 1;

      let powerup = new Powerup([randoX, 0], [15, 14], ships, ctx, canvas);
      powerups.push(powerup);
    }
    return powerups;
  }

  static sprite(canvas, powerups) {
    let mgImage = new Image();
    mgImage.src = "assets/m-powerup.png";

    return new Sprite({
      context: canvas.getContext("2d"),
      cropX: 0,
      cropY: 0,
      x: powerups[0].x,
      y: powerups[0].y,
      width: 20,
      height: 20,
      image: mgImage,
      frameWidth: 50,
      frameHeight: 50,
    });
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.closePath();
  }

  update(canvas) {
    this.y += 1.5;
    if (this.y === canvas.height) this.y === 0;
  }

  addMGShip() {
    const mgShip = new Ship(this.canvas, this.ctx, "default");
    mgShip.changeBulletCount(15);
    this.ships.push(mgShip);
    this.ships.shift();
  }

  resetShip() {
    const defaultShip = new Ship(this.canvas, this.ctx, "default");
    defaultShip.changeBulletCount(1);
    this.ships.push(defaultShip);
    this.ships.shift();
  }

  collide(parentArray) {
    if (
      this.ships[0].props.x < this.x + this.width &&
      this.ships[0].props.x + this.ships[0].props.width > this.x &&
      this.ships[0].props.y < this.y + this.height &&
      this.ships[0].props.y + this.ships[0].props.height > this.y
    ) {
      this.addMGShip();
      this.used(parentArray);
    }
  }

  used(parentArray) {
    parentArray.shift();
    console.log(parentArray.length);
    this.addMGShip();
    setTimeout(() => this.resetShip(), 5000);
  }
}

export default Powerup;