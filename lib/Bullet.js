
class Bullet {
  constructor(img, x, y, velocity) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 20;
    this.velocity = velocity;
    this.color = 'red';
    this.active = true;
  }

  draw(ctx) {
    // this.velocity === -8 ? ctx.drawImage(this.img, 362, 66, 4, 9, this.x, this.y, this.width, this.height : ctx.drawImage(this.img, 202, 202, 4, 9, this.x, this.y, this.width, this.height)


    if(this.velocity === -8) {
      ctx.drawImage(this.img, 362, 66, 4, 9, this.x, this.y, this.width, this.height);
    } else {
    }
  }

}


module.exports = Bullet;
