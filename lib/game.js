const Ship = require('./Ship');
const Bullet = require('./Bullet');
const Alien = require('./Alien');

const game = document.getElementById('game');
const ctx = game.getContext('2d');

let score = 0;

var playerBulletArray = [];

var alienBulletArray = [];

var alienArray = [];

var shipArray = [];

var keys = [];

let ship;

let alien;

let bullet;

let countDown;

let handleCountDown;

let shipCounter = 3

let ranNumLimit = .97


function init() {
  makeShip();
  makeAliens();
}

function makeAliens() {
  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(i, 20)
    alienArray.push(alien);
  }

  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(i, 70)
    alienArray.push(alien);
  }

  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(i, 120)
    alienArray.push(alien);
  }

  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(i, 170)
    alienArray.push(alien);
  }
}

function makeShip() {
  ship = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');
  shipArray.push(ship);
}

function draw() {
  playerBulletArray.forEach( bullet => bullet.draw(ctx));
  alienBulletArray.forEach( bullet => bullet.draw(ctx));
  alienArray.forEach( alien => alien.draw(ctx));
  shipArray.forEach( ship => ship.draw(ctx));
}

function alienCollide(alien, bullet) {
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

function handleAlienCollision() {
  playerBulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (alienCollide(alien, bullet)) {
        alienArray.splice(index, 1);
        bullet.active = false;
        updateScore();
      }
    })
  })
  if (alienArray.length === 0) {
    nextPhase();
    makeAliens();
  }
}

function handlePlayerCollision() {
  alienBulletArray.forEach( bullet => {
    shipArray.forEach((ship, index) => {
      if (shipCollide(ship, bullet)) {
        bullet.active = false;
        shipArray.splice(ship);
        spawnNewShip();
      }
    })
  })
}

function countDownInit() {
  countDown = 3
  countDownStart();
}

function countDownStart() {
  if (countDown > 0) {
    document.querySelector(".game-counter").textContent = countDown;
    countDown--;
    setTimeout(countDownStart, 1000);
  } else {
    document.querySelector(".game-counter").textContent = '';

  }
};

function gameOver() {
  document.querySelector(".game-counter").textContent = "GAME OVER";
}

function spawnNewShip() {
  if (shipCounter > 1) {
    setTimeout(makeShip, 3000);
    shipCounter--;
    countDownInit();
  } else {
    gameOver();
  }
}

function updateScore() {
  score += 100;
  document.getElementById('player-score').innerHTML = score;
}

function shoot() {
  bullet = new Bullet(ship.x + 6, 550, -8);
  playerBulletArray.push(bullet);
}

function updatePlayerBulletArray() {
  playerBulletArray.forEach((bullet, index) => {
    bullet.y += bullet.velocity;
    if ( bullet.y <= 0 || bullet.y >= 600 || !bullet.active ) {
      playerBulletArray.splice(index, 1);
    }
  })
}

function updateAlienBulletArray() {
  alienBulletArray.forEach((bullet, index) => {
    bullet.y += bullet.velocity;
    if ( bullet.y >= 600 || !bullet.active ) {
      alienBulletArray.splice(index, 1);
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
  if (shipArray.length !== 0) {
    alienArray.forEach( alien => {
      alien.x += alien.speedX;

      if (alien.x >= 700 || alien.x <= 100) {
        alienArray.forEach( alien => {
          alien.speedX = -alien.speedX;
        })
      }
    })
  }
}



function alienFire() {
  var ranNum = Math.random();

  if (ranNum > ranNumLimit && shipArray.length !== 0) {
    var alienNum = Math.floor(Math.random() * 32)

    for (let i = 0; i < alienArray.length; i++) {
      if (i === alienNum) {
        bullet = new Bullet(alienArray[i].x, alienArray[i].y + alien.height, 8);
        alienBulletArray.push(bullet);
      }
    }
  }
}

function nextPhase() {
  ranNumLimit -= .02
  score += 1000
  console.log(ranNumLimit);
}


// ================Game Loop===================
function gameLoop() {
  moveShip();
  ctx.clearRect(0, 0, game.width, game.height);
  draw();
  handleAlienCollision();
  handlePlayerCollision();
  updatePlayerBulletArray();
  updateAlienBulletArray();
  moveAliens();
  alienFire();
  requestAnimationFrame(gameLoop);
}

init();
draw();

document.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    gameLoop();
  }
})

document.addEventListener('keydown', e => {
  keys[e.keyCode] = true;

  if (e.keyCode === 32 && shipArray.length !== 0) {
    shoot(ctx);
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
})
