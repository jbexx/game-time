var Skeleton = require('./Skeleton.js');

class Ship extends Skeleton {
  constructor(x, y, width, height, shape, direction, veloctiy) {
    super (x, y, width, height, shape, direction, velocity);
  }

  move (movement) {
    super.move(movement);
      this.x = movement.x;
      this.y = movement.y;
    }
  }


module.exports = Ship;
