function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 0, 153);
  noStroke();
  fill(255, 255, 255);
  circle(200, 200, 160);
  fill(0, 153, 0);
  circle(200, 200, 150);
  fill(255, 255, 255);
  star(200, 200, 37.5, 85, 5);
  fill(255, 0, 0);
  star(200, 200, 30, 70, 5);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -HALF_PI; a < TWO_PI + -HALF_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
