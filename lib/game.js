const Ship = require('./Ship');
const Bullet = require('./Bullet');
const Alien = require('./Alien');

const game = document.getElementById('game');
const ctx = game.getContext('2d');

const startBtn = document.getElementById('start-game');

let score = 0;

var bulletArray = [];

var alienArray = [];

var shipArray = [];

var keys = [];

let ship;

let alien;

let bullet;

function init() {
  makeShip();
  for (let i = 225; i < 576; i += 50) {
    alien = new Alien(i, 20)
    alienArray.push(alien);
  }

  for (let i = 225; i < 576; i += 50) {
    alien = new Alien(i, 70)
    alienArray.push(alien);
  }

  for (let i = 225; i < 576; i += 50) {
    alien = new Alien(i, 120)
    alienArray.push(alien);
  }

  for (let i = 225; i < 576; i += 50) {
    alien = new Alien(i, 170)
    alienArray.push(alien);
  }

  alienArray.forEach( alien => {
    alien.draw(ctx);
  })
  shipArray.forEach( ship =>
    ship.draw(ctx));
}

function makeShip() {
  ship = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');
  shipArray.push(ship);
}

function draw() {
  bulletArray.forEach( bullet =>          bullet.draw(ctx));
  alienArray.forEach( alien => alien.draw(ctx));
  shipArray.forEach( ship =>
  ship.draw(ctx));
}

function alienCollide(alien, bullet) {
  // console.log(ship);
  return bullet.x < alien.x +  alien.width &&
  bullet.x + bullet.width > alien.x &&
  bullet.y < alien.y + alien.height &&
  bullet.y + bullet.height > alien.y;
}

function shipCollide(ship, bullet) {
  return bullet.x < ship.x +  ship.width &&
  bullet.x + bullet.width > ship.x &&
  bullet.y < ship.y + ship.height &&
  bullet.y + bullet.height > ship.y;
}

function handleCollision() {
  bulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (alienCollide(alien, bullet)) {
        alienArray.splice(index, 1);
        bullet.active = false;
        updateScore();
      }
    })
    shipArray.forEach ((ship, index) => {
      if (shipCollide(ship, bullet)) {
        // console.log('before', shipArray);
        bullet.active = false
        shipArray.splice(index, 1);
        // console.log('after', shipArray);
      }
    })
  })
}

function updateScore() {
  score += 5;
  document.getElementById('player-score').innerHTML = score;
}

// if alien bellow another alien, that alien cant shoot
// if aliens have same x postion then the one with the greatest y position can shoot
// .map will give new array with aliens with same x coordinates


// function bottomAliens() {
//   return alienArray.filter( (alien, index) => {
//
//   })
//   // console.log(newAlienArray);
// }




function shoot() {
  bullet = new Bullet(ship.x + 6, 550, -8);

  bulletArray.push(bullet);
}

function updateBulletArray() {
  bulletArray.forEach((bullet, index) => {
    bullet.y += bullet.velocity;
    if ( bullet.y <= 0 || bullet.y >= 600 || !bullet.active ) {
      bulletArray.splice(index, 1);
    }
  })
}

function moveShip() {
  if (keys[37]) {
    ship.x -= 3;
  }
  if (keys[39]) {
    ship.x += 3;
  }
  if ((ship.x) >= 780) {
    ship.x = 780
  } else if ((ship.x) <= 0) {
    ship.x = 0
  }
}

function moveAliens() {

  alienArray.forEach( alien => {
    alien.x += alien.speedX;

    alienArray.forEach( alien => {
      alien.speedX = -alien.speedX;
    })
  })
}

function alienFire() {
  var ranNum = Math.random();

  if (ranNum > 0.9) {
    var alienNum = Math.floor(Math.random() * 32);

    for (let i = 0; i < alienArray.length; i++) {
      if (i === alienNum) {
        bullet = new Bullet(alienArray[i].x, alienArray[i].y + alien.height, 8);
        bulletArray.push(bullet);
      }
    }
  }
}


// ================Game Loop===================
function gameLoop() {
  moveShip();
  ctx.clearRect(0, 0, game.width, game.height);
  draw();
  handleCollision();
  updateBulletArray();
  moveAliens();
  alienFire();

  requestAnimationFrame(gameLoop);
}

init();

startBtn.addEventListener('click', gameLoop);

document.addEventListener('keydown', e => {
  keys[e.keyCode] = true;

  if (e.keyCode === 32) {
    shoot(ctx);
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
})
