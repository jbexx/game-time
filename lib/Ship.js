require('./game');

class Ship {
  constructor(img, x, y, width, height) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
  ctx.drawImage(this.img, 31, 61, 18, 18, this.x, this.y, this.width, this.height);
  }

}

module.exports = Ship;
