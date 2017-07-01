class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.speedX = 1;
    this.color = 'green';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

module.exports = Alien;
