var Skeleton = require('./Skeleton.js');
var Bullet = require('./Bullet.js');

class Ship {
  constructor(x, y, width, height, color, center) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.center = this.width / 2;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  // shoot(ctx) {
  //   var bulletPosition = {x: this.center.x, y: this.center.y + this.size / 2};
  //   var bullet = new Bullet( bulletPosition, {x: 0, y: -6});
  //   bullet.draw(ctx);
  //   console.log('made bullet');
  //         // gameArray.push(bullet);
  // }

  // move(e, ship1) {
    // console.log(e.keyCode);
    // console.log('this is ship1.x' + ship1.x);
    // switch(e.keyCode) {
    //   case 37:
    //     ship1.x -= 1;
    //     break;
    //
    //   case 39:
    //     ship1.x += 1;
    //     break;
    // };
  // }

  // shoot(e) {
  //   if (this.keyCode === 32) {
  //     var bullet = new Bullet({x: this.center.x, y: this.center.y + this.size.x / 2}, { x: 0, y: -6});
  //   }
  // }

};



module.exports = Ship;
