const Skeleton = require('./Skeleton');

class Ship extends Skeleton {
  constructor(img, x, y, width, height) {
    super(img, x, y);
    this.width = width;
    this.height = height;
    this.spriteX = 31;
    this.spriteY = 61;
    this.spriteW = 18;
    this.spriteH = 18
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.spriteX, this.spriteY, this.spriteW, this.spriteH, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 3;
  }

  moveRight() {
    this.x += 3;
  }

  inBounds() {
    if ((this.x) >= 770) {
      this.x = 770
    } else if ((this.x) <= 0) {
      this.x = 0
    }
  }

}

module.exports = Ship;
