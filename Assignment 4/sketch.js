let bugSpritesheet;
let bugs = [];
let squishedBugs = 0;
let timer;
let totalTime = 30;
let gameover = false;
let bugFrames = [];
let squishedFrameIndex; // Index of the squished frame in the spritesheet
let currentFrame = 0;
let mouseClickedFlag = false; // Flag to track mouse click
let frameRate = 60; // Set the frame rate

class Bug {
  constructor(x, y, width, height, speed, imgFrames) {
    this.x = x;
    this.y = y;
    this.originalSpeed = speed; // Store original speed
    this.speedMultiplier = 1; // Speed multiplier initially set to 1
    this.direction = random(TWO_PI);
    this.imgFrames = imgFrames;
    this.frameIndex = 0;
    this.dead = false;
    this.squishTimer = 0; // Keeps track of how long a bug has been squished
  }

  display() {
    if (!this.dead || this.squishTimer > 0) { // Draw even if squished bug timer hasn't expired
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      if (this.dead) {
        image(this.imgFrames[squishedFrameIndex], 0, 0);
      } else {
        image(this.imgFrames[this.frameIndex], 0, 0);
      }
      pop();
    }
  }

  move() {
    if (!this.dead) {
      this.x += cos(this.direction) * this.originalSpeed * this.speedMultiplier; // Adjust speed based on multiplier
      this.y += sin(this.direction) * this.originalSpeed * this.speedMultiplier; // Adjust speed based on multiplier
      this.checkEdges();
    }
  }

  checkEdges() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.direction += PI;
    }
  }

  squish() {
    if (mouseClickedFlag && !this.dead && dist(mouseX, mouseY, this.x, this.y) < 20) {
      this.dead = true;
      squishedBugs++;
      this.frameIndex = squishedFrameIndex; // Set frame to squished frame
      this.squishTimer = frameRate; // Set squish timer to 1 second (Squished Bug IMG removed after 1 second)
    }
  }
}

function preload() {
  bugSpritesheet = loadImage('assets/BugSquish.png');
}

function setup() {
  createCanvas(600, 400);
  timer = totalTime;
  textSize(24);

  // Extract frames from the spritesheet
  for (let i = 0; i < 8; i++) {
    let img = bugSpritesheet.get(i * 32, 0, 32, 32);
    bugFrames.push(img);
  }

  // Index of the frame with squished bug
  squishedFrameIndex = bugFrames.length - 1;

  for (let i = 0; i < 20; i++) {
    bugs.push(new Bug(random(width), random(height), 80, 80, random(1, 3), bugFrames));
  }
  setInterval(timeIt, 1000);
}

function draw() {
  background(220);

  if (!gameover) {
    let speedMultiplier = calculateSpeedMultiplier(timer);
    for (let bug of bugs) {
      bug.move();
      bug.speedMultiplier = speedMultiplier; // Set speed multiplier for each bug
      bug.display();
      bug.squish();
      bug.frameIndex = currentFrame;
    }
    currentFrame = (currentFrame + 1) % bugFrames.length;

    text('Time: ' + timer, 10, 30);
    text('Squished Bugs: ' + squishedBugs, 10, 60);
  } else {
    textAlign(CENTER, CENTER);
    textSize(48);
    text('Game Over!', width / 2, height / 2);
    textSize(24);
    text('Squished Bugs: ' + squishedBugs, width / 2, height / 2 + 50);
  }

  // Reset mouse click flag at the end of each draw loop 
  // Flag is meant to disallow holding the mouse button down to squish bugs
  mouseClickedFlag = false;

  // Remove squished bugs after 1 second
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].squishTimer > 0) {
      bugs[i].squishTimer--;
    } else if (bugs[i].dead) {
      bugs.splice(i, 1);
    }
  }
}

function timeIt() {
  timer--;
  if (timer == 0) {
    gameover = true;
  }
}

function mousePressed() {
  // Set mouse click flag when mouse is pressed
  mouseClickedFlag = true;
}

function calculateSpeedMultiplier(remainingTime) {
  // Adjust speed multiplier based on remaining time
  let speedMultiplier = 1 + (totalTime - remainingTime) / totalTime;
  return speedMultiplier;
}