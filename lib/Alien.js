class Alien {
  constructor(x, y, speed, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 25;
    this.speed = 1;
    this.speedX = speed;
    this.speedY = speedY;
    this.color = 'green';
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed;
    if (this.x <= 100) {
      this.speedX = this.speed;
    } else if (this.x > 700) {
      this.x = -this.speed;
    }
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
