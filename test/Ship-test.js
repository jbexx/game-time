var assert = require('chai').assert;
var Ship = require('../lib/Ship.js');

describe('Ship', function () {

  it('should be a function', function() {
    assert.isFunction(Ship)
  })
})



// var { expect, assert } = require('chai');
// var Block = require('../lib/Block');
//
// describe('Block Functionality', function () {
//   let block;
//
//   beforeEach(function () {
//     block = new Block(50, 50, 10, 10);
//   }
// })
//
// it('should be a function', function () {
//   expect(block).to.be.an.instanceof(Block);
// })
//
// it('should have x, y, width and height', function () {
//   expect(block).to.deep.equal({
//     x: 50;
//     y: 50;
//     width: 10;
//     height: 10;
//   });
// })
//
// it('should have a move funcftion', function () {
//   assert.isFunction(block.move);
//   expect(block).to.have.property('move');
// })
//
// it('block.move should move right', function () {
//   var right = { x: 1, y: 0};
//   expect(block.x).to.equal(50);
//   block.move(right);
//   expect(block.x).to.equal(51);
// })
//
// it('block.move should move left', function () {
//   var left = { x: -1, y: 0};
//   expect(block.x).to.equal(50);
//   block.move(left);
//   expect(block.x).to.equal(49);
// })
//
// // var down = { x: 0, y: 1};
// // var up = { x: 0, y: -1};
//
// it('should be able to detect collisions', function () {
//   var secondBlock = new Block(75, 75, 10, 10);
//
//   expect(block.isColliding(secondBlock)). to.equal('false');
//   expect(secondBlock.isColliding(block)).to.equal('false');
// })
