// var styles = require('./styles.css');
const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');

const background = document.getElementById('background');
const game = document.getElementById('game');

const screen = background.getContext('2d');
const ctx = game.getContext('2d');

var ship1 = new Ship(50, 150, 20, 20, 'red');


var direction = {
  x: 1,
  y: 1,
};

function gameLoop() {

  ctx.clearRect(0, 0, game.width, game.height);

  ship1.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
