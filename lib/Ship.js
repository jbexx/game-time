var Skeleton = require('./Skeleton.js');

class Ship extends Skeleton {
  constructor(x, y, width, height, shape, direction) {
    super (x, y, width, height, shape, direction);
  }

  move (direction) {
    super.move(direction);
      this.x = direction.x;
      this.y = direction.y;
    }
  }


module.exports = Ship;
