const Skeleton = require('./Skeleton');

class Ship extends Skeleton {
  constructor(img, x, y, width, height) {
    super(img, x, y);
    this.width = width;
    this.height = height;
    this.spriteX = 31;
    this.spriteY = 61;
    this.spriteW = 18;
    this.spriteH = 18;
    this.shot = false;
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

  explodeShip() {
    this.spriteX = 204;
    this.spriteY = 66;
    this.spriteW = 24;
    this.spriteH = 24;
    this.width = 45;
    this.height = 45;
    setTimeout( () => {
      this.spriteX = 241;
      this.spriteY = 64;
      this.spriteW = 30;
      this.spriteH = 28;
      this.width = 60;
      this.height = 60;
    }, 200);
    setTimeout( () => {
      this.spriteX = 281;
      this.spriteY = 62;
      this.spriteW = 30;
      this.spriteH = 32;
      this.width = 70;
      this.height = 70;
    }, 400);
    setTimeout( () => {
      this.spriteX = 321;
      this.spriteY = 64;
      this.spriteW = 30;
      this.spriteH = 28;
      this.width = 85;
      this.height = 85;
    }, 600);
  }

}

module.exports = Ship;
