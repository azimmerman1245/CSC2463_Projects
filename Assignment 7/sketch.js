drops = []
let ambientNoise = new Tone.Noise("white");
let dropsNoise = new Tone.Noise("pink");

const adsr = new Tone.AmplitudeEnvelope({
  attack: 100, // Set the attack time
  decay: 5, // Set the decay time
  sustain: 0.2, // Set the sustain level
  release: 0.5 // Set the release time
}).toDestination();

ambientNoise.connect(adsr);
dropsNoise.connect(adsr);
function setup() {
  createCanvas(500, 500);
  p = createVector(random(width), 200)
 
}

function mousePressed() {
  adsr.triggerAttack();
  ambientNoise.start();
  dropsNoise.start();
  filter.frequency.rampTo(500, 0.5);
}

function mouseReleased() {
  ambientNoise.stop();
  dropsNoise.stop();
  filter.frequency.value = 100;
}

function draw() {
  background(20);
  if(mouseIsPressed === true) {
    for (let i = 0; i < 5; i++){
      drops.push(new Drop(random(width), 0, 0))
    }
    
    for (let d of drops){
      d.show()
      d.update()
    }
  }
}

class Drop{
  constructor(x, y){
    this.pos = createVector(x, y)
    this.vel = createVector(0, random(8, 11))
    this.length = random(20, 40)
    this.strength = random(255)
  }
  show(){
    stroke(255, this.strength)
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y-this.length)
  }
  
  update(){
    this.pos.add(this.vel)
    if (this.pos.y > height + 100){
      drops.shift()
    }
  }
  
}

