
let sprite;
let characters = [];

function preload() {
  let animations = {
    stand: { row: 0, frames: 1},
    walkRight: { row: 0, col: 1, frames: 8}
  };

  randomStart1 = random(40, 520);
  randomStart2 = random(40, 520);
  randomStart3 = random(40, 520);
  characters.push(new Character(randomStart1, 200, 80, 80, 'assets/SpelunkyGuy.png', animations));
  characters.push(new Character(randomStart2, 200, 80, 80, 'assets/Green.png', animations));
  characters.push(new Character(randomStart3, 200, 80, 80, 'assets/Viking.png', animations));

}

function setup() {
  createCanvas(600, 250);
}

function draw() {
  background(220);

  characters.forEach((character) => {
    if (kb.pressing('d')) {
      character.walkRight();
    } else if(kb.pressing('a')) {
      character.walkLeft();
    } else {
      character.stop();
    }

    if (character.sprite.x + character.sprite.width/4 > width) {
      character.walkLeft();
    } else if (character.sprite.x - character.sprite.width/4 < 0) {
      character.walkRight();
    }
  })
}

class Character {
  constructor(x, y, width, height, spriteSheet, animation) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    
    this.sprite.anis.frameDelay = 6;
    this.sprite.addAnis(animation);
    this.sprite.changeAni('stand');
  }

  walkRight() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.scale.x = 1;
  }
  
  walkLeft() {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.scale.x = -1;
  }
  
  stop() {
    this.sprite.vel.x = 0;
    this.sprite.changeAni('stand');
  }
}

function keyTypedOld() {
  switch(key) {
    case 'd':
      walkRight();
      break;
    case 'a':
      walkLeft();
      break;
  }
}