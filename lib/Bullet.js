const Skeleton = require('./Skeleton');

class Bullet extends Skeleton {
  constructor(img, x, y, velocity) {
    super(img, x, y);
    this.width = 10;
    this.height = 20;
    this.velocity = velocity;
    this.active = true;
  }

  draw(ctx) {
    if (this.velocity === -20) {
      ctx.drawImage(this.img, 362, 66, 4, 9, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.img, 0, 0, 4, 9, this.x, this.y, this.width, this.height);
    }
  }

}


module.exports = Bullet;
