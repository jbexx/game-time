class Bullet {
  constructor(x, y, speed) {
    this.active = true;
    this.width = 5;
    this.height = 5;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.xVelocity = 0;
    this.yVelocity = -this.speed;
    this.color = 'red';
  }

  inBounds(game) {
    return this.x >= 0 && this.x <= game.width && this.y >= 0 && this.y <= game.height;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    this.active = this.active && this.inBounds();
  }

}


module.exports = Bullet;
