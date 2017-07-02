/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	const background = document.getElementById('background');
	const bgCxt = background.getContext('2d');

	// var Starfield = function(speed, opacity, numStars, clear) {
	//
	// var offset = 0;
	//
	// for (let i = 0; i < numStars; i++) {
	//   let x = Math.random() * background.offsetWidth;
	//   let y = Math.random() * background.offsetHeight;
	//   let radius = Math.random() * 1.2;
	//   bgCxt.beginPath();
	//   bgCxt.arc(x, y, radius, 0, 360);
	//   bgCxt.fillStyle = 'white';
	//   bgCxt.fill();
	// }
	//
	// this.draw = function(bgCtx) {
	//   var intOffset = Math.floor(offset);
	//   var remaining = background.height - intOffset;
	//   if (intOffset > 0) {
	//     bgCtx.drawImage(background, 0, remaining, background.width, intOffset, 0, 0, background.width, intOffset)
	//   }
	//   if (remaining > 0) {
	//     bgCtx.drawImage(background, 0, 0, background.width, remaining, 0, intOffset, background.width, remaining)
	//
	//   }
	// }
	//
	// this.step = function(dt) {
	//   offsset += dt * speed;
	//   offset = offset % background.height;
	// }
	//
	// }
	//

	const stars = 150;

	drawStars();

	function drawStars() {

	  for (let i = 0; i < stars; i++) {
	    let x = Math.random() * background.offsetWidth;
	    let y = Math.random() * background.offsetHeight;
	    let radius = Math.random() * 1.2;

	    bgCxt.beginPath();
	    bgCxt.arc(x, y, radius, 0, 360);
	    bgCxt.fillStyle = 'white';
	    bgCxt.fill();
	  }
	}

	window.addEventListener('load', panStars);

	function panStars() {
	  bgCxt.clearRect(0, 0, background.width, background.height);
	  drawStars();
	  // offsetTop -= 100;
	  // requestAnimationFrame(panStars);
	  // setTimeout(function() {
	  // requestAnimationFrame(panStars);
	  //   }, 1 / fps);
	}

	// requestAnimationFrame(panStars);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(3);
	const Bullet = __webpack_require__(4);
	const Alien = __webpack_require__(5);

	const game = document.getElementById('game');
	const ctx = game.getContext('2d');

	var bulletArray = [];

	var alienArray = [];

	var keys = [];

	let ship1;

	let alien;

	let bullet;

	function init() {
	  ship1 = new Ship(game.width / 2, game.height - 40, 20, 20, 'red');

	  for (let i = 225; i < 576; i += 50) {
	    alien = new Alien(i, 20);
	    alienArray.push(alien);
	  }

	  for (let i = 225; i < 576; i += 50) {
	    alien = new Alien(i, 70);
	    alienArray.push(alien);
	  }

	  for (let i = 225; i < 576; i += 50) {
	    alien = new Alien(i, 120);
	    alienArray.push(alien);
	  }

	  for (let i = 225; i < 576; i += 50) {
	    alien = new Alien(i, 170);
	    alienArray.push(alien);
	  }
	}

	function draw() {
	  // moveBullet();
	  bulletArray.forEach(bullet => {
	    bullet.draw(ctx);
	  });
	  alienArray.forEach(alien => {
	    alien.draw(ctx);
	  });
	}

	function collide(alien, bullet) {
	  return bullet.x < alien.x + alien.width && bullet.x + bullet.width > alien.x && bullet.y < alien.y + alien.height && bullet.y + bullet.height > alien.y;
	}

	function handleCollision() {
	  bulletArray.forEach(bullet => {
	    alienArray.forEach((alien, index) => {
	      if (collide(alien, bullet)) {
	        bullet.active = false;
	        alienArray.splice(index, 1);
	      }
	    });
	  });
	}

	// if alien bellow another alien, that alien cant shoot
	// if aliens have same x postion then the one with the greatest y position can shoot
	// .map will give new array with aliens with same x coordinates

	function bottomInvaders() {
	  var newAlienArray = alienArray.map((alien, index) => {
	    if (alien.x === alien.x && alien.y !== alien.y) {
	      return 'hi';
	    }
	  });
	  console.log(newAlienArray);
	}

	function shoot() {
	  bullet = new Bullet(ship1.x + 6, 550, -8);

	  bulletArray.push(bullet);
	}

	function updateBulletArray() {
	  bulletArray.forEach((bullet, index) => {
	    bullet.y += bullet.velocity;
	    if (bullet.y <= 0 || bullet.y >= 600 || !bullet.active) {
	      bulletArray.splice(index, 1);
	    }
	  });
	}

	function moveShip() {
	  if (keys[37]) {
	    ship1.x -= 3;
	  }
	  if (keys[39]) {
	    ship1.x += 3;
	  }
	  if (ship1.x >= 780) {
	    ship1.x = 780;
	  } else if (ship1.x <= 0) {
	    ship1.x = 0;
	  }
	}

	function moveAliens() {

	  alienArray.forEach(alien => {
	    if (alien.speedX == alien.speedX) {
	      alien.x += alien.speedX;
	    }

	    if (alien.x >= 700) {
	      alienArray.forEach(alien => {
	        alien.speedX = -alien.speedX;
	      });
	    }

	    if (alien.speedX == -alien.speedX) {
	      alien.x -= alien.speedX;
	    }
	    if (alien.x <= 100) {
	      alienArray.forEach(alien => {
	        alien.speedX = -alien.speedX;
	      });
	    }
	  });
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
	  // alienFire();
	  // bottomInvaders();
	  // moveBullet();
	  requestAnimationFrame(gameLoop);
	}

	init();
	gameLoop();

	document.addEventListener('keydown', e => {
	  keys[e.keyCode] = true;

	  if (e.keyCode === 32) {
	    shoot(ctx);
	  }
	});

	document.addEventListener('keyup', e => {
	  keys[e.keyCode] = false;
	});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	
	class Ship {
	  constructor(x, y, width, height, color) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.color = color;
	  }

	  draw(ctx) {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	  }
	}

	module.exports = Ship;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	
	class Bullet {
	  constructor(x, y, velocity) {
	    this.x = x;
	    this.y = y;
	    this.width = 5;
	    this.height = 5;
	    this.velocity = velocity;
	    this.color = 'red';
	    this.active = true;
	  }

	  draw(ctx) {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	  }

	}

	module.exports = Bullet;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	class Alien {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	    this.width = 25;
	    this.height = 25;
	    this.speedX = 1;
	    this.color = 'green';
	  }

	  draw(ctx) {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(this.x, this.y, this.width, this.height);
	  }
	};

	module.exports = Alien;

/***/ })
/******/ ]);