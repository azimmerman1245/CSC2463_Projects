let synth;
let filter;
let tremolo;
let octave = 3;
let keys = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j'];
let keyNotes = ['C'+octave, 'C#'+octave, 'D'+octave, 'D#'+octave, 'E'+octave, 'F'+octave, 'F#'+octave, 'G'+octave, 'G#'+octave, 'A'+octave, 'A#'+octave, 'B'+octave];

let serialPort;
let reader;
let latestData = "";

async function setup() {
  createCanvas(800, 400);

  // Initialize the synth, filter, and tremolo
  synth = new Tone.PolySynth().toDestination();
  filter = new Tone.Filter(400, "lowpass").toDestination();
  tremolo = new Tone.Tremolo({
    frequency: 5,
    depth: 0.5,
    type: "sine",
  }).start().connect(filter);

  synth.connect(filter);

  // Request access to the serial port
  serialPort = await navigator.serial.requestPort();

  // Set serial port options
  await serialPort.open({ baudRate: 9600 });

  // Create a reader to read data from the serial port
  reader = serialPort.readable.getReader();

  // Start reading data from the serial port
  readData();
}

async function readData() {
  while (true) {
      // Read data from the serial port
      const { value, done } = await reader.read();

      if (done) {
        console.log("Reader has been closed.");
        break;
      }

      // Convert data to text
      const text = new TextDecoder().decode(value);

      // Append received data to latestData
      latestData += text;

      // Check if latestData ends with a newline character
      if (latestData.endsWith('\n')) {
        // If yes, parse the received data
        let data = latestData.trim();
        // Do something with the data
        if (data === 'q') {
          keyPressed('q');
        } else if (data === 'z') {
          keyPressed('z');
        }
        // Clear latestData
        latestData = "";
      }
  }
}

function keyPressed() {
  let keyIndex = keys.indexOf(key);
  if (key == 'q') {
    octave += 1;
    keyNotes = keyNotes.map(note => note.substring(0, note.length - 1) + octave);
  } else if (key == 'z') {
    octave -= 1;
    keyNotes = keyNotes.map(note => note.substring(0, note.length - 1) + octave);
  } else if (keyIndex != -1) {
    let note = keyNotes[keyIndex];
    synth.triggerAttack(note);
    if (note.includes('#')) {
      blackKeysPlaying.push(note);
    } else {
      whiteKeysPlaying.push(note);
    }
  }
}

function keyReleased() {
  let keyIndex = keys.indexOf(key);
  if (keyIndex != -1) {
    let note = keyNotes[keyIndex];
    synth.triggerRelease(note);
    if (note.includes('#')) {
      blackKeysPlaying = blackKeysPlaying.filter(item => item !== note);
    } else {
      whiteKeysPlaying = whiteKeysPlaying.filter(item => item !== note);
    }
  }
}

function draw() {
  background(220);
  var whiteKeyWidth = (width - 200) / 7; // Width of each white key
  var blackKeyWidth = whiteKeyWidth * 0.4; // Width of each black key
  
  // Draw white keys
  let whiteKeyNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  for (let i = 0; i < whiteKeyNotes.length; i++) {
    let x = 100 + i * whiteKeyWidth;
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(x, 80, whiteKeyWidth, 250);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(0);
    noStroke();
    text(whiteKeyNotes[i] + octave, x + whiteKeyWidth / 2, 300);
  }
  
  // Draw black keys
  let blackKeyNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];
  let blackKeyPositions = [170, 255, 425, 510, 600];
  for (let i = 0; i < blackKeyNotes.length; i++) {
    let x = blackKeyPositions[i];
    fill(0);
    rect(x, 80, blackKeyWidth, 150);
    
    // Draw label for sharp notes on top of the keys
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    text(blackKeyNotes[i] + octave, x + blackKeyWidth / 2, 130);
  }
}