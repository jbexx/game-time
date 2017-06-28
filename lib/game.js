const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');



const game = document.getElementById('game');
const ctx = game.getContext('2d');

var ship1 = new Ship(x = game.width / 2, y = game.height - 40, 20, 20, 'red');


function gameLoop() {

  ctx.clearRect(0, 0, game.width, game.height);

  ship1.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


document.addEventListener('keydown', function(e) {
  console.log(e.keyCode);
  console.log(ship1.x);
  switch(e.keyCode) {
    case 37:
      ship1.x -= 13;
      break;

    case 39:
      ship1.x += 13;
      break;
  };
});
