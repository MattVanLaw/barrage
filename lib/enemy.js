class Enemy {
  constructor(pos, width, height, ctx) {
    this.x = pos[0];
    this.y = pos[1];
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  static buildAllEnemies(canvas, ctx) {
    const enemies1 = [];
    const enemies1b = [];
    const enemies2 = [];


    for (let i = 0; i < 1000; i++) {
      let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);
      enemies1.push(new Enemy([randomX, 0], 15, 35, ctx));
    }
    for (let i = 0; i < 1000; i++) {
      let randomX = Math.floor(Math.random() * (canvas.width - 60) + 15);
      enemies1b.push(new Enemy([randomX, 0], 15, 35, ctx));
    }

    for (let i = 0; i < 1000; i++) {
      let randomY = Math.floor(Math.random() * (canvas.height)) - (canvas.height / 2);
      enemies2.push(new Enemy([0, randomY], 50, 18, ctx));
    }
    return { enemies1, enemies1b, enemies2 };
  }

  playerHit(player, parentArray, score) {
    if (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
    ) {
      this.die(parentArray);
      player.hp--;
      $w(".health").html(player.hp);
      return score - 100;
    }

    return score;
  }

  killed(parentArray, score, canvas, player, bullet) {
    this.draw();
    if (
      bullet.x < this.x + this.width &&
      bullet.x + bullet.width > this.x &&
      bullet.y < this.y + this.height &&
      bullet.y + bullet.height > this.y
    ) {
      this.die(parentArray);
      return score + 1000 + (canvas.height - player.y);
    }
    return score;
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
    parentArray.shift()
  }

  update(delta) {
    this.x += delta[0];
    this.y += delta[1];
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    // this.ctx.fillStyle = '#0f380f';
    // this.ctx.fill();
    this.ctx.closePath();
  }
}

export default Enemy;