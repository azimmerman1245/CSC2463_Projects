
let synth;
let filter;
let tremolo;
let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k'];
let keyNotes = ['G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'];

function setup() {
  createCanvas(400, 200);

  // Initialize the synth, filter, and tremolo
  synth = new Tone.PolySynth().toDestination();
  filter = new Tone.Filter(400, "lowpass").toDestination();
  tremolo = new Tone.Tremolo({
    frequency: 5,
    depth: 0.5,
    type: "sine",
  }).start().connect(filter);

  synth.connect(filter);

  // Volume Slider
  let volumeSlider = createSlider(0, 100, 50);
  volumeSlider.position(20, 100);
  volumeSlider.input(function() {
    changeVolume(volumeSlider.value());
  });

  // Tremolo Depth Slider
  let tremoloDepthSlider = createSlider(0, 100, 50);
  tremoloDepthSlider.position(20, 130);
  tremoloDepthSlider.input(function() {
    changeTremoloDepth(tremoloDepthSlider.value());
  });

  // Tremolo Frequency Slider
  let tremoloFrequencySlider = createSlider(0, 100, 50);
  tremoloFrequencySlider.position(20, 160);
  tremoloFrequencySlider.input(function() {
    changeTremoloFrequency(tremoloFrequencySlider.value());
  });
}

function draw() {
  background(220);
  
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Press keys A-K to play", width /2, height / 3);

  textSize(16);
  text("Volume", 9 * width / 16, 110);
  text("Tremolo Depth", 10 * width / 16, 140);
  text("Tremolo Frequency", 12 * width / 18, 170);
}

function keyPressed() {
  let keyIndex = keys.indexOf(key);
  if (keyIndex != -1) {
    synth.triggerAttack(keyNotes[keyIndex]);
  }
}

function keyReleased() {
  let keyIndex = keys.indexOf(key);
  if (keyIndex != -1) {
    synth.triggerRelease(keyNotes[keyIndex]);
  }
}

function changeVolume(vol) {
  let volumeValue = map(vol, 0, 100, -50, 0);
  Tone.Master.volume.value = volumeValue;
}

function changeTremoloDepth(depth) {
  tremolo.depth.value = depth;
}

function changeTremoloFrequency(freq) {
  tremolo.frequency.value = freq;
}
