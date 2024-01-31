function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  fill(255, 255, 0);
  arc(125, 200, 80, 80, PI + QUARTER_PI, PI - QUARTER_PI, PIE);
  fill(255, 0, 0);
  noStroke();
  arc(250, 200, 80, 80, PI, 0, PIE);
  rect(210, 200, 80, 40);
  fill(255, 255, 255);
  circle(230, 200, 25);
  circle(270, 200, 25);
  fill(0, 0, 204);
  circle(230, 200, 15);
  circle(270, 200, 15);
}
