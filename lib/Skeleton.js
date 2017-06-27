class Skeleton {
  constructor(x, y, width, height, shape, direction, velocity) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.shape = shape;
    this.direction = direction;
    this.velocity = velocity;
  }

  draw(ctx) {
    ctx.fillStyle = this.shape;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(movement) {
    this.x = direction.x;
    this.y = direction.y; 
  }


}


module.exports = Skeleton;
