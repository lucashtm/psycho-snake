width = 1280;
height = 736;

width = width - (width%32);
height = height - (height%32);

canvas = document.getElementById('layer1');
bg = document.getElementById('layer2');


canvas.width = width;
canvas.height = height;

bg.style.width = width;
bg.style.height = height;
