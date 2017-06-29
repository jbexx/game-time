const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');

const game = document.getElementById('game');
const ctx = game.getContext('2d');

var ship1 = new Ship(x = game.width / 2, y = game.height - 40, 20, 20, 'red',);
var gameArray = [];
var keys = [];

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
  console.log(gameArray);
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
  moveShip();
  ctx.clearRect(0, 0, game.width, game.height);

  ship1.draw(ctx);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function moveShip(e) {

  if (keys[37]) {
    ship1.x -= 3;
  };

  if (keys[39]) {
    ship1.x += 3;
  };

  if((ship1.x) >= 780) {
    ship1.x = 780
  } else if ((ship1.x) <= 0) {
    ship1.x = 0
  };

  console.log('ship1.x is: ', ship1.x);
  console.log();

}

document.addEventListener('keydown', e => {
  keys[e.keyCode] = true;

  if(e.keyCode === 32) {
    shoot(ctx);
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
});
