const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');


const game = document.getElementById('game');
const ctx = game.getContext('2d');

var bulletArray = [];

var alienArray = [];

var keys = [];

let ship1;

function init() {
  ship1 = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');

  for (let i = 212.5; i < 576; i += 50) {
    alienArray.push(new Alien(i, 20));
  }

  for (let i = 212.5; i < 576; i += 50) {
    alienArray.push(new Alien(i, 70));
  }

  for (let i = 212.5; i < 576; i += 50) {
    alienArray.push(new Alien(i, 120));
  }

  for (let i = 212.5; i < 576; i += 50) {
    alienArray.push(new Alien(i, 170));
  }
}

function draw() {
  moveBullet();
  bulletArray.forEach( bullet => {
    bullet.draw(ctx);
  });
  alienArray.forEach( alien => {
    alien.draw(ctx);
  })
}

console.log(alienArray);

function collide(alien, bullet) {
  return bullet.x < alien.x +  alien.width &&
      bullet.x + bullet.width > alien.x &&
      bullet.y < alien.y + alien.height &&
      bullet.y + bullet.height > alien.y;
}

function handleCollision() {
  bulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (collide(alien, bullet)) {
        bullet.active = false;
        alienArray.splice(index, 1);
      }
    })
  })
}

function shoot() {
  var bullet = new Bullet(ship1.x + 6, 550, 1000);

  bulletArray.push(bullet);

}

function moveBullet() {
  bulletArray.forEach( bullet => {
    bullet.y -= 8;
  })
}

function updateBulletArray() {
  bulletArray.forEach((bullet, index) => {
    if ( bullet.y <= 0 || !bullet.active ) {
      bulletArray.splice(index, 1);
    }
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


// ================Game Loop===================
function gameLoop() {
  moveShip();
  ctx.clearRect(0, 0, game.width, game.height);
  ship1.draw(ctx);
  draw();
  handleCollision();
  updateBulletArray();
  requestAnimationFrame(gameLoop);
}

init();
gameLoop();

document.addEventListener('keydown', e => {
  keys[e.keyCode] = true;

  if (e.keyCode === 32) {
    shoot(ctx);
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
})
