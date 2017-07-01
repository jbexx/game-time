
class Bullet {
  constructor(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.velocity = velocity;
    this.color = 'red';
    this.active = true;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}


module.exports = Bullet;
