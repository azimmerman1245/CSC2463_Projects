
let selected, red, orange, yellow, green, cyan, blue, magenta, brown, white, black;

function setup() {
  createCanvas(600, 600);
  background(255);
  red = new colorBox(10, "red");
  orange = new colorBox(35, "orange");
  yellow = new colorBox(60, "yellow");
  green = new colorBox(85, "green");
  cyan = new colorBox(110, "cyan");
  blue = new colorBox(135, "blue");
  magenta = new colorBox(160, "magenta");
  brown = new colorBox(185, "saddlebrown");
  white = new colorBox(210, "white");
  black = new colorBox(235, "black");
}

class colorBox {
  constructor(y, color) {
    this.x = 10;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.color = color;
  }

  showColor() {
    push();
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

function draw() {

  if (mouseIsPressed) {
    drawing();
  }

  red.showColor();
  orange.showColor();
  yellow.showColor();
  green.showColor();
  cyan.showColor();
  blue.showColor();
  magenta.showColor();
  brown.showColor();
  white.showColor();
  black.showColor();
}

function mousePressed() {
  if(collide(10, 10)) {
    selected = "red";
  } else if(collide(10, 35)) {
    selected = "orange";
  } else if(collide(10, 60)) {
    selected = "yellow";
  } else if(collide(10, 85)) {
    selected = "green";
  } else if(collide(10, 110)) {
    selected = "cyan";
  } else if(collide(10, 135)) {
    selected = "blue";
  } else if(collide(10, 160)) {
    selected = "magenta";
  } else if(collide(10, 185)) {
    selected = "saddlebrown";
  } else if(collide(10, 210)) {
    selected = "white";
  } else if(collide(10, 235)) {
    selected = "black";
  }
}

function drawing() {
  push();
  stroke(selected);
  strokeWeight(5);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
}

function collide(x, y) {
  if(mouseX >= x &&
     mouseX <= x + 20 &&
     mouseY >= y &&
     mouseY <= y + 20) {
      return true;
    }
    return false;
};
