canvas = document.getElementById('layer1');
ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.fillRect(0, 0, canvas.width, canvas.height);
direction = 'still';
can_change = true;
god_mode = true;
movment = {
  'left': {x: -1, y: 0},
  'up': {x: 0, y: -1},
  'right': {x: 1, y: 0},
  'down': {x: 0, y: 1},
  'still': { x: 0, y: 0}
}

snake = setSnake();

food = setFood(Math.floor(Math.random() * (width / 32)), Math.floor(Math.random() * (height / 32)));
setCompletion();
setInterval(game, 70);
function game() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  setFood(food.x, food.y);
  xOffset = snake.tiles[0].x + movment[direction].x;
  yOffset = snake.tiles[0].y + movment[direction].y;
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
  potential_snake_body = snake.tiles.filter(e => e.x == xOffset && e.y == yOffset)
  if (potential_snake_body.length == 1 && potential_snake_body[0] != snake.tiles[snake.tiles.length - 1]){
    snake = setSnake();
    direction = 'still';
    can_change = true;
    setCompletion();
  }else{
    snake.tiles.unshift({
      x: xOffset,
      y: yOffset
    });
    can_change = true;
  }
  if(xOffset == food.x && yOffset == food.y){
    food = setFood(Math.floor(Math.random() * (width / 32)), Math.floor(Math.random() * (height / 32)));
    setCompletion();
  }else{
    snake.tiles.splice(-1, 1);
  }
  if(!!snake.tiles.filter(e => e.x == food.x && e.y == food.y).length){
    food = setFood(Math.floor(Math.random() * (width / 32)), Math.floor(Math.random() * (height / 32)));
  }
}


document.onkeydown = getKeyBoardDown;

function getKeyBoardDown(event) {
  var keyDownEvent = event || window.event,
    keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
  switch (keycode) {
    case 37:
      if(direction !== 'right' && can_change){
        direction = 'left';
        can_change = false;
      }
      break;
    case 38:
      if (direction !== 'down' && can_change){
        direction = 'up';
        can_change = false;
      }
      break;
    case 39:
      if (direction !== 'left' && can_change){
        direction = 'right';
        can_change = false;
      }
      break;
    case 40:
      if (direction !== 'up' && can_change){
        direction = 'down';
        can_change = false;
      }
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

function setSnake() {
  return {
    tiles: [
      { x: Math.floor((width / 32) / 2) - 2, y: Math.floor((height / 32) / 2) },
      { x: Math.floor((width / 32) / 2) - 1, y: Math.floor((height / 32) / 2) },
      { x: Math.floor((width / 32) / 2), y: Math.floor((height / 32) / 2) },
      { x: Math.floor((width / 32) / 2) + 1, y: Math.floor((height / 32) / 2) },
      { x: Math.floor((width / 32) / 2) + 2, y: Math.floor((height / 32) / 2) },
    ]
  };
}

function setFullSnake() {
  result = {tiles: []};
  for (var i = 0; i < width/32; i++) {
    for (var j = 0; j < height/32; j++) {
      result.tiles.push({x: i, y: j});
    }
  }
  return result;
}

function setFood(x, y) {
  ctx.clearRect(32 * x, 32 * y, 32, 32);
  return {x: x, y: y};
}

function setSnakeHead(x, y) {
  ctx.drawImage(head_tail, x * 32, y * 32);
}

function setSnakeBody(x, y) {
  ctx.clearRect(32 * x, 32 * y, 32, 32);
}

function completion() {
  return snake.tiles.length * (100/(width*height))*32*32;
}

function setCompletion() {
  document.getElementById('comp').innerHTML = round(completion(), 2) + '%';
}

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}