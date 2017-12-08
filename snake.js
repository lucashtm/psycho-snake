canvas = document.getElementById('layer1');
ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillRect(0, 0, 800, 640);

setSnakeBody(Math.floor(25 / 2) - 2, Math.floor(20 / 2) - 2);
setSnakeBody(Math.floor(25 / 2) - 1, Math.floor(20 / 2) - 2);
setSnakeBody(Math.floor(25 / 2), Math.floor(20 / 2) - 2);
setSnakeBody(Math.floor(25 / 2) + 1, Math.floor(20 / 2) - 2);
setSnakeBody(Math.floor(25 / 2) + 2, Math.floor(20 / 2) - 2);


function setSnakeBody(x, y) {
  console.log(32 * x, 32 * y, 32 * x + 32, 32 * y + 32);
  ctx.clearRect(32 * x, 32 * y, 32, 32);
}
