const Skeleton = require('./Skeleton');

class Alien extends Skeleton {
  constructor(img, x, y) {
    super(img, x, y);
    this.width = 35;
    this.height = 35;
    this.speedX = 1.3
    this.origin = x;
    this.spriteX1 = 32;
    this.spriteY1 = 110;
    this.spriteX2 = 32;
    this.spriteY2 = 161;
    this.spriteX3 = 32;
    this.spriteY3 = 185;
    this.spriteW = 15;
    this.spriteH = 11;
  }


  drawAlien1(ctx) {
    ctx.drawImage(this.img, this.spriteX1, this.spriteY1, this.spriteW, 16, this.x, this.y, this.width, this.height);
  }

  drawAlien2(ctx) {
    ctx.drawImage(this.img, this.spriteX2, this.spriteY2, this.spriteW, this.spriteH, this.x, this.y, this.width, this.height);
  }

  drawAlien3(ctx) {
    ctx.drawImage(this.img, this.spriteX3, this.spriteY3, this.spriteW, this.spriteH, this.x, this.y, this.width, this.height);
  }

  explodeAlien() {
    this.spriteX1 = 201;
    this.spriteY1 = 230;
    this.spriteX2 = 201;
    this.spriteY2 = 230;
    this.spriteX3 = 201;
    this.spriteY3 = 230;
    this.spriteW = 14;
    this.spriteH = 14;
    this.width = 45;
    this.height = 45;
    setTimeout( () => {
      this.spriteX1 = 223;
      this.spriteY1 = 229;
      this.spriteX2 = 223;
      this.spriteY2 = 229;
      this.spriteX3 = 223;
      this.spriteY3 = 229;
      this.spriteW = 18;
      this.spriteH = 18;
      this.width = 60;
      this.height = 60;
    }, 100);
    setTimeout( () => {
      this.spriteX1 = 248;
      this.spriteY1 = 223;
      this.spriteX2 = 248;
      this.spriteY2 = 223;
      this.spriteX3 = 248;
      this.spriteY3 = 223;
      this.spriteW = 32;
      this.spriteH = 30;
      this.width = 70;
      this.height = 70;
    }, 200);
    setTimeout( () => {
      this.spriteX1 = 288;
      this.spriteY1 = 222;
      this.spriteX2 = 288;
      this.spriteY2 = 222;
      this.spriteX3 = 288;
      this.spriteY3 = 222;
      this.spriteW = 32;
      this.spriteH = 32;
      this.width = 85;
      this.height = 85;
    }, 300);
  }
}

module.exports = Alien;
