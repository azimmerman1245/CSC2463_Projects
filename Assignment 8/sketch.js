
let selected, red, orange, yellow, green, cyan, blue, magenta, brown, white, black;
let soundFX;
let delAmt = new Tone.FeedbackDelay("8n", 0.5);
let sounds = new Tone.Players({
  'changeColor' : "assets/fullcanrattle-107830.mp3",
  'sprayPaint' : "assets/spray_can.mp3",
  'erasing' : "assets/erasing.mp3"
})
sounds.connect(delAmt);
delAmt.toDestination();

function setup() {
  createCanvas(500, 300);
  resetSketch();
  var button = createButton("Reset Canvas");
  button.mousePressed(resetSketch);
}

function resetSketch() {
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
    sounds.player("changeColor").start();
    selected = "red";
  } else if(collide(10, 35)) {
    sounds.player("changeColor").start();
    selected = "orange";
  } else if(collide(10, 60)) {
    sounds.player("changeColor").start();
    selected = "yellow";
  } else if(collide(10, 85)) {
    sounds.player("changeColor").start();
    selected = "green";
  } else if(collide(10, 110)) {
    sounds.player("changeColor").start();
    selected = "cyan";
  } else if(collide(10, 135)) {
    sounds.player("changeColor").start();
    selected = "blue";
  } else if(collide(10, 160)) {
    sounds.player("changeColor").start();
    selected = "magenta";
  } else if(collide(10, 185)) {
    sounds.player("changeColor").start();
    selected = "saddlebrown";
  } else if(collide(10, 210)) {
    sounds.player("changeColor").start();
    selected = "white";
  } else if(collide(10, 235)) {
    sounds.player("changeColor").start();
    selected = "black";
  } else if(buttonCollide(0, 310)) {
    sounds.player("erasing").start();
  } else if(canvasCollide(10, 0)) {
    sounds.player("sprayPaint").start();
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

function buttonCollide(x, y) {
  if(mouseX >= x &&
    mouseX <= x + 100 &&
    mouseY >= y &&
    mouseY <= y + 20) {
     return true;
   }
   return false;
};

function canvasCollide(x, y) {
  if(mouseX >= x &&
    mouseX <= x + 500 &&
    mouseY >= y &&
    mouseY <= y + 300) {
     return true;
   }
   return false;
}
