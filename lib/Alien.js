class Alien {
  constructor(x, y, speed = 3, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.speed;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = 'green';


  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }

  remove() {
    this.color = 'pink';
  }
}

module.exports = Alien;

// var { expect } = require('chai');
// var Snake = require('../lib.Snake');
//
// class Snake {
//   constructor(length = 5) {
//     this.segments = [];
//
//     for (var i = 0; i < length; i++) {
//       let size = 10;
//       let x = i * size + 2;
//       let y = 10
//
//       this.segments.push(new SnakeSegment(x, y, size, size))
//       array[i]
//     }
//   }
// }
//
// module.exports = Snake;
