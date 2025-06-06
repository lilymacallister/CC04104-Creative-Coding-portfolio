let active = true;
let players = [];
let bl = 50;
let br = 750;
let bt = 150;
let bb = 750;
let font;
let time = 1800;

let sb = 0;
let sr = 0;

function preload() {
  font = loadFont("font.ttf");
}

function setup() {
  players.push(new Player(0, 90, 300, 450));
  players.push(new Player(200, 77, 500, 450));
  createCanvas(800, 800);
  colorMode(HSB);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textFont(font);
  drawArena();
}

function drawArena() {
  background(0, 0, 50);
  noStroke();
  fill(0, 0, 100);
  rect(400, 450, 700, 600)
  noFill();
  stroke(0, 0, 97);
  strokeWeight(20);
  rect(400, 450, 600, 500);
  circle(300, 450, 150);
  circle(500, 450, 150);
}

function drawTimer() {
  fill(0, 0, 100);
  rect(400, 75, 210, 100);
  fill(0, 0, 0);
  textSize(50);
  let timeS;
  let ticks = 600 - round(frameCount / 6);
  if (ticks > 100) {
    let mins = floor((ticks+9) / 600);
    let secs = ceil(ticks / 10) % 60;
    if (secs > 9) {timeS = mins + ":" + secs;}
    else {timeS = mins + ":0" + secs;}
  } else {
    let secs = floor(ticks / 10);
    let ds = (ticks % 10);
    timeS = secs + "." + ds;
  }
  text(timeS, 400, 70);
}

function drawScores() {
  fill(players[0].h, 30, 100);
  rect(160, 75, 220, 100);
  
  fill(players[1].h, 30, 100);
  rect(640, 75, 220, 100);
  
  fill(0, 0, 0);
  textSize(50);
  text(sr.toFixed(1) + "%", 160, 70);
  text(sb.toFixed(1) + "%", 640, 70);
}

function calcScores() {
  loadPixels();
  pixB = 0;
  pixR = 0;
  pixW = 0;
  for (let x = 55; x <= 745; x += 10) {
    for (let y = 155; y <= 745; y += 10) {
      let r = pixels[x*4 + y*4*800];
      let b = pixels[x*4 + y*4*800 + 2];
      if (r - b > 50) {pixR += 1;}
      else if (b - r > 50) {pixB += 1;}
      else {pixW += 1;}
    }
  }
  pixT = pixB + pixR + pixW;
  sb = pixB / pixT * 100;
  sr = pixR / pixT * 100;
}

function draw() {
  if (active == true) {
    players.forEach(function (p) {
      p.prerender();
      p.tick();
      p.render();
    })

    drawTimer();
    if (frameCount % 5 == 0) {
      calcScores();
    }
    drawScores();
    if (frameCount == 3600) {
      active = false;
      fill(0, 0, 100);
      rect(400, 75, 210, 100);
      fill(0, 0, 0);
      textSize(30);
      text("WINNER:", 400, 60);
      if (pixR > pixB) {text("RED", 400, 85);}
      else {text("BLUE", 400, 85);}
    }
  }
  
}

class Player {
  constructor(h, k, x, y) {
    this.h = h;
    this.k = k;
    this.x = x;
    this.y = y;
    this.a = 0;
    this.r = 40;
    this.swapped = false;
    this.s = 0.125;
  }
  
  tick() {
    this.a += this.s;
    let xa = this.x + cos(this.a)*this.r;
    let ya = this.y + sin(this.a)*this.r;
    if (xa < (bl + 10) || xa > (br - 10) || ya < (bt + 10) || ya > (bb - 10)) {
      this.s *= -1;
      this.a += this.s;
    }
    if (keyIsDown(this.k)) {
      if (!this.swapped) {
        this.x += cos(this.a)*this.r;
        this.y += sin(this.a)*this.r
        this.a += PI;
        this.swapped = true;
      }
    } else {this.swapped = false;}
  }
  
  prerender() {
    noStroke();
    fill(this.h, 30, 100);
    circle(this.x, this.y, 20);
    circle(this.x + cos(this.a)*this.r, this.y + sin(this.a)*this.r, 20);
  }
  
  render() {
    noStroke();
    fill(this.h, 100, 100);
    rectMode(CENTER);
    circle(this.x, this.y, 19);
    circle(this.x + cos(this.a)*this.r, this.y + sin(this.a)*this.r, 19);
  }
}