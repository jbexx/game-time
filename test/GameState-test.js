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

})
