canvas = document.getElementById('layer1');
ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillRect(0, 0, canvas.width, canvas.height);
var head_tail = new Image();
head_tail.src = 'snake_head_tail.png';
direction = 'still';
movment = {
  'left': {x: -1, y: 0},
  'up': {x: 0, y: -1},
  'right': {x: 1, y: 0},
  'down': {x: 0, y: 1},
  'still': { x: 0, y: 0}
}

snake = {
  tiles: [
    { x: ((width / 32) / 2) - 2, y: (height / 32) / 2},
    { x: ((width / 32) / 2) - 1, y: (height / 32) / 2},
    { x: (width / 32) / 2, y: (height / 32) / 2},
    { x: ((width / 32) / 2) + 1, y: (height / 32) / 2},
    { x: ((width / 32) / 2) + 2, y: (height / 32) / 2},
  ]
}

setInterval(game, 100);

function game() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  xOffset = snake.tiles[0].x + movment[direction].x;
  yOffset = snake.tiles[0].y + movment[direction].y;
  console.log(xOffset, yOffset);
  if (xOffset < 0){
    xOffset = (width/32)-1;
  }
  if (yOffset < 0){
    yOffset = (height/32) - 1;
  }
  if (xOffset >= width/32) {
    xOffset = 0;
  }
  if (yOffset >= height/32) {
    yOffset = 0;
  }
  snake.tiles.unshift({
    x: xOffset,
    y: yOffset
  });
  snake.tiles.splice(-1, 1);

}


document.onkeydown = getKeyBoardDown;

function getKeyBoardDown(event) {
  var keyDownEvent = event || window.event,
    keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
  switch (keycode) {
    case 37:
      direction = 'left';
      break;
    case 38:
      direction = 'up';
      break;
    case 39:
      direction = 'right';
      break;
    case 40:
      direction = 'down';
      break;
    default:
      break;
  }
    return false;
}

function drawSnake() {
  for (var index = 0; index < snake.tiles.length; index++) {
    setSnakeBody(snake.tiles[index].x, snake.tiles[index].y);
  }
}

function initialize() {
  setSnakeBody(Math.floor((width / 32) / 2) - 2, Math.floor((height / 32) / 2) - 2);
  setSnakeBody(Math.floor((width / 32) / 2) - 1, Math.floor((height / 32) / 2) - 2);
  setSnakeBody(Math.floor((width / 32) / 2), Math.floor((height / 32) / 2) - 2);
  setSnakeBody(Math.floor((width / 32) / 2) + 1, Math.floor((height / 32) / 2) - 2);
  setSnakeBody(Math.floor((width / 32) / 2) + 2, Math.floor((height / 32) / 2) - 2);
}

function setSnakeHead(x, y) {
  ctx.drawImage(head_tail, x * 32, y * 32);
}

function setSnakeBody(x, y) {
  ctx.clearRect(32 * x, 32 * y, 32, 32);
}
