const GameState = require('./GameState')
const Ship = require('./Ship');
const Bullet = require('./Bullet');
const Alien = require('./Alien');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let game;
let playerBulletArray = [];
let alienBulletArray = [];
let alienArray = [];
let alienArray1 = [];
let alienArray2 = [];
let alienArray3 = [];
// let alienArray2and3 = [];
let shipArray = [];
let keys = [];
let ship;
let alien;
let bullet;
let countDown;
let shipCounter;
let ranNumLimit = .97;
let phase;
let continueDraw = false;
let shootDelay = 0;
let flapCounter = 0;

const img = new Image();

img.src = 'assets/galaga_sprite_sheet.png'

const enemyFire = new Image();

enemyFire.src = 'assets/enemy_bullet.png'

function init() {
  game = new GameState(canvas, ctx);
  shipCounter = 3;
  canvas.focus();
  phase = 1;
  makeShip();
  makeAliens();
  game.retrieveLocalStorage();
  appendLife();
  appendLife();
}

function appendLife() {
  const img = new Image();

  img.src = 'assets/galaga_ship.png';
  document.querySelector('.lives').append(img);
}

function removeLife() {
  const lives = document.querySelector('.lives');

  lives.removeChild(lives.childNodes[0]);
}

function makeAliens() {
  let x;
  let y;

  for (let i = 0; i < 34; i++) {
    if (i < 6) {
      y = 20;
      i === 0 ? x = 257.5 : x += 50
      alien = new Alien(img, x, y)
      alienArray1.push(alien);
    }
    if (i >= 6 && i < 14) {
      y = 70;
      i === 6 ? x = 207.5 : x += 50;
      alien = new Alien(img, x, y)
      alienArray2.push(alien);
    }
    if (i >= 14 && i < 24) {
      y = 120;
      i === 14 ? x = 157.5 : x += 50;
      alien = new Alien(img, x, y)
      alienArray3.push(alien);
    }
    if (i >= 24) {
      y = 170;
      i === 24 ? x = 157.5 : x += 50;
      alien = new Alien(img, x, y)
      alienArray3.push(alien);
    }
    // alien = new Alien(img, x, y)
    // alienArray.push(alien);
  }
  alienArray = [...alienArray1, ...alienArray2, ...alienArray3]
  // console.log(alienArray);
  // console.log(alienArray1);
  // console.log(alienArray2);
  // console.log(alienArray3);

}


function makeShip() {
  ship = new Ship(img, canvas.width / 2 - 17.5, canvas.height - 40, 35, 35);
  shipArray.push(ship);
}

function draw() {
  playerBulletArray.forEach( bullet => bullet.draw(ctx));
  alienBulletArray.forEach( bullet => bullet.draw(ctx));
  // alienArray.forEach( alien => alien.drawAlien1(ctx));

  alienArray1.forEach( alien => alien.drawAlien1(ctx));
  alienArray2.forEach( alien => alien.drawAlien2(ctx));
  alienArray3.forEach( alien => alien.drawAlien3(ctx));

  // alienArray3.forEach( alien => alien.drawAlien3(ctx));

  shipArray.forEach( ship => ship.draw(ctx));
}

function handleAlienCollision() {
  playerBulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray.splice(index, 1);
        bullet.active = false;
        game.updateScore();
        game.updateHiScore();
        game.updateLocalStorage();
        shootDelay = 0;
        console.log('aA ', alienArray);
      }
    })
  })
  if (alienArray1.length === 0 && alienArray2.length === 0 && alienArray3.length === 0) {
    console.log('here');
    nextPhase();
  }
}

function handleAlienCollision1() {
  playerBulletArray.forEach( bullet => {
    alienArray1.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray1.splice(index, 1);
        bullet.active = false;
        game.updateScore();
        game.updateHiScore();
        game.updateLocalStorage();
        shootDelay = 0;
        console.log('aA1 ', alienArray1);
      }
    })
  })
}

function handleAlienCollision2() {
  playerBulletArray.forEach( bullet => {
    alienArray2.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray2.splice(index, 1);
        bullet.active = false;
        game.updateScore();
        game.updateHiScore();
        game.updateLocalStorage();
        shootDelay = 0;
        console.log('aA2 ', alienArray2);
      }
    })
  })
}

function handleAlienCollision3() {
  playerBulletArray.forEach( bullet => {
    alienArray3.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray3.splice(index, 1);
        bullet.active = false;
        game.updateScore();
        game.updateHiScore();
        game.updateLocalStorage();
        shootDelay = 0;
        console.log('aA3 ', alienArray3);
      }
    })
  })
}

function allCollisions() {
  shootDelay--;
  handleAlienCollision();
  handleAlienCollision1();
  handleAlienCollision2();
  handleAlienCollision3();
  handlePlayerCollision();
}

function handlePlayerCollision() {
  alienBulletArray.forEach( bullet => {
    shipArray.forEach((ship, index) => {
      if (game.collide(ship, bullet)) {
        bullet.active = false;
        shipArray.splice(index, 1);
        spawnNewShip();
        if (shipCounter > 0) {
          removeLife();
        }
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
    shipCounter--;
    game.gameOver();
    continueDraw = false;
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

  if (shipArray.length > 0) {
    alienArray.forEach( alien => {
      alien.x += alien.speedX;

      if (alien.x >= alien.origin + 150 || alien.x <= alien.origin - 150) {
        alien.speedX = -alien.speedX;
      }
    })
  }
  flapAliens();
}

function flapAliens() {
  flapCounter++;
  if (flapCounter > 60) {
    flapCounter = 0;
  }
  alienArray.forEach( alien => {
    if (flapCounter === 60 && alien.spriteX3 === 32 && alien.spriteX2 === 32  && alien.spriteX1 === 32) {
      alien.spriteX3 = 8;
      alien.spriteX2 = 8;
      alien.spriteX1 = 8;
    } else if (flapCounter === 60 && alien.spriteX3 === 8 && alien.spriteX2 === 8  && alien.spriteX1 === 8) {
      alien.spriteX3 = 32;
      alien.spriteX2 = 32;
      alien.spriteX1 = 32;
    }

  })
}

function alienFire() {
  let ranNum = Math.random();

  if (ranNum > ranNumLimit && shipArray.length > 0) {
    let alienNum = Math.floor(Math.random() * 32)

    for (let i = 0; i < alienArray.length; i++) {
      if (i === alienNum) {
        bullet = new Bullet(enemyFire, alienArray[i].x, alienArray[i].y + alien.height, 8);
        alienBulletArray.push(bullet);
      }
    }
  }
}

function nextPhase() {
  clearCanvas();
  playerBulletArray = [];
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

function emptyArrays() {
  alienArray = [];
  alienArray1 = [];
  alienArray2 = [];
  alienArray3 = [];
  playerBulletArray = [];
  alienBulletArray = [];
}

function startNewGame() {
  clearCanvas();
  emptyArrays();
  init();
  draw();
  setTimeout( function() {
    continueDraw = true;
    gameLoop();
  }, 3000);
  document.getElementById('player-score').innerHTML = '0';
  document.querySelector('.game-counter').textContent = '';
  document.querySelector('.play-again').textContent = '';
  countDownInit();
}

function gameLoop() {
  continueDraw = true;
  moveShip();
  clearCanvas();
  draw();
  // handleAlienCollision();
  allCollisions();
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
  if (e.keyCode === 13 && game.gameCounter > 0) {
    game.gameCounter--;
    gameLoop();
  }
  if (e.keyCode === 78 && shipCounter === 0) {
    startNewGame();
    game.gameCounter--
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
