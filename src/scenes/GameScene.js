import {Scene, Math as pMath} from 'phaser';

class GameScene extends Scene {

  constructor() {
    super("scene-game");
  }

  preload() {
    this.load.scenePlugin('Camera3DPlugin', 'assets/camera3d.min.js', 'Camera3DPlugin', 'cameras3d');
  }

  create() {
    this.cam = this.cameras3d.add(80, window.innerWidth, window.innerHeight);
    this.cam.setPosition(1500, -70, 22000);

    this.hero = this.cam.create(1500, -70, 20000, 'hero');

    console.log(this.heroDive);

    this.island = this.cam.create(1500, -70, 0, 'island');
    const islandW = this.island.gameObject.width;
    const islandH = this.island.gameObject.height;
    const islandX = this.island.x;
    const islandY = this.island.y;

    this.fallers = [
      this.cam.create(pMath.Between((islandX - (islandW / 2)), (islandX + (islandW / 2))), pMath.Between((islandY - (islandH / 2)), (islandY + (islandH / 2))), pMath.Between(17000, 19500), 'faller'),
      this.cam.create(pMath.Between((islandX - (islandW / 2)), (islandX + (islandW / 2))), pMath.Between((islandY - (islandH / 2)), (islandY + (islandH / 2))), pMath.Between(17000, 19500), 'faller'),
      this.cam.create(pMath.Between((islandX - (islandW / 2)), (islandX + (islandW / 2))), pMath.Between((islandY - (islandH / 2)), (islandY + (islandH / 2))), pMath.Between(17000, 19500), 'faller')
    ];

    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.ad = this.input.keyboard.addKeys('A,D');
    
    this.score = 0;
    this.scoreText = this.add.text(10, 10, `${this.score} / ${this.fallers.length}`, {
      fontSize: 24,
      fill: '#000'
    });

    this.heroSpeed = 20;
    this.diveSpeed = 40;
    this.fallSpeed = 10;
    this.gotDummy = false;

    this.caughtFallers = [
      false,
      false,
      false
    ];

    this.hitFaller = [
      false,
      false,
      false
    ];

    this.fallerAboveIsland = [
      false,
      false,
      false
    ];
  }

  gameOver() {
    this.scene.start('scene-gameover');
  }

  win() {
    this.scene.start('scene-win');
  }

  update() {
    // Listen for keyboard input
    const {left, right, up, down, space} = this.cursors;
    const {A, D} = this.ad;

    for (let k = 0; k < this.fallers.length; k++) {
      const dummy = this.fallers[k];

      this.hitFaller[k] = (
        dummy !== null &&
        this.hero.x > (dummy.x - (dummy.gameObject.width / 2)) &&
        this.hero.x < (dummy.x + (dummy.gameObject.width / 2)) &&
        this.hero.y > (dummy.y - (dummy.gameObject.height / 2)) &&
        this.hero.y < (dummy.y + (dummy.gameObject.height / 2)) &&
        this.hero.z > dummy.z - (this.diveSpeed * 2) &&
        this.hero.z < dummy.z + (this.diveSpeed * 2)
      );

      this.fallerAboveIsland[k] = (
        dummy !== null &&
        dummy.x > (this.island.x - (this.island.gameObject.width / 2)) &&
        dummy.x < (this.island.x + (this.island.gameObject.width / 2)) &&
        dummy.y > (this.island.y - (this.island.gameObject.height / 2)) &&
        dummy.y < (this.island.y + (this.island.gameObject.height / 2))
      );

      if (dummy !== null) {
        if (!this.caughtFallers[k] && this.hitFaller[k]) {
          this.caughtFallers[k] = true;
          this.sound.play('boink');
        }
        
        if (this.caughtFallers[k] && space.isDown) {
          this.caughtFallers[k] = false;
          dummy.z -= 100;
        }
      }
    }

    if (left.isDown) {
      this.cam.x -= this.heroSpeed;
      this.hero.x -= this.heroSpeed;
    }
    else if (right.isDown) {
      this.cam.x += this.heroSpeed;
      this.hero.x += this.heroSpeed;
    }

    if (up.isDown) {
      this.cam.y -= this.heroSpeed;
      this.hero.y -= this.heroSpeed;
    }
    else if (down.isDown) {
      this.cam.y += this.heroSpeed;
      this.hero.y += this.heroSpeed;
    }

    if (A.isDown) {
      this.cam.z -= this.diveSpeed;
      this.hero.z -= this.diveSpeed;
      // this.hero.setVisible(false);
      // this.heroDive.setVisible(true);
    }
    else if (D.isDown) {
      this.cam.z += this.diveSpeed;
      this.hero.z += this.diveSpeed;
      // this.hero.setVisible(false);
      // this.heroDive.setVisible(false);
    }
    else {
      // this.hero.setVisible(true);
      // this.heroDive.setVisible(false);
    }

    for (let i = 0; i < this.fallers.length; i++) {
      const dummy = this.fallers[i];
      
      if (dummy !== null) {
        if (this.caughtFallers[i]) {
          dummy.x = this.hero.x;
          dummy.y = this.hero.y;
          dummy.z = this.hero.z - 10;
        }
        else {
          dummy.z -= this.fallSpeed;
        }
      }
    }

    if (this.hero.z <= 0) {
      this.gameOver();
    }
    
    for (let j = 0; j < this.fallers.length; j++) {
      const dummy = this.fallers[j];

      if (dummy !== null && dummy.z <= 0) {
        if (this.fallerAboveIsland[j]) {
          this.gameOver();
        }
        else {
          this.cam.remove(dummy);
          this.score++;
          this.fallers[j] = null;

          if (this.score === this.fallers.length) {
            this.win();
          }
        }
      }
    }

    this.cam.updateChildren();
    this.scoreText.setText(`${this.score} / ${this.fallers.length}`);
  }

}
export default GameScene;