class Alien {
  constructor(x, y) {
    // this.x = game.width / 4 + Math.random() * game.width / 2;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.color = 'green';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }
}

module.exports = Alien;
