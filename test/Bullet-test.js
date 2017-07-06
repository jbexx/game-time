var { expect, assert } = require('chai');
var Bullet = require('../lib/Bullet.js');

describe('Bullet', function () {

  bullet = new Bullet('assets/galaga_sprite_sheet.png', 13, 550, -8);

  it('should be a function', function() {
    assert.isFunction(Bullet)
  })

  it('should instantiate the death object, Bullet', () => {
    expect(bullet).to.be.an.instanceof(Bullet);
  })

  it('should have an x coordinate', () => {
    expect(bullet.x).to.equal(13);
  })

  it('should have a y coordinate', () => {
    expect(bullet.y).to.equal(550);
  })

  it('should have a velocity', () => {
    expect(bullet.velocity).to.equal(-8);
  })

  it('should have a width', () => {
    expect(bullet.width).to.equal(10);
  })

  it('should have a height', () => {
    expect(bullet.height).to.equal(20);
  })

  it('should have a boolean as property of active', () => {
    expect(bullet.active).to.be.a('boolean');
  })

  it('should have an image', () => {
    expect(bullet.img).to.equal('assets/galaga_sprite_sheet.png');
  })

  it('should have a draw method', () => {
    assert.isFunction(bullet.draw)
  })

})
