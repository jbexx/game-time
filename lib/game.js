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
let shipArray = [];
let keys = [];
let ship;
let alien;
let bullet;
let countDown;
let shipCounter;
let ranNumLimit = .95;
let phase;
let continueDraw = false;
let shootDelay = 0;
let flapCounter = 0;

const img = new Image();

img.src = 'assets/galaga_sprite_sheet.png'

const enemyFire = new Image();

enemyFire.src = 'assets/enemy_bullet.png'

const init = () => {
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

const appendLife = () => {
  const img = new Image();

  img.src = 'assets/galaga_ship.png';
  document.querySelector('.lives').append(img);
}

const removeLife = () => {
  const lives = document.querySelector('.lives');

  lives.removeChild(lives.childNodes[0]);
}

const makeAliens = () => {
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
  }
  alienArray = [...alienArray1, ...alienArray2, ...alienArray3];
}

const makeShip = () => {
  ship = new Ship(img, canvas.width / 2 - 17.5, canvas.height - 40, 35, 35);
  shipArray.push(ship);
}

const draw = () => {
  playerBulletArray.forEach( bullet => bullet.draw(ctx));
  alienBulletArray.forEach( bullet => bullet.draw(ctx));
  alienArray1.forEach( alien => alien.drawAlien1(ctx));
  alienArray2.forEach( alien => alien.drawAlien2(ctx));
  alienArray3.forEach( alien => alien.drawAlien3(ctx));
  shipArray.forEach( ship => ship.draw(ctx));
}

const handleAlienCollision = () => {
  playerBulletArray.forEach( bullet => {
    alienArray.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        console.log(alienArray);
        // alien.explodeAlien();
        // setTimeout(() => {
          alienArray.splice(index, 1);
        // }, 300);
        bullet.active = false;
        alien.shot = true;
        game.updateScore();
        game.updateHiScore();
        shootDelay = 0;
      }
    })
  })
  if (alienArray1.length === 0 && alienArray2.length === 0 && alienArray3.length === 0) {
    nextPhase();
  }
}

const handleAlienCollision1 = () => {
  playerBulletArray.forEach( bullet => {
    alienArray1.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray1.splice(index, 1);
        bullet.active = false;
        alien.shot = true;
        game.updateScore();
        game.updateHiScore();
        shootDelay = 0;
      }
    })
  })
}

const handleAlienCollision2 = () => {
  playerBulletArray.forEach( bullet => {
    alienArray2.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray2.splice(index, 1);
        bullet.active = false;
        alien.shot = true;
        game.updateScore();
        game.updateHiScore();
        shootDelay = 0;
      }
    })
  })
}

const handleAlienCollision3 = () => {
  playerBulletArray.forEach( bullet => {
    alienArray3.forEach((alien, index) => {
      if (game.collide(alien, bullet)) {
        alienArray3.splice(index, 1);
        bullet.active = false;
        alien.shot = true;
        game.updateScore();
        game.updateHiScore();
        shootDelay = 0;
      }
    })
  })
}

const handlePlayerCollision = () => {
  alienBulletArray.forEach( bullet => {
    shipArray.forEach((ship, index) => {
      if (game.collide(ship, bullet) && ship.shot === false) {
        bullet.active = false;
        ship.shot = true;
        ship.explodeShip();
        setTimeout(() => {
          shipArray.splice(index, 1)
          spawnNewShip();
        }, 600);
        if (shipCounter > 0) {
          removeLife();
        }
      }
    })
  })
}

const allCollisions = () => {
  shootDelay--;
  handleAlienCollision();
  handleAlienCollision1();
  handleAlienCollision2();
  handleAlienCollision3();
  handlePlayerCollision();
}

const countDownInit = () => {
  countDown = 3
  countDownStart();
}

const countDownStart = () => {
  if (countDown > 0) {
    document.querySelector(".game-counter").textContent = countDown;
    countDown--;
    setTimeout(countDownStart, 1000);
  } else {
    document.querySelector(".game-counter").textContent = '';
  }
}

const spawnNewShip = () => {
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

const shoot = () => {
  if (ship.shot === false) {
    bullet = new Bullet(img, ship.x + 13, 550, -20);
    playerBulletArray.push(bullet);
  }
}

const updatePlayerBulletArray = () => {
  playerBulletArray.forEach((bullet, index) => {
    bullet.y += bullet.velocity;
    if ( bullet.y <= 0 || bullet.y >= 600 || !bullet.active ) {
      playerBulletArray.splice(index, 1);
    }
  })
}

const updateAlienBulletArray = () => {
  alienBulletArray.forEach((bullet, index) => {
    bullet.y += bullet.velocity;
    if ( bullet.y >= 600 || !bullet.active ) {
      alienBulletArray.splice(index, 1);
    }
  })
}

const moveShip = () => {
  if (keys[37] && ship.spriteX === 31) {
    ship.moveLeft();
  }
  if (keys[39] && ship.spriteX === 31) {
    ship.moveRight();
  }
  ship.inBounds();
}

const moveAliens = () => {
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

const flapAliens = () => {
  flapCounter++;
  if (flapCounter > 30) {
    flapCounter = 0;
  }
  alienArray.forEach( alien => {
    if (flapCounter === 30 &&
      alien.spriteX3 === 32 &&
      alien.spriteX2 === 32 &&
      alien.spriteX1 === 32) {
      alien.spriteX3 = 8;
      alien.spriteX2 = 8;
      alien.spriteX1 = 8;
    } else if (flapCounter === 30 &&
      alien.spriteX3 === 8 &&
      alien.spriteX2 === 8 &&
      alien.spriteX1 === 8) {
      alien.spriteX3 = 32;
      alien.spriteX2 = 32;
      alien.spriteX1 = 32;
    }
  })
}

const alienFire = () => {
  let ranNum = Math.random();

  if (ranNum > ranNumLimit && shipArray.length > 0 && ship.spriteX === 31) {
    let alienNum = Math.floor(Math.random() * 32)

    for (let i = 0; i < alienArray.length; i++) {
      if (i === alienNum) {
        bullet = new Bullet(enemyFire, alienArray[i].x, alienArray[i].y + alien.height, 8);
        alienBulletArray.push(bullet);
      }
    }
  }
}

const nextPhase = () => {
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

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const emptyArrays = () => {
  alienArray = [];
  alienArray1 = [];
  alienArray2 = [];
  alienArray3 = [];
  playerBulletArray = [];
  alienBulletArray = [];
}

const startNewGame = () => {
  setTimeout(() => {
    continueDraw = true;
    gameLoop();
  }, 3000);
  clearCanvas();
  emptyArrays();
  init();
  draw();
  document.getElementById('player-score').innerHTML = '0';
  document.querySelector('.game-counter').textContent = '';
  document.querySelector('.play-again').textContent = '';
  countDownInit();
}

const gameLoop = () => {
  continueDraw = true;
  moveShip();
  clearCanvas();
  draw();
  allCollisions();
  updatePlayerBulletArray();
  updateAlienBulletArray();
  moveAliens();
  alienFire();
  if (continueDraw === true) {
    requestAnimationFrame(gameLoop);
  }
}

window.onload = () => {
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
    shootDelay = 15;
  }
})

document.addEventListener('keyup', e => {
  keys[e.keyCode] = false;
})
