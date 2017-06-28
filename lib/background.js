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
