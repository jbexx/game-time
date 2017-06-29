// const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');

const game = document.getElementById('game');
const ctx = game.getContext('2d');

var ship1 = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');

var alien1 = new Alien(150, 20, 40, 40, 'green');
var alien2 = new Alien(250, 20, 40, 40, 'green');
var alien3 = new Alien(350, 20, 40, 40, 'green');
var alien4 = new Alien(450, 20, 40, 40, 'green');
var alien5 = new Alien(550, 20, 40, 40, 'green');
var alien6 = new Alien(650, 20, 40, 40, 'green');
var alien7 = new Alien(150, 100, 40, 40, 'green');
var alien8 = new Alien(250, 100, 40, 40, 'green');
var alien9 = new Alien(350, 100, 40, 40, 'green');
var alien10 = new Alien(450, 100, 40, 40, 'green');
var alien11 = new Alien(550, 100, 40, 40, 'green');
var alien12 = new Alien(650, 100, 40, 40, 'green');



var bulletArray = [];
var alienArray = [alien1, alien2, alien3, alien4, alien5, alien6, alien7, alien8, alien9, alien10, alien11, alien12];
var keys = [];

// function update() {
//   bulletArray.forEach( bullet => {
//     bullet.update();
//   });
//
//   bulletArray = bulletArray.filter( bullet => {
//     return bullet.active;
//   });
// };

// function populateAlienArray() {
  // for (let i = 0; i < 4; i++) {
  //   let alien = new Alien(x, 20, 40, 40, 'green');
  //   alienArray.push(alien[i]);
  // }
  // alienArray.forEach( alien => {
  //   alien.draw(ctx);
  // })
// }

// populateAlienArray(alien);

function draw() {
  moveBullet();
  bulletArray.forEach( bullet => {
    bullet.draw(ctx);
  });
  alienArray.forEach( alien => {
    alien.draw(ctx);
  })
}

function shoot() {
  var bullet = new Bullet( ship1.x + 6, 580);

  bulletArray.push(bullet);
  draw();
}

function moveBullet() {
  //take y position of bullet and decrese it by x amount as canvas gets redrawn
  //get y position of bullet
  // update();
  bulletArray.forEach( bullet => {
    bullet.y -= 8;
    // bullet.y
  })
  //decres y position
}

// function update() {
//   bulletArray.forEach( bullet => {
//     bullet.update();
//   });
//   bulletArray = bulletArray.filter( bullet => {
//     return bullet.active;
//   })
// }



function gameLoop() {
  moveShip();
  ctx.clearRect(0, 0, game.width, game.height);

  ship1.draw(ctx);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

function moveShip() {

  if (keys[37]) {
    ship1.x -= 3;
  }

  if (keys[39]) {
    ship1.x += 3;
  }

  if ((ship1.x) >= 780) {
    ship1.x = 780
  } else if ((ship1.x) <= 0) {
    ship1.x = 0
  }

  // console.log('ship1.x is: ', ship1.x);
  // console.log();

}

document.addEventListener('keydown', e => {
  keys[e.keyCode] = true;

  if (e.keyCode === 32) {
    shoot(ctx);
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
});
