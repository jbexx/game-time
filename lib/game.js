// const Skeleton = require('./Skeleton.js');
const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');

const game = document.getElementById('game');
const ctx = game.getContext('2d');

var ship1 = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');

var alien1 = new Alien(225, 20);
var alien2 = new Alien(275, 20);
var alien3 = new Alien(325, 20);
var alien4 = new Alien(375, 20);
var alien5 = new Alien(425, 20);
var alien6 = new Alien(475, 20);
var alien7 = new Alien(525, 20);
var alien8 = new Alien(575, 20);
var alien9 = new Alien(225, 70);
var alien10 = new Alien(275, 70);
var alien11 = new Alien(325, 70);
var alien12 = new Alien(375, 70);
var alien13 = new Alien(425, 70);
var alien14 = new Alien(475, 70);
var alien15 = new Alien(525, 70);
var alien16 = new Alien(575, 70);
var alien17 = new Alien(225, 120);
var alien18 = new Alien(275, 120);
var alien19 = new Alien(325, 120);
var alien20 = new Alien(375, 120);
var alien21 = new Alien(425, 120);
var alien22 = new Alien(475, 120);
var alien23 = new Alien(525, 120);
var alien24 = new Alien(575, 120);
var alien25 = new Alien(225, 170);
var alien26 = new Alien(275, 170);
var alien27 = new Alien(325, 170);
var alien28 = new Alien(375, 170);
var alien29 = new Alien(425, 170);
var alien30 = new Alien(475, 170);
var alien31 = new Alien(525, 170);
var alien32 = new Alien(575, 170);



var bulletArray = [];
var alienArray = [alien1, alien2, alien3, alien4, alien5, alien6, alien7, alien8, alien9, alien10, alien11, alien12, alien13, alien14, alien15, alien16, alien17, alien18, alien19, alien20, alien21, alien22, alien23, alien24, alien25, alien26, alien27, alien28, alien29, alien30, alien31, alien32];
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


function draw() {
  moveBullet();
  bulletArray.forEach( bullet => {
    bullet.draw(ctx);
  });
  alienArray.forEach( alien => {
    alien.draw(ctx);
  })
}


function collide(alien, bullet) {
  return bullet.x < alien.x +  alien.width &&
      bullet.x + bullet.width > alien.x &&
      bullet.y < alien.y + alien.height &&
      bullet.y + bullet.height > alien.y;
}

function detectCollision() {
  bulletArray.forEach( bullet => {
    alienArray.forEach( alien => {
      if (collide(alien, bullet)) {
        alien.remove();
        //remove bullet
      }
    })
  });

}

function shoot() {
  var bullet = new Bullet(ship1.x + 5, 580);

  bulletArray.push(bullet);
  draw();

}

function moveBullet() {
  bulletArray.forEach( bullet => {
    bullet.y -= 8;
  })
}

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
}
// function update() {
//   bulletArray.forEach( bullet => {
//     bullet.update();
//   });
//   bulletArray = bulletArray.filter( bullet => {
//     return bullet.active;
//   })
// }
//






// ================Game Loop===================
function gameLoop() {
  moveShip();
  ctx.clearRect(0, 0, game.width, game.height);

  ship1.draw(ctx);
  draw();
  detectCollision();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);



document.addEventListener('keydown', e => {
  keys[e.keyCode] = true;

  if (e.keyCode === 32) {
    shoot(ctx);
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
});
