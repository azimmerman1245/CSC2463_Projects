
let soundFX;
let delAmt = new Tone.FeedbackDelay("8n", 0.5);
let button1, button2, button3, button4;
let delaySlider, fbSlider;
let sounds = new Tone.Players({
  'catGrowl' : "assets/catGrowl.mp3",
  'drumBeats' : "assets/drumBeats.mp3",
  'guitar' : "assets/guitar.mp3",
  'swordSlash' : "assets/swordSlash.mp3"
});

sounds.connect(delAmt);
delAmt.toDestination();

function setup() {
  createCanvas(600, 400);

  button1 = createButton('Cat Growl');
  button1.position(85, 150);
  button1.mousePressed(() =>sounds.player("catGrowl").start());

  button2 = createButton('Drum Beats');
  button2.position(205, 150);
  button2.mousePressed(() =>sounds.player("drumBeats").start());

  button3 = createButton('Guitar');
  button3.position(325, 150);
  button3.mousePressed(() =>sounds.player("guitar").start());

  button4 = createButton('Sword Slash');
  button4.position(445, 150);
  button4.mousePressed(() =>sounds.player("swordSlash").start());

  delaySlider = createSlider (0, 1, 0, 0.05);
  delaySlider.position(width / 3, 250);
  delaySlider.mouseMoved(() => delAmt.delayTime.value = delaySlider.value());
}

function draw() {
  background(220);

  textSize(16);
  textAlign(CENTER);
  fill(0);
  strokeWeight(4);
  text('Audio Delay Slider', width / 2.1, 290);

  textSize(20);
  text('Click Buttons to Play Audio', width / 2.1, 50);
}
