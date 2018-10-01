class Enemy {
  constructor(pos, width, height, ctx) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  died(parentArray, score, canvas, player, bullet) {
    this.draw();
    
    const collideWithPlayer = (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    );
    
    const shotDown = (
      bullet.x < this.x + this.width &&
      bullet.x + bullet.width > this.x &&
      bullet.y < this.y + this.height &&
      bullet.y + bullet.height > this.y
    );

    const diedOfOldAge = (
      parentArray.length > 0 && 
      this.y >= canvas.height || 
      parentArray.length > 0 && 
      this.x >= canvas.width
    );

    if (diedOfOldAge) {
      parentArray.shift();
      score -= 1000;
    }

    if (collideWithPlayer) {
      this.die(parentArray);
      player.hp--;
      $w(".health").html(player.hp);
      score -= 100;
    }

    if (shotDown) {
      this.die(parentArray);
      score += 1000 + (canvas.height - player.y);
    }
    return score;
  }

  die(parentArray) {
    parentArray.shift()
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