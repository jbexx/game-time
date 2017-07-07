class Alien {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 35;
    this.speedX = 1;
    // this.spriteX1 = 32;
    // this.spriteY1 = 110;
    // this.spriteX2 = 32;
    // this.spriteY2 = 161;
    this.spriteX3 = 32;
    this.spriteY3 = 185;
  }


  // drawAlien1(ctx) {
  // ctx.drawImage(this.img, this.spriteX1, this.spriteY1, 15, 16, this.x, this.y, this.width, this.height);
  // }

  // drawAlien2(ctx) {
  // ctx.drawImage(this.img, this.spriteX2, this.spriteY2, 15, 11, this.x, this.y, this.width, this.height);
  // }

  drawAlien3(ctx) {
    ctx.drawImage(this.img, this.spriteX3, this.spriteY3, 15, 11, this.x, this.y, this.width, this.height);
  }
}

module.exports = Alien;
