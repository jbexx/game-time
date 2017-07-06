var { expect, assert } = require('chai');
var Ship = require('../lib/Ship.js');

describe('Ship', () => {

  var ship = new Ship('assets/galaga_sprite_sheet.png', 31, 61, 18, 18);

  it('should instantiate our Ship', () => {
    expect(ship).to.be.an.instanceof(Ship);
  })

  it('should have an x coordinate', () => {
    expect(ship.x).to.equal(31);
  })

  it('should have a y coordinate', () => {
    expect(ship.y).to.equal(61);
  })

  it('should have a width', () => {
    expect(ship.width).to.equal(18);
  })

  it('should have a height', () => {
    expect(ship.height).to.equal(18);
  })

  it('should have an image', () => {
    expect(ship.img).to.equal('assets/galaga_sprite_sheet.png');
  })

  it('should have a draw method', () => {
    assert.isFunction(ship.draw);
  })

  it('should have a moveLeft method', () => {
    assert.isFunction(ship.moveLeft);
  })

  it('should move left', function () {
    var left = { x: -3, y: 0};

    expect(ship.x).to.equal(31);
    ship.moveLeft(left);
    expect(ship.x).to.equal(28);
  })

  it('should have a moveRight method', () => {
    assert.isFunction(ship.moveRight);
  })

  it('should move right', function () {
    var right = { x: 3, y: 0};

    expect(ship.x).to.equal(28);
    ship.moveRight(right);
    expect(ship.x).to.equal(31);
  })

  it('should have an inBounds method', () => {
    assert.isFunction(ship.inBounds);
  })

  it('should stay in the bounds of the canvas', () => {
    ship.x = 800;
    ship.inBounds();
    expect(ship.x).to.equal(770);
    ship.x = -30;
    ship.inBounds();
    expect(ship.x).to.equal(0)
  })
})
