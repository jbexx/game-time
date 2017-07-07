var { expect, assert } = require('chai');
var GameState = require('../lib/GameState.js');

describe('GameState', function () {

  var game = new GameState();

  it('should be a function', function() {
    assert.isFunction(GameState)
  })

  it('should instantiate the Game', () => {
    expect(game).to.be.an.instanceof(GameState);
  })

  it.skip('should have a canvas', () => {
    expect(game.canvas).to.equal(13);
  })

  it('should start with a score of 0', () => {
    expect(game.score).to.equal(0);
  })

  it('should have a collide method', () => {
    assert.isFunction(game.collide);
  })

  it('should have an updateScore method', () => {
    assert.isFunction(game.updateScore)
  })

  it('should increase score by 100', () => {
    expect(game.score).to.equal(0);
    game.updateScore(); 
    expect(game.score).to.equal(100);
  })

  // it('should have a velocity', () => {
  //   expect(bullet.velocity).to.equal(-8);
  // })
  //
  // it('should have a width', () => {
  //   expect(bullet.width).to.equal(10);
  // })
  //
  // it('should have a height', () => {
  //   expect(bullet.height).to.equal(20);
  // })
  //
  // it('should have a boolean as property of active', () => {
  //   expect(bullet.active).to.be.a('boolean');
  // })
  //
  // it('should have an image', () => {
  //   expect(bullet.img).to.equal('assets/galaga_sprite_sheet.png');
  // })
  //
  // it('should have a draw method', () => {
  //   assert.isFunction(bullet.draw)
  // })

})
