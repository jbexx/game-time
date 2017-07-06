const GameState = require('./GameState')
const Ship = require('./Ship');
const Bullet = require('./Bullet');
const Alien = require('./Alien');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let game = new GameState(canvas, ctx);

var playerBulletArray = [];

var alienBulletArray = [];

var alienArray = [];

var shipArray = [];

var keys = [];

let ship;

let alien;

let bullet;

let countDown;

let shipCounter = 3;

let ranNumLimit = .97;

let phase;

let continueDraw = false;

let shootDelay = 0;

let flapCounter = 0;

var img = new Image();

img.src = 'assets/galaga_sprite_sheet.png'

var enemyFire = new Image();

enemyFire.src = 'assets/enemy_bullet.png'

function init() {
  canvas.focus();
  phase = 1;
  makeShip();
  makeAliens();
  game.retrieveLocalStorage();
}

function makeAliens() {

  // for (let i = 0; i < 32; i++) {
  //   alien = new Alien(img, x, y)
  //   alienArray.push(alien);
  //   // console.log('alien.x: ', alien.x);
  //   // console.log('alien.y: ', alien.y);
  //
  //   if (i < 7) {
  //     x += 50;
  //   }
  //   if (i > 7 && i < 16) {
  //     y = 70;
  //     x -= 50;
  //   }
  //   if (i > 15 && i < 24) {
  //     y = 120;
  //     x += 50;
  //   }
  //   if (i > 24) {
  //     y = 170;
  //     x -= 50;
  //   }

  // for (let i = 225; i <= 575; i += 50) {
  //   alien = new Alien(img, i, 20)
  //   alienArray.push(alien);
  // }
  //
  // for (let i = 225; i <= 575; i += 50) {
  //   alien = new Alien(img, i, 70)
  //   alienArray.push(alien);
  // }
  //
  // for (let i = 225; i <= 575; i += 50) {
  //   alien = new Alien(img, i, 120)
  //   alienArray.push(alien);
  // }
  //
  // for (let i = 225; i <= 575; i += 50) {
  //   alien = new Alien(img, i, 170)
  //   alienArray.push(alien);
  // }

  let x;

  let y;

  for (let i = 0; i < 32; i++) {
    if (i < 8) {
      y = 20;
      i === 0 ? x = 225 : x += 50
    }
    if (i >= 8 && i < 16) {
      y = 70;
      i === 8 ? x = 225 : x += 50;
    }
    if (i >= 16 && i < 24) {
      y = 120;
      i === 16 ? x = 225 : x += 50;
    }
    if (i >= 24) {
      y = 170;
      i === 24 ? x = 225 : x += 50;
    }
    alien = new Alien(img, x, y)
    alienArray.push(alien);
  }
}


function makeShip() {
  ship = new Ship(img, canvas.width / 2, canvas.height - 40, 35, 35);
  shipArray.push(ship);
}

function draw() {
  playerBulletArray.forEach( bullet => bullet.draw(ctx));
  alienBulletArray.forEach( bullet => bullet.draw(ctx));
  alienArray.forEach( alien => alien.drawAlien3(ctx));
  // alienArray.forEach( (alien, index) => alien.drawAlien2(ctx));
  // alienArray.forEach( (alien, index) => alien.drawAlien3(ctx));
  shipArray.forEach( ship => ship.draw(ctx));
}

function handleAlienCollision() {
  shootDelay--
  playerBulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray.splice(index, 1);
        bullet.active = false;
        game.updateScore();
        game.updateHiScore();
        game.updateLocalStorage();
        shootDelay = 0
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
      if (game.collide(ship, bullet)) {
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

function spawnNewShip() {
  if (shipCounter > 1) {
    setTimeout(makeShip, 3000);
    shipCounter--;
    countDownInit();
  } else {
    game.gameOver();
  }
}


function shoot() {
  bullet = new Bullet(img, ship.x + 13, 550, -8);
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
  flapCounter++;
  if (flapCounter > 60) {
    flapCounter = 0;
  }

  if (shipArray.length > 0) {
    alienArray.forEach( alien => {
      alien.x += alien.speedX;


      console.log(flapCounter);
      if (flapCounter === 60 && alien.spriteX3 === 32) {
        alien.spriteX3 = 8
      } else if (flapCounter === 60 && alien.spriteX3 === 8) {
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

  if (ranNum > ranNumLimit && shipArray.length > 0) {
    var alienNum = Math.floor(Math.random() * 32)

    for (let i = 0; i < alienArray.length; i++) {
      if (i === alienNum) {
        bullet = new Bullet(enemyFire, alienArray[i].x, alienArray[i].y + alien.height, 8);
        alienBulletArray.push(bullet);
      }
    }
  }
}

function nextPhase() {
  playerBulletArray = [];
  clearCanvas();
  continueDraw = false;
  phase++;
  game.score += 1000;
  ranNumLimit -= .02;
  document.querySelector(".game-counter").textContent = "phase " + phase;
  setTimeout(makeAliens, 2000);
  setTimeout(draw, 2000);
  setTimeout(countDownInit, 2000);
  setTimeout(gameLoop, 5000);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// ================Game Loop===================
function gameLoop() {
  continueDraw = true;
  moveShip();
  clearCanvas();
  draw();
  handleAlienCollision();
  handlePlayerCollision();
  updatePlayerBulletArray();
  updateAlienBulletArray();
  moveAliens();
  alienFire();
  if (continueDraw === true) {
    requestAnimationFrame(gameLoop);
  }
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
  if (e.keyCode === 32 && shipArray.length > 0 && shootDelay <= 0) {
    shoot(ctx);
    shootDelay = 20;
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
})
