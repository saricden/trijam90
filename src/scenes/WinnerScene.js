import {Scene} from 'phaser';

class WinnerScene extends Scene {
  constructor() {
    super('scene-win');
  }

  create() {
    this.add.text(window.innerWidth / 2, window.innerHeight / 2, 'YOU SAVED 3 LIVES!', {
      fill: '#000',
      fontSize: 42
    }).setOrigin(0.5);

    this.add.text(window.innerWidth / 2, (window.innerHeight / 2) + 100, 'Press space to play again!', {
      fill: '#000',
      fontSize: 20
    }).setOrigin(0.5);

    this.sound.play('winner');
    
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start('scene-game');
    }
  }
}

export default WinnerScene;