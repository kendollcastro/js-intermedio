const canvas = document.getElementById('main__canvas');
const ctx = canvas.getContext('2d');

//Square position
let xPosition = 100;
let yPosition = 100;
let velocityX = getRamdomArbitrary(-7, 7);
let velocityY = getRamdomArbitrary(-7, 7);

//Circle position
let xPositionCircle = 100;
let yPositionCircle = 100;
let velocityXCircle = getRamdomArbitrary(-7, 7);
let velocityYCircle = getRamdomArbitrary(-7, 7);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';
  ctx.fillRect(xPosition, yPosition, 100, 100);

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.arc(xPositionCircle, yPositionCircle, 50, 0, 2 * Math.PI);
  ctx.fill();


  //Square bouncing

  if(xPosition + velocityX > canvas.width-100 || xPosition < 0) {
    velocityX = -velocityX;
  }

  if(yPosition + velocityY > canvas.height-100 || yPosition < 0 ){
    velocityY = -velocityY
  }

  //Circle bouncing
  //References: https://developer.mozilla.org/es/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls

  if(xPositionCircle + velocityXCircle > canvas.width-50 || xPositionCircle + velocityXCircle < 50) {
    velocityXCircle = -velocityXCircle;
  }

  if(yPositionCircle + velocityYCircle > canvas.height-50 || yPositionCircle + velocityYCircle < 50) {
    velocityYCircle = -velocityYCircle;
  }


  //Square position
  xPosition += velocityX;
  yPosition += velocityY;

  //Circle position
  xPositionCircle += velocityXCircle;
  yPositionCircle += velocityYCircle;
  window.requestAnimationFrame(draw);
}

function getRamdomArbitrary(min, max){
  return Math.random() * (max - min) + min;
}

window.requestAnimationFrame(draw);