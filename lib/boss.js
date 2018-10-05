import Enemy from './enemy.js';
import Sprite from './sprite.js';
import blockOnBlock from './util/collision.js';

class Boss extends Enemy {
  constructor(pos, width, height, ctx, hp) {
    super(pos, width, height, ctx);
    this.hp = hp;
    this.hitScore = this.hitScore.bind(this);
    
    this.draw = this.draw.bind(this);
    this.killed = this.killed.bind(this);
    this.hurtPlayer = this.hurtPlayer.bind(this);
    this.collide = false;
  }

  killed() {
    this.hp === 0;
  }

  hitScore(score, canvas, player, bullet) {
    const collision = blockOnBlock(bullet, this);
    if (collision) {
      this.hp--;  
      if (this.hp <= 0) {
        return score + 8000 + (canvas.height - player.y);
      }
      return score + 150;
    }
    return score;
  }

  hurtPlayer(player, score) {
    const collision = blockOnBlock(player, this);
    if (collision && !this.collide) {
      player.hp--;
      $w(".health").html(player.hp);
      this.collide = true;
      return score - 100;
    }

    return score;
  }

  update(canvas) {
    if (this.y >= 0 && this.y < canvas.height) {
      this.y += 3;
    } else 
    if(this.y >= canvas.height) {
      this.y = 0;
      this.collide = false;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.fillStyle = '#0f380f';
    // this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Boss;