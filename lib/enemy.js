import blockOnBlock from './util/collision.js';
import Sprite from './sprite.js';

class Enemy {
  constructor(pos, width, height, ctx) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.renderExplosion = this.renderExplosion.bind(this);
    this.animateExplosion = this.animateExplosion.bind(this);
    this.update = this.update.bind(this);
    this.randomX = Math.random() * 2000 + 1;
    this.randomY = Math.random() * 2000 + 1;
  }

  static buildAllEnemies(canvas, ctx) {
    const enemies1 = [];
    const enemies1b = [];
    const enemies2 = [];

    for (let i = 0; i < 1000; i++) {
      let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);
      enemies1.push(new Enemy([randomX, -45], 15, 35, ctx));
      
      randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);
      enemies1b.push(new Enemy([randomX, -45], 15, 35, ctx));
      
      let randomY = Math.floor(Math.random() * (canvas.height)) - (canvas.height / 2);
      enemies2.push(new Enemy([-60, randomY], 50, 18, ctx));
    }
    return { enemies1, enemies1b, enemies2 };
  }

  playerHit(player, parentArray, score) {
    const collision = blockOnBlock(player, this);
    
    if (collision) {
      this.die(parentArray);
      player.hp--;
      $w(".health").html(player.hp);
      return score - 100;
    }

    return score;
  }

  killed(parentArray, score, canvas, player, bullet) {
    const collision = blockOnBlock(bullet, this);
    
    if (collision) {
      this.die(parentArray);
      const newScore = score + 1000 + (canvas.height - player.y);
      return { score: newScore, dead: this }
    }
    return { score };
  }

  renderExplosion(src) {
    let explosionImg = new Image();
    explosionImg.src = src;

    return new Sprite({
      context: this.ctx,
      cropY: 0,
      x: this.x,
      y: this.y,
      width: 52,
      height: 300,
      image: explosionImg,
      frameWidth: 42,
      frameHeight: 300,
    });
  }

  animateExplosion(frame, explosionPic) {
    explosionPic.cropX = frame * 50.8888;
    explosionPic.x = this.x;
    explosionPic.y = this.y;
    explosionPic.render(); 
  }

  died(parentArray, score, canvas) {
    if (
      parentArray.length > 0 &&
      this.y >= canvas.height ||
      parentArray.length > 0 &&
      this.x >= canvas.width
    ) {
      parentArray.shift();
      return score - 1000;
    }
    return score;
  }

  die(parentArray) {
    parentArray.shift();
  }

  update(delta) {
    this.x += delta[0];
    this.y += delta[1];
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