class Enemy {
  constructor(pos, width, height, ctx) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  handle(parentArray, score, canvas, player, bullet) {
    this.draw();
    
    if (parentArray.length > 0 && this.y >= canvas.height || parentArray.length > 0 && this.x >= canvas.width) {
      parentArray.shift();
      score -= 1000;
    }

    //this collision
    if (player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y) {
      parentArray.shift();
      player.hp--;
      $w(".health").html(player.hp);
      score -= 100;
      $w('.message').html("-1 HP");
    }

    if (bullet.x < this.x + this.width &&
      bullet.x + bullet.width > this.x &&
      bullet.y < this.y + this.height &&
      bullet.y + bullet.height > this.y) {
      $w('.message').html("Kill");
      parentArray.shift();
      score += 1000 + (canvas.height - player.y);
    }
    return score;
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