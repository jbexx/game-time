var { expect, assert } = require('chai');
var Alien = require('../lib/Alien.js');

describe('Alien', () => {

  var alien = new Alien('assets/galaga_sprite_sheet.png', 225, 20);

  it('should instantiate our not so good friend, Alien', () => {
    expect(alien).to.be.an.instanceof(Alien);
  })

  it('should have an x coordinate', () => {
    expect(alien.x).to.equal(225);
  })

  it('should have a y coordinate', () => {
    expect(alien.y).to.equal(20);
  })

  it('should have a width', () => {
    expect(alien.width).to.equal(35);
  })

  it('should have a height', () => {
    expect(alien.height).to.equal(35);
  })

  it('should have a speed on the x coordinate of 1', () => {
    expect(alien.speedX).to.equal(1);
  })

  it('should have an image', () => {
    expect(alien.img).to.equal('assets/galaga_sprite_sheet.png');
  })

  it('should have a draw method', () => {
    assert.isFunction(alien.drawAlien3)
  })

})
