class Alien {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = 35;
    this.height = 35;
    this.speedX = 1;
    this.spriteX = 32;
    this.spriteY = 185;
  }


  draw(ctx) {
  ctx.drawImage(this.img, this.spriteX, this.spriteY, 15, 11, this.x, this.y, this.width, this.height);
  }
}

module.exports = Alien;
