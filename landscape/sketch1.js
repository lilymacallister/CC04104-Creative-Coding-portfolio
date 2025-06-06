// Constants
let noisiness = 0.2; // Default 0.2
let biome = 0; // 0: random, 1: forest, 2: desert, 3: jungle
let scrollSpeed = 1; // Default 1, recommended 0 to 100
let heightMulti = 200; // Default 200, recommended 0 to 700


let points = [];
let trees = [];
let particles = [];
let noiseCounter = 0;
let treeChance = 0.25;
let rainChance = 0.5;
let ground = [100, 60, 30];
let grass = [50, 150, 50];
let sky = [210, 245, 255];
let raining = false;

class TerrainSpline {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  tick() {
    this.x -= scrollSpeed;
  }
}

class Node {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.children = [];
  }
  
  addChild(dx, dy) {
    let newNode = new Node(this.x + dx, this.y + dy, this.d + 1);
    this.children.push(newNode);
    return newNode;
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseNode = new Node(0, 0, 0);
  }
  
  tick() {
    this.x -= scrollSpeed;
  }
  
  drawNode(node) {
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i ++) {
        line(this.x + node.x, this.y + node.y, this.x + node.children[i].x, this.y + node.children[i].y);
        this.drawNode(node.children[i]);
      }
    }
  }
  
  draw() {
    stroke(0);
    strokeWeight(5);
    this.drawNode(this.baseNode);
  }
}

class RainParticle {
  constructor (x) {
    this.x = x;
    this.y = -40;
  }
  
  tick() {
    this.x -= 5;
    this.y += 10;
  }
  
  draw() {
    stroke(120, 130, 140);
    strokeWeight(3);
    line(this.x, this.y, this.x + 16, this.y - 32);
  }
}

class Tree1 extends Tree {
  constructor(x, y) {
    super(x, y);
    let node2 = this.baseNode.addChild(0, - (70 + Math.random() * 40));
    for (let i = 0; i < 6; i += 1) {
      let r = 25 + Math.random() * 15;
      let a = 0.8 + Math.random() * 1.4;
      node2.addChild(cos(a*PI)*r, sin(a*PI)*r);
    }
  }
  
  draw() {
    stroke(60, 45, 25);
    strokeWeight(5);
    this.drawNode(this.baseNode);
    let node2 = this.baseNode.children[0];
    rectMode(CENTER);
    noStroke();
    fill(20, 100, 30);
    circle(this.x + node2.x, this.y + node2.y, 60);
    for (let i = 0; i < node2.children.length; i ++) {
      circle(this.x + node2.children[i].x, this.y + node2.children[i].y, 40);
    }
  }
}

class Tree2 extends Tree {
  constructor(x, y) {
    super(x, y);
    let layers = randomInt(3)+5;
    let layerWidth = randomInt(4)+8;
    let layerHeight = randomInt(12)+22;
    let node2 = this.baseNode.addChild(0, -layerHeight);
    for (let i = 0; i < layers; i += 1) {
      node2.addChild(layerWidth * (layers - i + 1), 0);
      node2.addChild(-layerWidth * (layers - i + 1), 0);
      node2 = node2.addChild(0, -layerHeight);
    }
  }
  
  draw() {
    stroke(60, 45, 25);
    strokeWeight(7);
    this.drawNode(this.baseNode);
    rectMode(CENTER);
    noStroke();
    fill(28, 145, 22);
    this.drawIfLowest(this.baseNode);
  }
  
  drawIfLowest(node) {
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i ++) {
        this.drawIfLowest(node.children[i])
      }
    } else {
      circle(this.x + node.x, this.y + node.y, 25);
    }
  }
}

class Cactus extends Tree {
  constructor(x, y) {
    super(x, y);
    let node2 = this.baseNode.addChild(0, - (30 + Math.random() * 10));
    let m = 1;
    if (randomInt(2) == 1) {m = -1;}
    let w = 15 + Math.random() * 10;
    let node3 = node2.addChild(w*m, 0);
    node3.addChild(0, -(20 + Math.random() * 15));
    node2 = node2.addChild(0, -(15 + Math.random() * 15));
    node3 = node2.addChild(-w*m, 0);
    node3.addChild(0, -(20 + Math.random() * 15));
    node2.addChild(0, -(30 + Math.random() * 25));
  }
  
  draw() {
    stroke(75, 150, 50);
    strokeWeight(5);
    this.drawNode(this.baseNode);
  }
}

function setup() {
  
  if (biome == 0) {biome = randomInt(3)+1;}

  switch (biome) {
    case 1:
      ground = [100, 60, 30];
      grass = [50, 150, 50];
      treeChance = 0.25;
      break;
    case 2:
      ground = [240, 230, 170];
      grass = [255, 243, 187];
      treeChance = 0.2;
      break;
    case 3:
      ground = [120, 70, 30];
      grass = [50, 190, 50];
      treeChance = 0.4;
      break;
  }
  
  if (Math.random() < rainChance) {
    raining = true;
    sky = [188, 201, 204];
  }
  
  createCanvas(800, 800);
  for (let i = -200; i <= 1000; i += 100) {
    noiseCounter += noisiness;
    let newY = height/2 + noise(noiseCounter)*heightMulti - heightMulti/2
    points.push(new TerrainSpline(i, newY));
    tryTree(i, newY);
  }
}

function tryTree(x, y) {
  if (Math.random() < treeChance) {
      switch (biome) {
        case 1:
          trees.push(new Tree1(x, y));
          break;
        case 2:
          trees.push(new Cactus(x, y));
          break;
        case 3:
          trees.push(new Tree2(x, y));
          break;
      }
    }
}

function draw() {
  background(sky[0], sky[1], sky[2]);
  for (const i of points) {
    i.tick();
  }
  if (points[0].x < -200) {
    points.splice(0, 1);
    noiseCounter += noisiness;
    let newX = points[points.length - 1].x + 100;
    let newY = height/2 + noise(noiseCounter)*heightMulti - heightMulti/2
    points.push(new TerrainSpline(newX, newY));
    tryTree(newX, newY);
  }
  if (raining && Math.random() < 0.4) {
    particles.push(new RainParticle(Math.random() * (1600)));
  }
  if (trees.length > 0 && trees[0].x < -200) {
    trees.splice(0, 1);
  }
  if (particles.length > 0 && particles[0].y > 900) {
    particles.splice(0, 1);
  }
  
  fill(ground[0], ground[1], ground[2]);
  stroke(grass[0], grass[1], grass[2]);
  strokeWeight(12);
  beginShape();
  curveVertex(points[0].x, 1000);
  points.forEach(function(point) {
    curveVertex(point.x, point.y);
  });
  curveVertex(points[points.length - 1].x, 1000);
  curveVertex(points[0].x, 1000);
  curveVertex(points[0].x, points[0].y);
  endShape();
  
  trees.forEach(function(tree) {
    tree.tick();
    tree.draw();
  });
  
  particles.forEach(function(particle) {
    particle.tick();
    particle.draw();
  });
  
  // noFill();
  // stroke(50, 150, 50);
  // strokeWeight(10);
  // let m = points.length - 4;
  // for (let n = 0; n < m; n ++) {
  //   curve(points[n].x, points[n].y, points[n+1].x, points[n+1].y, points[n+2].x, points[n+2].y, points[n+3].x, points[n+3].y)
  // }
}


function randomInt(n) {
  return floor(random(n));
}