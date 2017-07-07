const background = document.getElementById('background');
const bgCxt = background.getContext('2d');
const starArray = [];
let star;

class Star {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 1;
    this.color = 'rgba(185, 207, 226, .8)';
  }

  draw(bgCxt) {
    bgCxt.beginPath();
    bgCxt.arc(this.x, this.y, this.radius, 0, 360);
    bgCxt.fillStyle = this.color;
    bgCxt.fill();
  }
}

function makeStars() {
  for (let i = 0; i < 500; i++) {
    let x = Math.random() * background.offsetWidth;
    let y = Math.random() * background.offsetHeight;
    let radius = Math.random() * 1.2;

    star = new Star(x, y, radius, 0, 360);
    starArray.push(star);
  }
}

function panStars() {
  starArray.forEach( (star) => {
    star.y += star.speed;
    if (star.y >= 600) {
      star.y = 0
    }
  })
}

function drawStarArray() {
  starArray.forEach( star => {
    star.draw(bgCxt)
  })
}

function starLoop() {
  bgCxt.clearRect(0, 0, background.width, background.height);
  drawStarArray();
  panStars();
  requestAnimationFrame(starLoop);
}

window.addEventListener('load', function() {
  makeStars();
  starLoop();
});
