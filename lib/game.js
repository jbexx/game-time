const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');

const game = document.getElementById('game');
const ctx = game.getContext('2d');

var ship1 = new Ship(x = game.width / 2, y = game.height - 40, 20, 20, 'red',);
var gameArray = [];

// function update() {
//   gameArray.forEach( bullet => {
//     bullet.update();
//   });
//
//   gameArray = gameArray.filter( bullet => {
//     return bullet.active;
//   });
// };

function draw() {
  moveBullet();
  gameArray.forEach( bullet => {
    bullet.draw(ctx);
  });
};

function shoot(ctx) {
  var bullet = new Bullet( ship1.x+6, 580);
  gameArray.push(bullet);
  draw();
  console.log(bullet.y);
  console.log(gameArray);
  console.log('made bullet');
};

function moveBullet() {
  //take y position of bullet and decrese it by x amount as canvas gets redrawn
  //get y position of bullet
  // update();
  gameArray.forEach( bullet => {
    bullet.y -= 8;
    // bullet.y
  })
  //decres y position
}

function update() {
  gameArray.forEach( bullet => {
    bullet.update();
  });
  gameArray = gameArray.filter( bullet => {
    return bullet.active;
  })
}



function gameLoop() {

  ctx.clearRect(0, 0, game.width, game.height);

  ship1.draw(ctx);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 37:
      ship1.x -= 10;
      break;

    case 39:
      ship1.x += 10;
      break;

    case 32:
      shoot(ctx);
      break;
    }
});
