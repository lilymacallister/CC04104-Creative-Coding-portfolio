let speedUp = false;
// set to true to increase the speed to be 10 seconds per minute and 6 minutes per hour (in order to see minute and hour events faster)
// press 'm' to run the minute event at any time, and 'h' to run the hour event

let prevMilli = 0;
let prevSec = 0;
let particles = [];
let remainingBurst = 0;

class Particle {
  constructor(x, y, a, s, c) {
    this.x = x;
    this.y = y;
    this.dx = cos(a)*s;
    this.dy = sin(a)*s + 0.1;
    this.c = c;
  }
  
  tick() {
    this.x += this.dx;
    this.y += this.dy;
    this.dx *= 0.99;
    this.dy += 0.1;
  }
  
  display() {
    fill(this.c, 100, 100);
    noStroke();
    circle(this.x, this.y, 5);
  }
}

function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
}

function draw() {
  background(0);
  fill(10);
  noStroke();
  
  let t = new Date();
  let milli = t.getMilliseconds();
  let sec = t.getSeconds();
  let minProg;
  let mins;
  let hrProg;
  
  if (speedUp) {
    sec %= 10;
    minProg = (milli/1000 + sec) / 10;
    mins = (t.getSeconds() - sec) / 10;
    hrProg = (minProg + mins) / 6;
    sec *= 5;
    mins *= 5;
  } else {
    minProg = (milli/1000 + sec) / 60;
    mins = t.getMinutes();
    hrProg = (minProg + mins) / 60;
  }
  
  rect(0, 800-800*hrProg, 800, 800*hrProg);
  
  fill(28, 40, 30);
  rect(300, 250, 200, 550);
  fill(28, 40, 40);
  rect(300, 800-550*minProg, 200, 550*minProg);
  
  fill(40);
  rect(320, 220, 20, 30);
  rect(460, 220, 20, 30);
  
  if (milli < prevMilli) {
    for (let n = 0; n < sec; n ++) {
      particles.push(new Particle(400, 350, random(TWO_PI), random(5), random(30)));
    }
    if (sec < prevSec) {
      minuteFunc(mins);
      if (mins == 0) {
        hourFunc();
      }
    }
    prevSec = sec;
  }
  
  if (remainingBurst > 0) {
    particles.push(new Particle(330, 220, random(PI+1, TWO_PI-1), random(3, 6), random(40)+70));
    particles.push(new Particle(470, 220, random(PI+1, TWO_PI-1), random(3, 6), random(40)+70));
    remainingBurst -= 1;
  }
  
  stroke(0, 0, 60);
  strokeWeight(5);
  prevMilli = milli;
  
  let angle = 90 + sin((milli/1000 + sec % 2) * PI) * 25;
  
  line(400, 350, 400 + cos(angle/180*PI) * 300, 350 + sin(angle/180*PI) * 300);
  circle(400, 350, 15);
  stroke(55, 100, 50);
  fill(55, 100, 100);
  circle(400 + cos(angle/180*PI) * 300, 350 + sin(angle/180*PI) * 300, 60);
  
  for(let i = particles.length - 1; i >= 0; i --){
    particle = particles[i];
    particle.tick()
    particle.display()
    if (particle.y > windowHeight + 50) {particles.splice(i, 1)}
  }
}

function minuteFunc(minutes) {
  remainingBurst = minutes * 5;
}

function hourFunc() {
  for (let n = 0; n < 150; n ++) {
    particles.push(new Particle(330, 220, random(PI+1, TWO_PI-1), random(3, 10), random(30)+180));
    particles.push(new Particle(470, 220, random(PI+1, TWO_PI-1), random(3, 10), random(30)+180));
  }
}

function keyPressed() {
  if (key == 'm') {
    minuteFunc(new Date().getMinutes());
  }
  if (key == 'h') {
    hourFunc();
  }
}