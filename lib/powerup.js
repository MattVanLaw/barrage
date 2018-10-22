import Ship from './ship.js';
import Sprite from './sprite.js';
const types = ["quick", "machineGun", "health"];
class Powerup {
  constructor(pos, dim, shipArray, ctx, canvas) {
    this.type = null;
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = pos[0];
    this.y = pos[1];
    this.width = dim[0];
    this.height = dim[1];
    this.ships = shipArray;
    this.collided = false;
    this.powerUp = this.powerUp.bind(this);
    this.resetShip = this.resetShip.bind(this);
    this.collide = this.collide.bind(this);
    this.used = this.used.bind(this);
  }

  static buildAllPowerUps(canvas, ctx, ships) {
    const powerups = [];

    for (let i = 0; i < 1000; i++) {
      let randoX = Math.floor(Math.random() * (canvas.width)) + 1;
      let type = types[Math.floor(Math.random() * types.length)]
      let powerup = new Powerup([randoX, 0], [15, 14], ships, ctx, canvas);
      powerup.type = type;
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

  update(canvas, parentArray) {
    this.y += 1.5;
    if (this.y === canvas.height) {
      this.y = 0;
      parentArray.shift();
    }
  }

  powerUp() {
    const shipPlus = new Ship(this.canvas, this.ctx, this.type);
    shipPlus.props.x = this.ships[0].props.x;
    shipPlus.props.y = this.ships[0].props.y;
    shipPlus.props.hp = this.ships[0].props.hp;
    this.ships.push(shipPlus);
    this.ships.shift();
  }

  resetShip() {
    const defaultShip = new Ship(this.canvas, this.ctx, "default");
    defaultShip.props.x = this.ships[0].props.x;
    defaultShip.props.y = this.ships[0].props.y;
    defaultShip.props.hp = this.ships[0].props.hp;
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
      if (this.type === "health") {
        if (!this.collided) this.ships[0].props.hp += 5;
        this.collided = true;
        parentArray.shift();
      } else {
        this.powerUp();
        this.used(parentArray);
      }
    }
  }

  used(parentArray) {
    parentArray.shift();
    this.powerUp();
    setTimeout(() => this.resetShip(), 5000);
  }
}

export default Powerup;