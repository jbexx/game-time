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

let alienCounter = 0;

let bullet;

let countDown;

let handleCountDown;

let shipCounter = 3

let ranNumLimit = .97

let phase;

let reqId;

var img = new Image();

img.src = 'assets/galaga_sprite_sheet.png'


function init() {
  phase = 1;
  makeShip();
  makeAliens();
}

function makeAliens() {
  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(img, i, 20)
    alienArray.push(alien);
  }

  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(img, i, 70)
    alienArray.push(alien);
  }

  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(img, i, 120)
    alienArray.push(alien);
  }

  for (let i = 225; i <= 575; i += 50) {
    alien = new Alien(img, i, 170)
    alienArray.push(alien);
  }
}

function makeShip() {
  ship = new Ship(img, game.width / 2, game.height - 40, 30, 30);
  shipArray.push(ship);
}

function draw() {
  playerBulletArray.forEach( bullet => bullet.draw(ctx));
  alienBulletArray.forEach( bullet => bullet.draw(ctx));
  alienArray.forEach( (alien, index) => alien.drawAlien3(ctx));
  // alienArray.forEach( (alien, index) => alien.drawAlien2(ctx));
  // alienArray.forEach( (alien, index) => alien.drawAlien3(ctx));
  shipArray.forEach( ship => ship.draw(ctx));
}

function collide(craft, bullet) {
  return bullet.x < craft.x +  craft.width &&
  bullet.x + bullet.width > craft.x &&
  bullet.y < craft.y + craft.height &&
  bullet.y + bullet.height > craft.y;
}

function handleAlienCollision() {
  playerBulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (collide(alien, bullet)) {
        alienArray.splice(index, 1);
        bullet.active = false;
        updateScore();
      }
    })
  })
  if (alienArray.length === 0) {
    nextPhase();
  }
}

function handlePlayerCollision() {
  alienBulletArray.forEach( bullet => {
    shipArray.forEach((ship, index) => {
      if (collide(ship, bullet)) {
        bullet.active = false;
        shipArray.splice(index, 1);
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
}

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
  bullet = new Bullet(img, ship.x + 9, 550, -8);
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
    ship.moveLeft();
  }
  if (keys[39]) {
    ship.moveRight();
  }
  ship.inBounds();
}

function moveAliens() {
  alienCounter++;
  if (alienCounter > 60) {
    alienCounter = 0;
  }

  if (shipArray.length !== 0) {
    alienArray.forEach( alien => {
      alien.x += alien.speedX;


      // console.log(alienCounter);
      if (alienCounter === 60 && alien.spriteX3 === 32) {
        alien.spriteX3 = 10
      } else if (alienCounter === 60 && alien.spriteX3 === 10) {
        alien.spriteX3 = 32
      }

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
        bullet = new Bullet(img, alienArray[i].x, alienArray[i].y + alien.height, 8);
        alienBulletArray.push(bullet);
        console.log(alienBulletArray);
      }
    }
  }
}

function nextPhase() {
  makeAliens();
  cancelAnimationFrame(reqId);
  // reqId = undefined;
  ranNumLimit -= .02
  score += 1000
  phase++
  document.querySelector(".game-counter").textContent = "phase " + phase;
  // setTimeout(gameLoop, 5000);
  setTimeout(countDownInit, 2000);
}

function clearCanvas() {
  ctx.clearRect(0, 0, game.width, game.height);
}


// ================Game Loop===================
function gameLoop() {
  moveShip();
  clearCanvas();
  draw();
  handleAlienCollision();
  handlePlayerCollision();
  updatePlayerBulletArray();
  updateAlienBulletArray();
  moveAliens();
  alienFire();
  // id = performance.now();
  reqId = requestAnimationFrame(gameLoop);
  return;
}

window.onload = function() {
  init();
  draw();
};

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
