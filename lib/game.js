const Ship = require('./Ship.js');
const Bullet = require('./Bullet.js');
const Alien = require('./Alien.js');



const game = document.getElementById('game');
const ctx = game.getContext('2d');

const startBtn = document.getElementById('start-game');

var bulletArray = [];

var alienArray = [];

var keys = [];

let ship1;

let alien;

let bullet;

function init() {
  ship1 = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');

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

  ship1.draw(ctx);
  alienArray.forEach( alien => {
    alien.draw(ctx);
  })
}

function draw() {
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



// if alien bellow another alien, that alien cant shoot
// if aliens have same x postion then the one with the greatest y position can shoot
// .map will give new array with aliens with same x coordinates

// function bottomInvaders() {
//   var newAlienArray;
//
//   newAlienArray = alienArray.map( (alien) => {
//
//     if (alien.x === alien.x && alien.y !== alien.y) {
//       return 'hi'
//     }
//   })
//   // console.log(newAlienArray);
// }



function shoot() {
  bullet = new Bullet(ship1.x + 6, 550, -8);

  bulletArray.push(bullet);
}

function updateBulletArray() {
  bulletArray.forEach((bullet, index) => {
    bullet.y += bullet.velocity;
    if ( bullet.y <= 0 || bullet.y >= 600 || !bullet.active  ) {
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

function moveAliens() {

  alienArray.forEach( alien => {
    if (alien.speedX == alien.speedX) {
      alien.x += alien.speedX;
    }
    if (alien.x >= 700) {
      alienArray.forEach( alien => {
        alien.speedX = -alien.speedX;
      })
    }
    if (alien.speedX == -alien.speedX) {
      alien.x -= alien.speedX;
    }
    if (alien.x <= 100) {
      alienArray.forEach( alien => {
        alien.speedX = -alien.speedX;
      })
    }
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
  ship1.draw(ctx);
  draw();
  handleCollision();
  updateBulletArray();
  moveAliens();
  alienFire();
  // bottomInvaders();
  requestAnimationFrame(gameLoop);
}

init();
// gameLoop();

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
