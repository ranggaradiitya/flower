let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let points = new Array();
let num;

let background = document.getElementById('background');

let k = 0;
let i = 50;
let r = 1 / i;
let g = 50 / i;
let b = 50 / i;

let offX = 300;
let offY = 120;

function getHeartPoint(c) {
  let r =
    (Math.sin(c) * Math.sqrt(Math.abs(Math.cos(c)))) / (Math.sin(c) + 1.4) -
    2 * Math.sin(c) +
    2;
  let x = 125 * Math.cos(c) * r;
  let y = -125 * Math.sin(c) * r;
  return new Array(x, y);
}

function dist(x0, y0, x1, y1) {
  return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
}

function drawHeart() {
  let last = new Array(0, 0);
  context.translate(offX, offY);
  for (let z = 4.7; z < 11; z += 0.04) {
    let h = getHeartPoint(z);
    if (dist(h[0], h[1], last[0], last[1]) < 40) continue;
    last[0] = h[0];
    last[1] = h[1];
    points.push(new flower(context, h[0], h[1], 7, 35, 255, 212, 50));
  }
}

function drawFlowers() {
  points[num - 1].start();
  if (num-- > 0) setTimeout(drawFlowers, 130);
}

function drawText() {
  context.fillStyle = 'rgba(255,100,50,0.05)';
  context.fillText('Juana Lucia', -160, 150);
  context.font = '70px Pinyon Script';
}

function changebkg() {
  background.style.backgroundColor =
    'rgb(' +
    Math.floor(255 - r * k) +
    ',' +
    Math.floor(255 - g * k) +
    ',' +
    Math.floor(255 - b * k) +
    ')';
  k++;
}

function outline() {
  drawHeart();
  context.font = '70px Pinyon Script';
  for (let i = 0; i < 20; i++) {
    setTimeout(drawText, 120 * i);
  }
  num = points.length;
  drawFlowers();
  for (let k = 0; k < i; k++) {
    setTimeout(changebkg, 100 * k);
  }
}

outline();
